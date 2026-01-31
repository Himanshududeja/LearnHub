import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingShapes3D from './FloatingShapes3D';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-50"></div>
      
      {/* Mesh Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{ background: 'var(--gradient-mesh)' }}
      ></div>

      {/* Floating Geometric Shapes with Three.js */}
      <FloatingShapes3D />

      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-line pointer-events-none"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-32 text-center">
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-3 mb-8 font-['JetBrains_Mono'] text-xs tracking-[0.2em] text-[#00ff88] uppercase animate-slide-up ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="w-2 h-2 bg-[#00ff88] animate-pulse-glow"></span>
          System Online — 10,247 Active Learners
        </div>

        {/* Main Heading with Glitch Effect */}
        <h1 className={`font-['Syne'] font-extrabold text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 animate-slide-up stagger-1 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="block text-white">LEARN</span>
          <span className="block holographic">BEYOND</span>
          <span className="block text-white">LIMITS</span>
        </h1>

        {/* Subtitle */}
        <p className={`font-['DM_Sans'] text-xl md:text-2xl text-[#c0c0d0] max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up stagger-2 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          Next-generation learning platform powered by AI.
          <br />
          <span className="text-[#00ff88] font-medium">Master new skills. Build your future. Join the revolution.</span>
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-slide-up stagger-3 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to="/register"
            className="btn-primary w-full sm:w-auto"
          >
            Initialize Learning →
          </Link>
          <a
            href="#courses"
            className="btn-secondary w-full sm:w-auto"
          >
            Browse Catalog
          </a>
        </div>

        {/* Terminal-Style Stats */}
        <div className={`inline-block bg-[#14141f]/80 backdrop-blur-xl border border-[#00ff88]/20 p-8 animate-slide-up stagger-4 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="font-['JetBrains_Mono'] text-left space-y-2">
            <div className="text-[#5a5a70] text-sm">
              <span className="text-[#00ff88]">$</span> system.stats --current
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-4 border-t border-[#00ff88]/20">
              <div>
                <div className="text-[#00ff88] text-3xl font-bold">500+</div>
                <div className="text-[#5a5a70] text-xs uppercase tracking-wider mt-1">Courses</div>
              </div>
              <div>
                <div className="text-[#00d4ff] text-3xl font-bold">50+</div>
                <div className="text-[#5a5a70] text-xs uppercase tracking-wider mt-1">Instructors</div>
              </div>
              <div>
                <div className="text-[#ff0088] text-3xl font-bold">10K+</div>
                <div className="text-[#5a5a70] text-xs uppercase tracking-wider mt-1">Students</div>
              </div>
              <div>
                <div className="text-[#ffd700] text-3xl font-bold">4.9★</div>
                <div className="text-[#5a5a70] text-xs uppercase tracking-wider mt-1">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up stagger-5 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <span className="font-['JetBrains_Mono'] text-xs text-[#5a5a70] uppercase tracking-wider">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#00ff88] to-transparent"></div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#00ff88] opacity-70"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#00d4ff] opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#ff0088] opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#ffd700] opacity-70"></div>
    </section>
  );
};

export default HeroSection;