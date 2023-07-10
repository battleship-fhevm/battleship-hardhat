import { expect } from "chai";
import hre from "hardhat";

import { waitForBlock } from "../../utils/block";

export function shouldBehaveLikeWrappingERC20(): void {
  const amountToWrap = 10;
  const amountToSend = 1;

  it("should wrap the correct amount of tokens", async function () {
    const signers = await hre.ethers.getSigners();

    await waitForBlock(hre);

    await this.werc20.connect(signers[0]).wrap(amountToWrap);

    await waitForBlock(hre);

    const encBalance = await this.werc20.connect(signers[0]).balanceOfEncrypted(this.instance.publicKey);

    const decBalance = this.instance.instance.decrypt(await this.werc20.getAddress(), encBalance);

    expect(decBalance === amountToWrap);
  });

  it("should transfer tokens to new account", async function () {
    const signers = await hre.ethers.getSigners();

    await waitForBlock(hre);

    const eAmount = this.instance.instance.encrypt32(Number(amountToSend));

    await this.werc20.connect(signers[0]).transferEncrypted(signers[1].address, eAmount);

    await waitForBlock(hre);

    const encBalance = await this.werc20.connect(signers[1]).balanceOfEncrypted(this.instance.publicKey);
    const decBalance = this.instance.instance.decrypt(await this.werc20.getAddress(), encBalance);

    expect(decBalance === amountToSend);
  });
}
