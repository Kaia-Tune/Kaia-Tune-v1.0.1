import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { uploadToIPFS } from '../utils/ipfs';
import { mintMusic } from '../utils/web3';
import { saveMusicToFirebase } from '../utils/firebase';
import { generateMusic } from '../utils/aiMusic';
import { toast } from 'react-toastify';
import { Bot } from 'lucide-react';

const CreateMusic = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [price, setPrice] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { account, signer } = useWallet();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !signer) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!bannerImage || !name || !category || (!musicFile && !useAI)) {
      toast.error('Please upload a music file or generate one with AI');
      return;
    }

    setIsGenerating(true);
    try {
      let musicFileUrl;
      if (useAI) {
        const generatedMusic = await generateMusic(prompt);
        musicFileUrl = await uploadToIPFS(generatedMusic);
      } else {
        musicFileUrl = await uploadToIPFS(musicFile);
      }
      const bannerImageUrl = await uploadToIPFS(bannerImage);

      const tx = await mintMusic(signer, name, category, bannerImageUrl, musicFileUrl, price);
      await tx.wait();

      const musicData = {
        id: tx.hash,
        name,
        category,
        bannerImage: bannerImageUrl,
        musicFile: musicFileUrl,
        price: parseFloat(price),
        creator: account,
        owners: [account],
        description: '',
      };
      await saveMusicToFirebase(musicData);

      toast.success('Music created and minted successfully!');
      setBannerImage(null);
      setName('');
      setCategory('');
      setMusicFile(null);
      setPrice('');
      setUseAI(false);
      setPrompt('');
    } catch (error) {
      toast.error(`Failed to create music: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">Create Music</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">Banner Image</label>
        <input
          type="file"
          onChange={(e) => setBannerImage(e.target.files[0])}
          className="w-full bg-gray-700 p-2 rounded text-gray-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-white"
        >
          <option value="">Select Category</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="electronic">Electronic</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">Music File</label>
        <input
          type="file"
          onChange={(e) => setMusicFile(e.target.files[0])}
          className="w-full bg-gray-700 p-2 rounded text-gray-400"
          disabled={useAI}
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={useAI}
          onChange={(e) => setUseAI(e.target.checked)}
          className="mr-2"
        />
        <label className="flex items-center text-sm font-medium text-gray-300">
          <Bot size={20} className="mr-1 text-teal-400" />
          Use AI to Generate Music
        </label>
      </div>
      {useAI && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-300">AI Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-gray-700 p-2 rounded text-white"
            placeholder="e.g., 'Create a chill electronic track'"
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">Price (Kaia)</label>
        <input
          type="number"
          step="0.1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded disabled:bg-gray-500"
      >
        {isGenerating ? 'Generating...' : 'Create & Mint (2 Kaia)'}
      </button>
    </form>
  );
};

export default CreateMusic;