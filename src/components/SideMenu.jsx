import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Music, Search, Award, Wallet } from 'lucide-react';

const SideMenu = () => {
  const location = useLocation();
  const { connectWallet, account } = useWallet();

  const menuItems = [
    { name: 'Explore Market', path: '/dashboard/explore', icon: <Search size={20} /> },
    { name: 'Create Music', path: '/dashboard/create', icon: <Music size={20} /> },
    { name: 'Reward & Stats', path: '/dashboard/rewards', icon: <Award size={20} /> },
  ];

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-8 text-purple-400">KaiaTune</h1>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center py-2 px-4 rounded mb-2 ${
                location.pathname === item.path ? 'bg-purple-500' : 'hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={connectWallet}
        className="flex items-center bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
      >
        <Wallet size={20} className="mr-2" />
        {account ? 'Connected' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default SideMenu;