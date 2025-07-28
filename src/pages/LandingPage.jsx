import { Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <HeroSection />
      </main>

      {/* 
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-r from-purple-600 via-teal-500 to-pink-500">
        <HeroSection />
      </main> */}

      <Footer />
      
    </div>
  );
};

export default LandingPage;
