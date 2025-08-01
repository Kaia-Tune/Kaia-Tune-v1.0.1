// src/utils/ipfs.js
import axios from 'axios';

// Load Pinata API keys from Vite environment variables
// const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
// const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY;
// console.log(pinataApiKey, pinataSecretApiKey); // Debugging: Check if keys are loaded correctly

const pinataApiKey = "5e8c94f6512cbe10b800";
const pinataSecretApiKey = "94487f8b01dcba0bfba10914818c90a0922a8388e993ac267fd08ecf86c86c77";

export const uploadToIPFS = async (file) => {
  // Validate environment variables
  if (!pinataApiKey || !pinataSecretApiKey) {
    throw new Error('Pinata API keys are not configured. Please set VITE_PINATA_API_KEY and VITE_PINATA_SECRET_API_KEY in your .env file.');
  }

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const data = new FormData();
  data.append('file', file);

  try {
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    if (res.data && res.data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } else {
      throw new Error('Invalid response from Pinata API');
    }
  } catch (error) {
    console.error('IPFS Upload Error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to upload to IPFS: ' + (error.response ? error.response.data : error.message));
  }
};