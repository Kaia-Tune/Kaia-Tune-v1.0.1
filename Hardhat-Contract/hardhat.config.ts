import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    kairos: {
      url: process.env.KAIROS_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1001,
      gasPrice: 750000000000, // 750 Gwei, Kaia's fixed gas price
    },
  },
  etherscan: {
    apiKey: {
      kairos: process.env.KAIASCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-kairos.kaiascan.io/api",
          browserURL: "https://kaiascan.io",
        },
      },
    ],
  },
};

export default config;