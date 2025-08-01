import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { WalletProvider } from './context/WalletContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <WalletProvider>
       <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router >
        <div className="flex items-center justify-center min-h-screen md:hidden block">
  <h1 className=" text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center w-fit p-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out animate-pulse-subtle">
    Please use on Laptop
  </h1>
</div>
        <div className="min-h-screen bg-black text-white md:block hidden ">
          
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;