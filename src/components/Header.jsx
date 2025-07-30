import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Wallet as WalletIcon } from 'lucide-react';

const Header = () => {
  const { connectWallet, account } = useWallet();

  return (
    <header className="flex justify-between items-center p-4 bg-transparent">
      <div className="flex items-center">
        <img src="/logo.png" alt="KaiaTune Logo" className="w-10 h-10 mr-2" />
        <span className="text-xl font-bold text-white">KaiaTune</span>
      </div>
      <nav className="space-x-6">
        <Link to="/features" className="text-white hover:text-purple-300">Features</Link>
        <Link to="/marketplace" className="text-white hover:text-purple-300">Marketplace</Link>
        <Link to="/community" className="text-white hover:text-purple-300">Community</Link>
        <Link to="/about" className="text-white hover:text-purple-300">About Us</Link>
      </nav>
      <button
        onClick={connectWallet}
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center"
      >
        <WalletIcon size={20} className="mr-2" />
        {account ? `${account.slice(0, 6)}...` : 'Connect Wallet'}
      </button>
    </header>
  );
};

export default Header;