import axios from "axios";
import { ethers } from "hardhat";
import hre from "hardhat";

import type { Battleship } from "../../types/contracts/Battleship";
import { waitForBlock } from "../../utils/block";

export async function deployBattleshipFixture(): Promise<{ battleship: Battleship; address: string }> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const battleshipFactory = await ethers.getContractFactory("Battleship");
  const battleship = await battleshipFactory.connect(admin).deploy(signers[0].address, signers[1].address);
  // await greeter.waitForDeployment();
  const address = await battleship.getAddress();
  return { battleship, address };
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
