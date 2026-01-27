import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#14141f]/95 backdrop-blur-xl border-b border-[#00ff88]/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
                <span className="font-['JetBrains_Mono'] font-bold text-[#0a0a0f] text-xl">{'<>'}</span>
              </div>
              <div className="absolute inset-0 bg-[#00ff88] opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Syne'] font-extrabold text-2xl text-white tracking-tight">NEXUS</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#00ff88] tracking-[0.2em] -mt-1">LEARNING.SYS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            <a href="#features" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
              Features
            </a>
            <a href="#courses" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
              Courses
            </a>
            <a href="#stats" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
              Stats
            </a>
            <a href="#about" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
              About
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/login" 
              className="font-['JetBrains_Mono'] text-sm text-white hover:text-[#00ff88] transition-colors uppercase tracking-wider px-6 py-3"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="relative font-['JetBrains_Mono'] text-sm bg-[#00ff88] text-[#0a0a0f] px-6 py-3 uppercase tracking-wider font-bold overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          >
            <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#00ff88] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-8 border-t border-[#00ff88]/20 mt-2">
            <div className="flex flex-col gap-6 mt-6">
              <a href="#features" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
                Features
              </a>
              <a href="#courses" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
                Courses
              </a>
              <a href="#stats" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
                Stats
              </a>
              <a href="#about" className="font-['JetBrains_Mono'] text-sm text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider">
                About
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-[#00ff88]/20">
                <Link to="/login" className="font-['JetBrains_Mono'] text-sm text-white hover:text-[#00ff88] transition-colors uppercase tracking-wider text-center py-3 border border-white/20">
                  Login
                </Link>
                <Link to="/register" className="font-['JetBrains_Mono'] text-sm bg-[#00ff88] text-[#0a0a0f] uppercase tracking-wider font-bold text-center py-3">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;