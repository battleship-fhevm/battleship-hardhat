// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "fhevm/lib/TFHE.sol";
import "hardhat/console.sol";

/*
Ships: 5,4,3,3,2
board 10 x 10
*/

contract Battleship {
    address public player1;
    address public player2;
    address public currentPlayer;
    address public winner;
    bool public gameEnded;
    bool public gameReady;
    bool public player1Ready;
    bool public player2Ready;

    uint8 public constant BOARD_SIZE = 10;
    uint8 public player1ShipsHit;
    uint8 public player2ShipsHit;

    enum CellState {
        Empty,
        Ship,
        Miss,
        Hit
    }

    CellState[10][10] public player1Board;
    CellState[10][10] public player2Board;

    modifier onlyPlayers() {
        require(msg.sender == player1 || msg.sender == player2, "Only players can call this function");
        _;
    }

    constructor(address _player1, address _player2) {
        player1 = _player1;
        player2 = _player2;
        currentPlayer = player1;
    }

    function placeShips(CellState[10][10] memory _ships) public onlyPlayers {
        require(!gameEnded, "Game has ended");
        require(!gameReady, "Boards already set");
        require(verifyShipsPlaced(_ships), "Invalid amount of ships");

        if (msg.sender == player1) {
            player1Board = _ships;
            player1Ready = true;
        } else {
            player2Board = _ships;
            player2Ready = true;
        }

        if (player2Ready && player1Ready) {
            gameReady = true;
        }
    }

    // Should be 17 in total: 5,4,3,3,2
    function verifyShipsPlaced(CellState[10][10] memory _ships) public pure returns (bool) {
        uint8 shipCount = 0;
        for (uint8 i = 0; i < BOARD_SIZE; i++) {
            for (uint8 j = 0; j < BOARD_SIZE; j++) {
                if (_ships[i][j] == CellState.Ship) {
                    shipCount++;
                }
            }
        }
        return shipCount == 17;
    }

    function attack(uint8 _x, uint8 _y) public onlyPlayers {
        require(gameReady, "Game not ready");
        require(!gameEnded, "Game has ended");
        require(msg.sender == currentPlayer, "Not your turn");

        CellState[10][10] storage targetBoard;
        if (msg.sender == player1) {
            targetBoard = player2Board;
        } else {
            targetBoard = player1Board;
        }

        // require(targetBoard[_x][_y] == CellState.Empty, "Cell already attacked");

        if (targetBoard[_x][_y] == CellState.Ship) {
            targetBoard[_x][_y] = CellState.Hit;
            if (msg.sender == player1) {
                player2ShipsHit++;
            } else {
                player1ShipsHit++;
            }
            if (player1ShipsHit == 17 || player2ShipsHit == 17) {
                gameEnded = true;
                winner = msg.sender;
            }
        } else {
            targetBoard[_x][_y] = CellState.Miss;
        }

        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
}
