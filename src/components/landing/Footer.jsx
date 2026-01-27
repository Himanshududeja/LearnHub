import React from 'react';
import { Link } from 'react-router-dom';

const InstructorCTA = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Reach Thousands',
      description: 'Connect with students worldwide and share your expertise with a global audience.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Earn Money',
      description: 'Set your own prices and earn revenue from every student enrollment. We offer competitive revenue sharing.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI-Powered Tools',
      description: 'Use our AI assistant to create quizzes, generate content, and provide instant support to students.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Detailed Analytics',
      description: 'Track student progress, engagement, and course performance with comprehensive analytics.',
    },
  ];

  const stats = [
    { value: '50+', label: 'Expert Instructors' },
    { value: '$2M+', label: 'Instructor Earnings' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-sm font-semibold text-indigo-400 tracking-wide uppercase mb-4">
              Become an Instructor
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Share Your Knowledge &
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"> Inspire Millions</span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join our community of expert instructors and make a real impact. 
              Create courses, reach students worldwide, and build your personal brand 
              while earning a substantial income.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 text-indigo-400 mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/instructor/apply"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Apply Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/instructor/info"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/20"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/150?img=8"
                    alt="Instructor"
                    className="w-12 h-12 rounded-full mr-3 border-2 border-indigo-400"
                  />
                  <div>
                    <div className="text-white font-semibold">Dr. Alex Kumar</div>
                    <div className="text-indigo-400 text-sm">Top Instructor</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm italic">
                  "Teaching on this platform has been incredibly rewarding. I've reached 
                  over 15,000 students and earned a substantial income doing what I love."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-50 blur-2xl"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-teal-400 rounded-full px-6 py-3 shadow-xl">
              <div className="text-white font-bold text-center">
                <div className="text-2xl">₹2M+</div>
                <div className="text-xs">Paid to Instructors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - How to Get Started */}
        <div className="mt-20">
          <h4 className="text-2xl font-bold text-white text-center mb-12">
            How to Get Started as an Instructor
          </h4>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Apply Online',
                description: 'Fill out our simple application form and tell us about your expertise.',
              },
              {
                step: '2',
                title: 'Get Approved',
                description: 'Our team reviews your application (usually within 48 hours).',
              },
              {
                step: '3',
                title: 'Create & Earn',
                description: 'Start creating courses and earning from day one!',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
                  {item.step}
                </div>
                <h5 className="text-white font-bold text-lg mb-2">{item.title}</h5>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default InstructorCTA;