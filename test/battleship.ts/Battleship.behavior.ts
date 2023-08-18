import { expect } from "chai";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";

export function shouldBehaveLikeBattleship(): void {
  let player1: any, player2: any;
  let CellState: Record<string, number>;
  CellState = {
    Empty: 0,
    Ship: 1,
    Miss: 2,
    Hit: 3,
  };

  // it("should add amount to the counter and verify the result", async function () {
  //   // const amountToCount = 10;
  //   // const eAmountCount = this.instance.instance.encrypt32(amountToCount);
  //   // await this.counter.connect(this.signers.admin).add(eAmountCount);
  //   // await waitForBlock(hre);
  //   // const eAmount = await this.counter.connect(this.signers.admin).getCounter(this.instance.publicKey);
  //   // const amount = this.instance.instance.decrypt(await this.counter.getAddress(), eAmount);
  //   // expect(amount === amountToCount);
  // });

  it("should verify that there are 17 ships placed", async function () {
    const shipPlacement: number[][] = [
      [
        CellState.Ship,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
    ];

    const isBoardValid = await this.battleship.connect(this.signers.player1).verifyShipsPlaced(shipPlacement);
    expect(isBoardValid).to.equal(true);
  });

  it("should fail that are only 16 ships placed", async function () {
    const shipPlacement: number[][] = [
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
    ];

    const isBoardValid = await this.battleship.connect(this.signers.player1).verifyShipsPlaced(shipPlacement);
    expect(isBoardValid).to.equal(false);
  });

  it("should place ships and check game readiness", async function () {
    const shipPlacement: number[][] = [
      [
        CellState.Ship,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
      ],
      [
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Ship,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Ship,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
      [
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
        CellState.Empty,
      ],
    ];

    await this.battleship.connect(this.signers.player1).placeShips(shipPlacement);
    await this.battleship.connect(this.signers.player2).placeShips(shipPlacement);
    await waitForBlock(hre);
    const player1Ready = await this.battleship.player1Ready();
    const player2Ready = await this.battleship.player2Ready();
    await waitForBlock(hre);

    expect(player1Ready).to.equal(true);
    expect(player2Ready).to.equal(true);
  });

  it("should attack a valid cell location", async function () {
    const player1Ready = await this.battleship.player1Ready();
    const player2Ready = await this.battleship.player2Ready();
    await waitForBlock(hre);

    expect(player1Ready).to.equal(true);
    expect(player2Ready).to.equal(true);

    await this.battleship.connect(this.signers.player1).attack(0, 0);
    await waitForBlock(hre);
    const positionValue = await this.battleship.player2Board(0, 0);
    expect(positionValue).to.equal(CellState.Hit);
  });
}
