import { ethers } from 'ethers';
import contractABI from '../contracts/contractABI.json';

const contractAddress = '0xf67e0Cc75094eBc06cee524E13A54171165e4056'; // Replace after deployment

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