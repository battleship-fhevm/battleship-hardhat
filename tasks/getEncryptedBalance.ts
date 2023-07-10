import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { createFheInstance } from "../utils/instance";

task("task:getBalanceEncrypted")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const Counter = await deployments.get("WrappingERC20");

    const signers = await ethers.getSigners();

    const counter = await ethers.getContractAt("WrappingERC20", Counter.address);

    const { instance, publicKey } = await createFheInstance(hre, Counter.address);
    const eAmount = await counter.connect(signers[taskArguments.account]).balanceOfEncrypted(publicKey);
    const amount = instance.decrypt(Counter.address, eAmount);
    console.log("Current balance: ", amount);
  });
