import { expect } from "chai";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";

export function shouldBehaveLikeBattleship(): void {

  it("should verify that there are 6 ships placed", async function () {
    const encodedPlacement = "0101100000010110";
    const shipPlacement = this.instance.instance.encrypt32(parseInt(encodedPlacement, 2))

    await this.battleship.connect(this.signers.player1).placeShips(shipPlacement);
    await waitForBlock(hre);

    const player1Ready = await this.battleship.player1Ready();
    expect(player1Ready).to.equal(true);

  });

  it("should fail to place 7 ships", async function () {
    const encodedPlacement = "0101100000010111";
    const shipPlacement = this.instance.instance.encrypt32(parseInt(encodedPlacement, 2))

    await this.battleship.connect(this.signers.player2).placeShips(shipPlacement)
    await waitForBlock(hre);

    const player2Ready = await this.battleship.player2Ready();
    expect(player2Ready).to.equal(false);
  });

  it("should fail to place 5 ships", async function () {
    const encodedPlacement = "0000100000010111";
    const shipPlacement = this.instance.instance.encrypt32(parseInt(encodedPlacement, 2))

    await this.battleship.connect(this.signers.player2).placeShips(shipPlacement)
    await waitForBlock(hre);

    const player2Ready = await this.battleship.player2Ready();
    expect(player2Ready).to.equal(false);
  });

  it("should place ships and check game readiness", async function () {
    const encodedPlacement = "0101000000010111";
    const shipPlacement = this.instance.instance.encrypt32(parseInt(encodedPlacement, 2))

    await this.battleship.connect(this.signers.player1).placeShips(shipPlacement);
    await this.battleship.connect(this.signers.player2).placeShips(shipPlacement);
    await waitForBlock(hre);

    const player1Ready = await this.battleship.player1Ready();
    const player2Ready = await this.battleship.player2Ready();
    const gameReady = await this.battleship.gameReady();
    await waitForBlock(hre);

    expect(player1Ready).to.equal(true);
    console.log({
      player1Ready,
      player2Ready,
      gameReady
    })
    expect(player2Ready).to.equal(true);
  });
}
