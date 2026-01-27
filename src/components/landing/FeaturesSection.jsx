import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '◢',
      title: 'AI-POWERED LEARNING',
      description: 'Neural network-driven personalization adapts to your learning style in real-time.',
      color: '#00ff88',
      size: 'large',
    },
    {
      icon: '◣',
      title: 'INDUSTRY EXPERTS',
      description: 'Learn from professionals actively working in top tech companies.',
      color: '#00d4ff',
      size: 'medium',
    },
    {
      icon: '◤',
      title: 'VERIFIED CERTS',
      description: 'Blockchain-verified certificates recognized across the industry.',
      color: '#ff0088',
      size: 'medium',
    },
    {
      icon: '◥',
      title: 'ASYNC LEARNING',
      description: 'Learn on your schedule. Lifetime access to all content and updates.',
      color: '#ffd700',
      size: 'small',
    },
    {
      icon: '●',
      title: 'LIVE COMMUNITY',
      description: 'Join 10K+ active learners in our global community.',
      color: '#00ff88',
      size: 'small',
    },
    {
      icon: '■',
      title: 'PROGRESS TRACKING',
      description: 'Advanced analytics dashboard to monitor your learning trajectory.',
      color: '#00d4ff',
      size: 'large',
    },
  ];

  return (
    <section id="features" className="relative py-32 bg-[#14141f] overflow-hidden">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#00ff88]"></div>
          <span className="font-['JetBrains_Mono'] text-sm text-[#00ff88] uppercase tracking-[0.2em]">
            System Features
          </span>
        </div>
        <h2 className="font-['Syne'] font-extrabold text-5xl md:text-7xl text-white leading-none">
          BUILT FOR
          <br />
          <span className="holographic">MASTERY</span>
        </h2>
      </div>

      {/* Asymmetric Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => {
            const heightClass = 
              feature.size === 'large' ? 'md:row-span-2' : 
              feature.size === 'medium' ? 'md:row-span-1' : 
              'md:row-span-1';
            
            return (
              <div
                key={index}
                className={`brutal-card bg-[#1c1c2e] p-8 group hover:bg-[#14141f] transition-all duration-300 ${heightClass}`}
                style={{
                  borderColor: feature.color,
                  boxShadow: `8px 8px 0 ${feature.color}`,
                }}
              >
                {/* Icon */}
                <div 
                  className="text-6xl mb-6 font-bold transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 
                  className="font-['JetBrains_Mono'] text-sm uppercase tracking-[0.2em] mb-4"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-['DM_Sans'] text-[#c0c0d0] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div 
                  className="w-0 h-px mt-6 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: feature.color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00ff88]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#ff0088]/5 blur-[120px] rounded-full"></div>
    </section>
  );
};

export default FeaturesSection;