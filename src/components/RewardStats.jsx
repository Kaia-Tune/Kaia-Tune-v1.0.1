import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { getUserMusic, getUserEarnings } from '../utils/firebase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Download } from 'lucide-react';
import { toast } from 'react-toastify';

const RewardStats = () => {
  const [musicList, setMusicList] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const { account } = useWallet();

  useEffect(() => {
    if (account) {
      const fetchData = async () => {
        const music = await getUserMusic(account);
        setMusicList(music);
        const earnings = await getUserEarnings(account);
        setEarnings(earnings);
        setSalesData(music.map((m) => ({ name: m.name, sales: m.owners.length - 1 })));
      };
      fetchData();
    }
  }, [account]);

  const handleExport = () => {
    toast.info('Exporting stats as SVG (feature in progress)');
    // Implement SVG export logic here
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Reward & Stats</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <p className="text-lg">Music NFTs Created: {musicList.length}</p>
        <p className="text-lg">Total Earnings: {earnings} Kaia</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-teal-400">Sales Chart</h3>
        <BarChart width={500} height={300} data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
      <button
        onClick={handleExport}
        className="flex items-center bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
      >
        <Download size={20} className="mr-2" />
        Export Stats as SVG
      </button>
    </div>
  );
};

export default RewardStats;