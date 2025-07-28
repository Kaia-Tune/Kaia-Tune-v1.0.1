import { ethers } from 'ethers';
import contractABI from '../contracts/contractABI.json';

const contractAddress = '0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c'; // Replace after deployment

export const mintMusic = async (signer, name, category, bannerImage, musicFile, price) => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.mintMusic(name, category, bannerImage, musicFile, ethers.utils.parseEther(price.toString()), {
    value: ethers.utils.parseEther('2'),
  });
  return tx;
};

export const buyMusic = async (signer, tokenId, price) => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.buyMusic(tokenId, { value: ethers.utils.parseEther(price.toString()) });
  return tx;
};