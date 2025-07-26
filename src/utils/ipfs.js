import axios from 'axios';

const pinataApiKey = 'YOUR_PINATA_API_KEY';
const pinataSecretApiKey = 'YOUR_PINATA_SECRET_API_KEY';

export const uploadToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const data = new FormData();
  data.append('file', file);

  const res = await axios.post(url, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
};