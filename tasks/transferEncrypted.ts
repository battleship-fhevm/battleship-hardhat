import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { createFheInstance } from "../utils/instance";

task("task:transferEncrypted")
  .addParam("amount", "Amount of tokens to unwrap")
  .addParam("account", "Specify which account [0, 9]")
  .addParam("to", "destination account")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const erc20 = await deployments.get("WrappingERC20");

    const signers = await ethers.getSigners();

    const counter = await ethers.getContractAt("WrappingERC20", erc20.address);
    const { instance } = await createFheInstance(hre, erc20.address);
    const eAmount = instance.encrypt32(Number(taskArguments.amount));
    await counter.connect(signers[taskArguments.account]).transferEncrypted(taskArguments.to, eAmount);

    console.log(`done sending ${taskArguments.amount} tokens to ${taskArguments.to}`);
  });
