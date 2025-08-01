import { ethers } from 'ethers';
import contractABI from '../contracts/contractABI.json';

const contractAddress = '0xf67e0Cc75094eBc06cee524E13A54171165e4056'; // Replace after deployment



// web3.js
export const mintMusic = async (signer, name, category, bannerImage, musicFile, price) => {
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.mintMusic(name, category, bannerImage, musicFile, ethers.utils.parseEther(price.toString()), {
    value: ethers.utils.parseEther('2'),
  });
  const receipt = await tx.wait();
  console.log('Transaction receipt:', receipt);
  const musicMintedEvent = receipt.events.find(e => e.event === 'MusicMinted');
  if (!musicMintedEvent) {
    throw new Error('MusicMinted event not found in transaction receipt. Check transaction status.');
  }
  console.log('MusicMinted event:', musicMintedEvent);
  const musicId = musicMintedEvent.args.musicId ? musicMintedEvent.args.musicId.toNumber() : musicMintedEvent.args[0].toNumber();
  return { tx, musicId };
};


// export const mintMusic = async (signer, name, category, bannerImage, musicFile, price) => {
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.mintMusic(name, category, bannerImage, musicFile, ethers.utils.parseEther(price.toString()), {
//     value: ethers.utils.parseEther('2'),
//   });
//   return tx;
// };

// web3.js
// web3.js
// export const mintMusic = async (signer, name, category, bannerImage, musicFile, price) => {
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.mintMusic(name, category, bannerImage, musicFile, ethers.utils.parseEther(price.toString()), {
//     value: ethers.utils.parseEther('2'),
//   });
//   const receipt = await tx.wait();
//   const musicId = receipt.events.find(e => e.event === 'MusicMinted').args.tokenId.toNumber();
//   return { tx, musicId };
// };


// // web3.js
// export const mintMusic = async (signer, name, category, bannerImage, musicFile, price) => {
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.mintMusic(name, category, bannerImage, musicFile, ethers.utils.parseEther(price.toString()), {
//     value: ethers.utils.parseEther('2'),
//   });
//   const receipt = await tx.wait();
//   console.log('Transaction receipt:', receipt);
//   const musicMintedEvent = receipt.events.find(e => e.event === 'MusicMinted');
//   if (!musicMintedEvent) {
//     throw new Error('MusicMinted event not found in transaction receipt');
//   }
//   const musicId = musicMintedEvent.args.tokenId.toNumber();
//   return { tx, musicId };
// };



// web3.js
export const buyMusic = async (signer, tokenId, price) => {
  console.log('Buying music:', { tokenId, price: price.toString() });
  const priceBn = ethers.BigNumber.from(price);
  if (!priceBn || priceBn.eq(0)) throw new Error('Invalid price');
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.buyMusic(tokenId, { value: priceBn, gasLimit: 400000 });
  await tx.wait();
  console.log('Transaction confirmed:', tx.hash);
  return tx;
};

// web3.js
// web3.js
// web3.js
// export const buyMusic = async (signer, tokenId, price) => {
//   console.log('Buying music:', { tokenId, price });
//   const priceBn = ethers.BigNumber.from(price); // Convert string to BigNumber
//   if (!priceBn || priceBn.eq(0)) throw new Error('Invalid price');
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.buyMusic(tokenId, { value: priceBn, gasLimit: 400000 });
//   await tx.wait();
//   console.log('Transaction confirmed:', tx.hash);
//   return tx;
// };

// export const buyMusic = async (signer, tokenId, price) => {
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.buyMusic(tokenId, { value: ethers.utils.parseEther(price.toString()) });
//   return tx;
// };

// export const buyMusic = async (signer, tokenId, price) => {
//   console.log('Buying music:', { tokenId, price });
//   const contract = new ethers.Contract(contractAddress, contractABI, signer);
//   const tx = await contract.buyMusic(tokenId, { value: price }); // price already in wei
//   await tx.wait();
//   console.log('Transaction confirmed:', tx.hash);
//   return tx;
// };