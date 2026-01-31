import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many reset attempts. Please try again later.';
      default:
        return 'Failed to send reset email. Please try again.';
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5 items-center justify-center p-12">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="font-['Syne'] font-extrabold text-5xl text-white mb-4">
                CHECK YOUR
              </h1>
              <h2 className="font-['Syne'] font-extrabold text-4xl text-[#00ff88] mb-6">
                EMAIL INBOX
              </h2>
              <p className="font-['DM_Sans'] text-[#c0c0d0] text-lg max-w-md mx-auto">
                We've sent a password reset link to your email address. Click the link to create a new password.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#a0a0b8]">
                <span className="text-[#00ff88] text-xl">📧</span>
                <span className="font-['DM_Sans']">Check your inbox</span>
              </div>
              <div className="flex items-center gap-3 text-[#a0a0b8]">
                <span className="text-[#00ff88] text-xl">🔍</span>
                <span className="font-['DM_Sans']">Check spam folder</span>
              </div>
              <div className="flex items-center gap-3 text-[#a0a0b8]">
                <span className="text-[#00ff88] text-xl">⚡</span>
                <span className="font-['DM_Sans']">Link expires in 1 hour</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-['Syne'] font-extrabold text-3xl text-white mb-2">
                RESET LINK SENT
              </h1>
              <p className="font-['DM_Sans'] text-[#c0c0d0]">
                Check your email for password reset instructions
              </p>
            </div>

            {/* Success Message */}
            <div className="bg-[#14141f] border-2 border-[#00ff88]/20 p-6 rounded mb-6">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-4xl mb-2 block">✅</span>
                  <h3 className="font-['Syne'] font-bold text-xl text-white mb-2">
                    Email Sent Successfully
                  </h3>
                  <p className="font-['DM_Sans'] text-[#c0c0d0] text-sm">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-['JetBrains_Mono'] text-[#00ff88] text-sm mt-2">
                    {email}
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-['DM_Sans'] text-[#a0a0b8] text-sm">
                    The link will expire in 1 hour. Didn't receive the email? Check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-block bg-[#00ff88] text-[#0a0a0f] px-6 py-3 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
              >
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5 items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="font-['Syne'] font-extrabold text-5xl text-white mb-4">
              FORGOT YOUR
            </h1>
            <h2 className="font-['Syne'] font-extrabold text-4xl text-[#00ff88] mb-6">
              PASSWORD?
            </h2>
            <p className="font-['DM_Sans'] text-[#c0c0d0] text-lg max-w-md mx-auto">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">🔐</span>
              <span className="font-['DM_Sans']">Secure password reset</span>
            </div>
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">⚡</span>
              <span className="font-['DM_Sans']">Link expires in 1 hour</span>
            </div>
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">📧</span>
              <span className="font-['DM_Sans']">Check all email folders</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-['Syne'] font-extrabold text-3xl text-white mb-2">
              RESET PASSWORD
            </h1>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              Enter your email to receive reset instructions
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#ff0088]/10 border border-[#ff0088]/20 rounded">
              <div className="flex items-center gap-2">
                <span className="text-[#ff0088] text-lg">⚠</span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#ff0088]">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00ff88] text-[#0a0a0f] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'SENDING RESET LINK...' : 'SEND RESET LINK →'}
            </button>
          </form>

          <div className="text-center mt-8">
            <span className="font-['DM_Sans'] text-[#a0a0b8]">Remember your password? </span>
            <Link
              to="/login"
              className="font-['JetBrains_Mono'] text-sm text-[#00ff88] hover:text-white transition-colors uppercase tracking-wider font-bold"
            >
              Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;