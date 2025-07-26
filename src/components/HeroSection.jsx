import { Link } from 'react-router-dom';
import Button from './Button';

const HeroSection = () => {
  return (
    <div className="py-20">
      <h1 className="text-6xl font-bold mb-4 animate-fade-in">
        <span className="text-pink-400">Compose.</span>
        <span className="text-orange-400">Mint.</span>
        <span className="text-teal-400">Own the Sound.</span>
      </h1>
      <p className="text-lg mb-6 text-gray-200">Unleash your creativity with AI-powered music generation—mint your tracks as NFTs and join a new era of decentralized sound.</p>
      <div className="space-x-4">
        <Button
          text="Create Music"
          as={Link}
          to="/dashboard/create"
          className="bg-pink-500 hover:bg-pink-600 text-white"
        />
        <Button
          text="Explore Marketplace"
          as={Link}
          to="/dashboard/explore"
          className="bg-gray-700 hover:bg-gray-600 text-white"
        />
      </div>
    </div>
  );
};

export default HeroSection;