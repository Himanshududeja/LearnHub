import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

const EmailVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  const { email, role, instructorData } = location.state || {};

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.emailVerified) {
          // User is already verified, redirect to dashboard
          navigate('/dashboard');
        }
      } else {
        // No user, redirect to login
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendVerification = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendEmailVerification(user);
      setSuccess('Verification email sent! Please check your inbox and spam folder.');
    } catch (err) {
      console.error('Resend verification error:', err);
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      // Reload user to check verification status
      await user.reload();
      if (user.emailVerified) {
        setSuccess('Email verified successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('Email not yet verified. Please check your email and click the verification link.');
      }
    } catch (err) {
      console.error('Check verification error:', err);
      setError('Failed to check verification status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-['Syne'] font-extrabold text-2xl text-white mb-4">
            Invalid Access
          </h1>
          <p className="font-['DM_Sans'] text-[#c0c0d0] mb-6">
            Please register first to access this page.
          </p>
          <Link
            to="/register"
            className="inline-block bg-[#00ff88] text-[#0a0a0f] px-6 py-3 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
          >
            Go to Register →
          </Link>
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
              CHECK YOUR
            </h1>
            <h2 className="font-['Syne'] font-extrabold text-4xl text-[#00ff88] mb-6">
              EMAIL INBOX
            </h2>
            <p className="font-['DM_Sans'] text-[#c0c0d0] text-lg max-w-md mx-auto">
              We've sent a verification link to your email address. Click the link to activate your account and start learning.
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
              <span className="font-['DM_Sans']">Click verification link</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-['Syne'] font-extrabold text-3xl text-white mb-2">
              VERIFY EMAIL
            </h1>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              Complete your registration
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff88] text-lg">✓</span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#00ff88]">{success}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#ff0088]/10 border border-[#ff0088]/20 rounded">
              <div className="flex items-center gap-2">
                <span className="text-[#ff0088] text-lg">⚠</span>
                <span className="font-['JetBrains_Mono'] text-sm text-[#ff0088]">{error}</span>
              </div>
            </div>
          )}

          <div className="bg-[#14141f] border-2 border-[#00ff88]/20 p-6 rounded mb-6">
            <div className="text-center">
              <div className="mb-4">
                <span className="text-4xl mb-2 block">📧</span>
                <h3 className="font-['Syne'] font-bold text-xl text-white mb-2">
                  Verification Email Sent
                </h3>
                <p className="font-['DM_Sans'] text-[#c0c0d0] text-sm">
                  We've sent a verification link to:
                </p>
                <p className="font-['JetBrains_Mono'] text-[#00ff88] text-sm mt-2">
                  {email}
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-['DM_Sans'] text-[#a0a0b8] text-sm">
                  Didn't receive the email? Check your spam folder or click below to resend.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleCheckVerification}
              disabled={isLoading}
              className="w-full bg-[#00ff88] text-[#0a0a0f] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'CHECKING...' : 'I\'VE VERIFIED MY EMAIL →'}
            </button>

            <button
              onClick={handleResendVerification}
              disabled={isLoading}
              className="w-full bg-transparent border-2 border-[#00ff88]/20 text-[#00ff88] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#00ff88]/10 hover:border-[#00ff88] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'SENDING...' : 'RESEND VERIFICATION EMAIL'}
            </button>
          </div>

          <div className="text-center mt-8">
            <span className="font-['DM_Sans'] text-[#a0a0b8]">Wrong email? </span>
            <Link
              to="/register"
              className="font-['JetBrains_Mono'] text-sm text-[#00ff88] hover:text-white transition-colors uppercase tracking-wider font-bold"
            >
              Register Again →
            </Link>
          </div>

          <div className="text-center mt-4">
            <span className="font-['DM_Sans'] text-[#a0a0b8]">Already have an account? </span>
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

export default EmailVerification;