import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { WrappingERC20 } from "../types";
import type { FheContract } from "../utils/instance";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    werc20: WrappingERC20;
    instance: FheContract;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
}
