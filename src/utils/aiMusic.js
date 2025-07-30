import axios from 'axios';

const aiMusicApiKey = 'YOUR_AIVA_API_KEY'; // Replace with your API key
const aiMusicEndpoint = 'https://api.aiva.ai/generate'; // Replace with actual endpoint

export const generateMusic = async (prompt) => {
  try {
    const response = await axios.post(
      aiMusicEndpoint,
      { prompt, duration: 30, style: 'electronic' }, // Customize parameters
      {
        headers: { Authorization: `Bearer ${aiMusicApiKey}`, responseType: 'blob' },
      }
    );
    return response.data; // Returns audio blob
  } catch (error) {
    console.error('AI Music Generation Error:', error);
    throw new Error('Failed to generate music. Check your API key or prompt.');
  }
};