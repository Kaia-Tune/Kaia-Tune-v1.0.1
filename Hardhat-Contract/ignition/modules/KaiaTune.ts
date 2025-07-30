// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const KaiaTuneModule = buildModule("KaiaTuneModule", (m) => {

  const kaiatune = m.contract("KaiaTune")
  return { kaiatune };
});

export default KaiaTuneModule;
