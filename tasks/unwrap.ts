import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:unwrap")
  .addParam("amount", "Amount of tokens to unwrap")
  .addParam("account", "Specify which account [0, 9]")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, deployments } = hre;

    const erc20 = await deployments.get("WrappingERC20");

    const signers = await ethers.getSigners();

    const counter = await ethers.getContractAt("WrappingERC20", erc20.address);

    await counter.connect(signers[taskArguments.account]).unwrap(Number(taskArguments.amount));

    console.log(`done unwrapping ${taskArguments.amount} tokens`);
  });
