// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "fhevm/lib/TFHE.sol";
import "hardhat/console.sol";

contract Battleship {
    address public player1;
    address public player2;
    address public currentPlayer;
    address public winner;
    bool public gameEnded;
    bool public gameReady;
    bool public player1Ready;
    bool public player2Ready;

    uint8 public constant BOARD_SIZE = 4; // max size is 5
    uint8 public player1ShipsHit;
    uint8 public player2ShipsHit;

    // 0 = empty
    // 1 = ship
    // 2 = attacked
    euint8[4][4] public player1Board;
    euint8[4][4] public player2Board;

    event Attack(uint8 x, uint8 y, address victim, bool hit);
    event GameEnded(address winner);

    modifier onlyPlayers() {
        require(msg.sender == player1 || msg.sender == player2, "Only players can call this function");
        _;
    }

    constructor(address _player1, address _player2) {
        player1 = _player1;
        player2 = _player2;
        currentPlayer = player1;
    }

    function placeShips(bytes calldata encryptedValue) public onlyPlayers {
        require(!gameEnded, "Game has ended");
        require(!gameReady, "Boards already set");

        // values are encoded as bits from right to left
        // 0 = empty
        // 1 = ship
        //
        // example input:
        //
        // 0010001011001100
        //
        // results in the following board:
        //
        // 0 0 1 1
        // 0 0 1 1
        // 0 1 0 0
        // 0 1 0 0

        euint32 packedData = TFHE.asEuint32(encryptedValue);
        euint8[BOARD_SIZE][BOARD_SIZE] storage board;
        if(msg.sender == player1  ){
            board = player1Board;
        } else {
            board = player2Board;
        }
        euint8 mask = TFHE.asEuint8(1);
        euint8 shipCount = TFHE.asEuint8(0);

        for (uint256 i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
          euint8 value = TFHE.asEuint8(TFHE.and(packedData, mask));
          board[i / BOARD_SIZE][i % BOARD_SIZE] = value;
          shipCount = TFHE.add(shipCount, value);

          packedData = TFHE.shr(packedData, uint8(1));
        }

        // Make sure the user created 6 ships
        TFHE.req(TFHE.eq(shipCount, uint8(6)));

        if (msg.sender == player1) {
            player1Ready = true;
        } else {
            player2Ready = true;
        }

        if (player2Ready && player1Ready) {
            gameReady = true;
        }
    }

    function attack(uint8 _x, uint8 _y) public onlyPlayers {
        require(gameReady, "Game not ready");
        require(!gameEnded, "Game has ended");
        require(msg.sender == currentPlayer, "Not your turn");

        euint8[4][4] storage targetBoard;
        if (msg.sender == player1) {
            targetBoard = player2Board;
        } else {
            targetBoard = player1Board;
        }

        uint8 target = TFHE.decrypt(targetBoard[_x][_y]);
        require(target < 2, "Already attacked this cell");

        if (target == 1) {
            if (msg.sender == player1) {
                player2ShipsHit++;
                emit Attack(_x, _y, player2, true);
            } else {
                player1ShipsHit++;
                emit Attack(_x, _y, player1, true);
            }
            if (player1ShipsHit == 6 || player2ShipsHit == 6) {
                gameEnded = true;
                winner = msg.sender;
                emit GameEnded(msg.sender);
            }
        } else {
            if (msg.sender == player1) {
                emit Attack(_x, _y, player2, false);
            } else {
                emit Attack(_x, _y, player1, false);
            }
        }
        targetBoard[_x][_y] = TFHE.asEuint8(2);

        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
}
