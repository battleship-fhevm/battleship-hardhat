import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployWrappingERC20").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await ethers.getSigners();
  const werc20Factory = await ethers.getContractFactory("WrappingERC20");
  const werc20 = await werc20Factory.connect(signers[0]).deploy("test", "TEST");
  await werc20.waitForDeployment();
  console.log("WrappingERC20 deployed to: ", await werc20.getAddress());
});
