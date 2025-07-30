import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const KaiaTune = await ethers.getContractFactory("KaiaTune");
  const kaiaTune = await KaiaTune.deploy({ gasLimit: 1000000, gasPrice: 750000000000 });
  await kaiaTune.deployed();

  console.log("KaiaTune deployed to:", kaiaTune.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });