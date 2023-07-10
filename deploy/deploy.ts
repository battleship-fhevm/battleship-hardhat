import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const werc20 = await deploy("WrappingERC20", {
    from: deployer,
    args: ["TestShieldedToken", "TST"],
    log: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(`WrappingERC20 contract: `, werc20.address);
};

export default func;
func.id = "deploy_werc20";
func.tags = ["WrappingERC20"];
