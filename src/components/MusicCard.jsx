import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { buyMusic } from "../utils/web3";
import { toast } from "react-toastify";

const MusicCard = ({ music, account }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { signer } = useWallet();

  const handlePlay = () => {
    if (!account) {
      toast.error("Please connect your wallet");
      return;
    }
    if (music.creator === account || music.owners.includes(account)) {
      setIsPlaying(true);
    } else {
      toast.error("Please purchase to play!");
    }
  };


// MusicCard.jsx
const handleBuy = async () => {
  if (!signer) {
    toast.error('Please connect your wallet');
    return;
  }
  if (!music.price || isNaN(parseFloat(music.price))) {
    toast.error('Invalid price for this music');
    return;
  }
  try {
    console.log('Attempting to buy:', { tokenId: music.id, price: music.price, music });
    await buyMusic(signer, music.id, music.price);
    toast.success('Music purchased successfully!');
    // Update Firebase with new owner
  } catch (error) {
    console.error('Buy Error:', error);
    toast.error('Failed to purchase music: ' + (error.data?.message || error.message));
  }
};


  //  const handleBuy = async () => {
//   if (!signer) {
//     toast.error('Please connect your wallet');
//     return;
//   }
//   if (!music.price || isNaN(parseFloat(music.price))) {
//     toast.error('Invalid price for this music');
//     return;
//   }
//   try {
//     console.log('Attempting to buy:', { tokenId: music.id, price: music.price });
//     await buyMusic(signer, music.id, music.price);
//     toast.success('Music purchased successfully!');
//     // Update Firebase with new owner
//   } catch (error) {
//     console.error('Buy Error:', error);
//     toast.error('Failed to purchase music: ' + (error.data?.message || error.message));
//   }
// };

 

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={music.bannerImage}
        alt={music.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="mt-2">
        <h3 className="text-xl font-bold text-white">{music.name}</h3>
        <p className="text-sm text-gray-400">{music.category}</p>
        <p className="text-sm text-gray-400">
          Creator: {music.creator.slice(0, 6)}...
        </p>
        <p className="text-sm text-gray-400">Price: {music.price} Kaia</p>
        <p className="text-sm text-gray-400">
          Description: {music.description || "No description"}
        </p>
        {isPlaying ? (
          <audio controls src={music.musicFile} className="w-full mt-2" />
        ) : (
          <div className="flex mt-2 space-x-2">
            <button
              onClick={handlePlay}
              className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
            >
              Play
            </button>
            {music.creator !== account && !music.owners.includes(account) && (
              <button
                onClick={handleBuy}
                className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
              >
                Buy
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicCard;
