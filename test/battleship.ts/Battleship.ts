import { ethers } from "hardhat";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";
import { createFheInstance } from "../../utils/instance";
import type { Signers } from "../types";
import { shouldBehaveLikeBattleship } from "./Battleship.behavior";
import { deployBattleshipFixture, getTokensFromFaucet } from "./Battleship.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    // get tokens from faucet if we're on localfhenix and don't have a balance
    await getTokensFromFaucet();

    // deploy test contract
    const { battleship, address } = await deployBattleshipFixture();
    this.battleship = battleship;

    // initiate fhevmjs
    this.instance = await createFheInstance(hre, address);

    // set admin account/signer
    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.player1 = signers[0];
    this.signers.player2 = signers[1];

    // wait for deployment block to finish
    await waitForBlock(hre);
  });

  describe("Battleship", function () {
    shouldBehaveLikeBattleship();
  });
});
