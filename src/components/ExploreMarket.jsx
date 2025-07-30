import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { getMusicList } from '../utils/firebase';
import MusicCard from './MusicCard';

const ExploreMarket = () => {
  const [musicList, setMusicList] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { account } = useWallet();

  useEffect(() => {
    const fetchMusic = async () => {
      const music = await getMusicList();
      setMusicList(music);
    };
    fetchMusic();
  }, []);

  const filteredMusic = musicList.filter((music) => {
    const matchesCategory = category === 'all' || music.category === category;
    const matchesSearch = music.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-700 p-2 rounded-lg text-white"
        >
          <option value="all">All Categories</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="electronic">Electronic</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 p-2 rounded-lg text-white w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMusic.map((music) => (
          <MusicCard key={music.id} music={music} account={account} />
        ))}
      </div>
    </div>
  );
};

export default ExploreMarket;