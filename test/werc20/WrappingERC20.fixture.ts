import axios from "axios";
import hre from "hardhat";

import type { WrappingERC20 } from "../../types";
import { waitForBlock } from "../../utils/block";

export async function deployWrappingERC20Fixture(): Promise<{ werc20: WrappingERC20; address: string }> {
  const name = "TestShieldedToken";
  const symbol = "TST";
  const signers = await hre.ethers.getSigners();
  console.log(`signer: ${JSON.stringify(signers[0])}`);
  const werc20Factory = await hre.ethers.getContractFactory("WrappingERC20");
  const werc20 = await werc20Factory.connect(signers[0]).deploy(name, symbol);
  const address = await werc20.getAddress();

  return { werc20, address };
}

export async function getTokensFromFaucet() {
  if (hre.network.name === "localfhenix") {
    const signers = await hre.ethers.getSigners();

    if ((await hre.ethers.provider.getBalance(signers[0].address)).toString() === "0") {
      console.log("Balance for signer is 0 - getting tokens from faucet");
      await axios.get(`http://localhost:6000/faucet?address=${signers[0].address}`);
      await waitForBlock(hre);
    }
  }
}
