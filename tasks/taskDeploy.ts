import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployCounter").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await ethers.getSigners();
  const counterFactory = await ethers.getContractFactory("Counter");
  const counter = await counterFactory.connect(signers[0]).deploy();
  // await counter.waitForDeployment();
  console.log("Counter deployed to: ", await counter.getAddress());
});
