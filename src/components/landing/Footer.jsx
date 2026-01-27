import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const sections = [
    {
      title: 'PLATFORM',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Courses', href: '/courses' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API', href: '/api' },
        { label: 'Community', href: '/community' },
        { label: 'Support', href: '/support' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { label: 'Terms', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Security', href: '/security' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ];

  const socials = [
    { name: 'GitHub', href: 'https://github.com', icon: 'GH' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'TW' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LI' },
    { name: 'Discord', href: 'https://discord.com', icon: 'DC' },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#00ff88]/20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
                <span className="font-['JetBrains_Mono'] font-bold text-[#0a0a0f] text-xl">{'<>'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Syne'] font-extrabold text-2xl text-white tracking-tight">NEXUS</span>
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#00ff88] tracking-[0.2em] -mt-1">LEARNING.SYS</span>
              </div>
            </Link>
            
            <p className="font-['DM_Sans'] text-[#c0c0d0] mb-8 leading-relaxed max-w-md">
              Next-generation learning platform powered by AI. Master new skills and build your future with industry experts.
            </p>

            {/* Newsletter */}
            <div>
              <div className="font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-4">
                Subscribe to Updates
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-[#14141f] border border-[#00ff88]/20 px-4 py-3 text-white font-['JetBrains_Mono'] text-sm focus:outline-none focus:border-[#00ff88] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#00ff88] text-[#0a0a0f] px-6 py-3 font-['JetBrains_Mono'] text-sm uppercase tracking-wider font-bold hover:bg-white transition-colors"
                >
                  {subscribed ? '✓' : '→'}
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#00ff88]">
                  ✓ Subscribed successfully
                </div>
              )}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="font-['DM_Sans'] text-sm text-[#c0c0d0] hover:text-white transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="font-['JetBrains_Mono'] text-xs text-[#5a5a70]">
            © 2024 NEXUS LEARNING SYSTEMS. ALL RIGHTS RESERVED.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#00ff88]/20 flex items-center justify-center font-['JetBrains_Mono'] text-xs text-[#5a5a70] hover:text-[#00ff88] hover:border-[#00ff88] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#5a5a70]">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></span>
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

        {/* Terminal Easter Egg */}
        <div className="mt-12 bg-[#14141f] border border-[#00ff88]/20 p-4 font-['JetBrains_Mono'] text-xs text-[#5a5a70]">
          <span className="text-[#00ff88]">$</span> echo "Built with ❤️ by developers, for developers"
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;