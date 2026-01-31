import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Syne'] font-extrabold text-4xl text-white mb-2">
              DASHBOARD
            </h1>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              Welcome back to your learning hub
            </p>
          </div>
          <Link
            to="/"
            className="font-['JetBrains_Mono'] text-sm bg-[#00ff88] text-[#0a0a0f] px-6 py-3 uppercase tracking-wider font-bold hover:bg-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#14141f] border-2 border-[#00ff88]/20 p-6">
            <h3 className="font-['JetBrains_Mono'] text-sm text-[#00ff88] uppercase tracking-wider mb-4">
              My Courses
            </h3>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              You haven't enrolled in any courses yet.
            </p>
          </div>

          <div className="bg-[#14141f] border-2 border-[#00ff88]/20 p-6">
            <h3 className="font-['JetBrains_Mono'] text-sm text-[#00ff88] uppercase tracking-wider mb-4">
              Progress
            </h3>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              Complete courses to track your progress.
            </p>
          </div>

          <div className="bg-[#14141f] border-2 border-[#00ff88]/20 p-6">
            <h3 className="font-['JetBrains_Mono'] text-sm text-[#00ff88] uppercase tracking-wider mb-4">
              Achievements
            </h3>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              No achievements yet. Start learning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;