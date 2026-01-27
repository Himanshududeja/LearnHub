import React, { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { 
      value: 10247, 
      label: 'ACTIVE_USERS', 
      color: '#00ff88',
      unit: '',
    },
    { 
      value: 524, 
      label: 'COURSES_LIVE', 
      color: '#00d4ff',
      unit: '',
    },
    { 
      value: 98, 
      label: 'SUCCESS_RATE', 
      color: '#ff0088',
      unit: '%',
    },
    { 
      value: 52, 
      label: 'INSTRUCTORS', 
      color: '#ffd700',
      unit: '',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="stats" 
      className="relative py-32 bg-[#14141f] overflow-hidden"
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 noise-texture"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Terminal Header */}
        <div className="bg-[#1c1c2e] border border-[#00ff88]/20 mb-12 overflow-hidden">
          <div className="bg-[#0a0a0f] px-6 py-3 border-b border-[#00ff88]/20 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff0088]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffd700]"></div>
              <div className="w-3 h-3 rounded-full bg-[#00ff88]"></div>
            </div>
            <span className="font-['JetBrains_Mono'] text-xs text-[#5a5a70]">
              system_analytics.sh
            </span>
          </div>
          <div className="p-8 font-['JetBrains_Mono'] text-sm">
            <div className="text-[#5a5a70] mb-4">
              <span className="text-[#00ff88]">$</span> ./analytics.sh --realtime --metrics
            </div>
            <div className="text-[#a0a0b8]">
              Fetching live platform metrics...
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              isVisible={isVisible}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* System Status */}
        <div className="mt-12 bg-[#0a0a0f] border border-[#00ff88]/20 p-8">
          <div className="font-['JetBrains_Mono'] text-sm space-y-3">
            <div className="flex items-center justify-between text-[#a0a0b8]">
              <span>SYSTEM_STATUS:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></span>
                <span className="text-[#00ff88]">OPERATIONAL</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-[#a0a0b8]">
              <span>UPTIME:</span>
              <span className="text-[#00d4ff]">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-[#a0a0b8]">
              <span>LAST_UPDATE:</span>
              <span className="text-[#ffd700] text-xs">{new Date().toISOString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
    </section>
  );
};

const StatCard = ({ stat, isVisible, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const duration = 2000;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(stat.value * easeOut));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(stat.value);
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, [stat.value, isVisible, delay]);

  return (
    <div 
      className="bg-[#1c1c2e] border-2 p-8 relative overflow-hidden group hover:border-opacity-100 transition-all duration-300"
      style={{ 
        borderColor: `${stat.color}33`,
      }}
    >
      {/* Hover Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: stat.color }}
      ></div>

      <div className="relative">
        {/* Value */}
        <div 
          className="font-['JetBrains_Mono'] font-bold text-5xl mb-3"
          style={{ color: stat.color }}
        >
          {isVisible ? count.toLocaleString() : '0'}{stat.unit}
        </div>

        {/* Label */}
        <div className="font-['JetBrains_Mono'] text-xs text-[#a0a0b8] uppercase tracking-[0.2em]">
          {stat.label}
        </div>

        {/* Accent Line */}
        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-10"></div>
      </div>

      {/* Corner Bracket */}
      <div 
        className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-50"
        style={{ borderColor: stat.color }}
      ></div>
    </div>
  );
};

export default StatsSection;