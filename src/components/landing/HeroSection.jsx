import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>🎉 Over 10,000 students learning with us</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Learn Anything,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
              Anywhere
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
            Unlock your potential with expert-led courses. Join thousands of
            learners advancing their skills with AI-powered learning platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="group px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform duration-200"
            >
              Get Started Free
              <svg
                className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <a
              href="#courses"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
            >
              Browse Courses
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-indigo-200 text-sm md:text-base">Expert Instructors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-indigo-200 text-sm md:text-base">Courses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">10K+</div>
              <div className="text-indigo-200 text-sm md:text-base">Active Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">4.9★</div>
              <div className="text-indigo-200 text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Floating Image/Illustration */}
        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-4xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-white/20 rounded-lg h-24 animate-pulse"
                    style={{ animationDelay: `${item * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-80 animate-bounce animation-delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#features" className="animate-bounce block">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;