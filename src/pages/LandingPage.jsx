import React from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PopularCoursesSection from '../components/landing/PopularCoursesSection';
import StatsSection from '../components/landing/StatsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import InstructorCTA from '../components/landing/InstructorCTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <InstructorCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;