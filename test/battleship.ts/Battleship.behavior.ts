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

  it("should verify that there are 6 ships placed", async function () {
    const shipPlacement: number[][] = [
      [CellState.Ship, CellState.Empty, CellState.Ship, CellState.Ship],
      [CellState.Ship, CellState.Ship, CellState.Empty, CellState.Empty],
      [CellState.Ship, CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty, CellState.Empty],
    ];

    const isBoardValid = await this.battleship.connect(this.signers.player1).verifyShipsPlaced(shipPlacement);
    expect(isBoardValid).to.equal(true);
  });

  it("should place ships and check game readiness", async function () {
    const shipPlacement: number[][] = [
      [CellState.Ship, CellState.Empty, CellState.Ship, CellState.Ship],
      [CellState.Ship, CellState.Ship, CellState.Empty, CellState.Empty],
      [CellState.Ship, CellState.Empty, CellState.Empty, CellState.Empty],
      [CellState.Empty, CellState.Empty, CellState.Empty, CellState.Empty],
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

  // 2 is used to represent a ship and 1 to represent empty space
  it("should place encryptedships and check game readiness", async function () {
    const toHexString = (bytes: any) =>
      bytes.reduce((str: any, byte: any) => str + byte.toString(16).padStart(2, "0"), "");

    const shipPlacement: string[][] = [
      [
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
      ],
      [
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
        "0x" + toHexString(this.instance.instance.encrypt8(2)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
      ],
      [
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
      ],
      [
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
        "0x" + toHexString(this.instance.instance.encrypt8(1)),
      ],
    ];

    console.log("shipPlacement", shipPlacement);

    const isBoardValid = await this.battleship.connect(this.signers.player1).verifyShipsPlacedFHE(shipPlacement);
    expect(isBoardValid).to.equal(true);
  });
}
