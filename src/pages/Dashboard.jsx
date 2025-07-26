import { Routes, Route } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import ExploreMarket from '../components/ExploreMarket';
import CreateMusic from '../components/CreateMusic';
import RewardStats from '../components/RewardStats';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <SideMenu />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="explore" element={<ExploreMarket />} />
          <Route path="create" element={<CreateMusic />} />
          <Route path="rewards" element={<RewardStats />} />
          <Route path="/" element={<ExploreMarket />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;