import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PopularCoursesSection from '../components/landing/PopularCoursesSection';
import StatsSection from '../components/landing/StatsSection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;