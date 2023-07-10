import { ethers } from "hardhat";
import { createFheInstance } from "../../utils/instance";

import type { Signers } from "../types";
import { shouldBehaveLikeGreeter } from "./Greeter.behavior";
import { deployGreeterFixture } from "./Greeter.fixture";

describe("Unit tests", function () {
  // before(async function () {
  //   this.signers = {} as Signers;

  //   const signers = await ethers.getSigners();
  //   this.signers.admin = signers[0];

  // });

  // describe("Greeter", function () {
  //   beforeEach(async function () {
  //     const { greeter } = await deployGreeterFixture();
  //     this.greeter = greeter;
  //   });

  //   shouldBehaveLikeGreeter();
  // });
});
