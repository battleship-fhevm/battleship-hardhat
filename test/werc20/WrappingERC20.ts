import hre from "hardhat";

import { createFheInstance } from "../../utils/instance";
import type { Signers } from "../types";
import { shouldBehaveLikeWrappingERC20 } from "./WrappingERC20.behavior";
import { deployWrappingERC20Fixture, getTokensFromFaucet } from "./WrappingERC20.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;
    await getTokensFromFaucet();
    const { werc20, address } = await deployWrappingERC20Fixture();
    this.werc20 = werc20;
    this.instance = await createFheInstance(hre, address);
    console.log(`running test on contract: ${address}`);
  });

  describe("WrappingERC20", function () {
    // beforeEach(async function () {});
    shouldBehaveLikeWrappingERC20();
  });
});
