import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if Firebase is properly configured
    if (!auth) {
      setError('Firebase is not properly configured. Please check your Firebase configuration.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Store user info in localStorage if remember is checked
      if (formData.remember) {
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      }
      
      console.log('Login successful:', user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  const handleGoogleSignIn = async () => {
    // Check if Firebase is properly configured
    if (!auth || !googleProvider) {
      setError('Firebase is not properly configured. Please check your Firebase configuration.');
      return;
    }

    setIsGoogleLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('Google login successful:', user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(getGoogleErrorMessage(err.code));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const getGoogleErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      case 'auth/popup-blocked':
        return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials.';
      case 'auth/cancelled-popup-request':
        return 'Google sign-in was cancelled.';
      default:
        return 'Google sign-in failed. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-[#00ff88] opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-[15%] w-40 h-40 border-2 border-[#ff0088] opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-0 bg-[#14141f] border-2 border-[#00ff88]/20">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 lg:p-16">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
              <span className="font-['JetBrains_Mono'] font-bold text-[#0a0a0f] text-lg">{'<>'}</span>
            </div>
            <div>
              <div className="font-['Syne'] font-extrabold text-xl text-white">NEXUS</div>
              <div className="font-['JetBrains_Mono'] text-[8px] text-[#00ff88] tracking-[0.2em] -mt-1">LEARNING.SYS</div>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-['Syne'] font-extrabold text-4xl text-white mb-3">
              ACCESS
              <br />
              <span className="holographic">SYSTEM</span>
            </h1>
            <p className="font-['DM_Sans'] text-[#c0c0d0]">
              Enter your credentials to continue
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

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <div className="absolute -bottom-6 left-0 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                    ⚠ {errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="pt-2">
              <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 pr-12 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0a0b8] hover:text-[#00ff88] transition-colors"
                >
                  {showPassword ? '👁' : '◉'}
                </button>
                {errors.password && (
                  <div className="absolute -bottom-6 left-0 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                    ⚠ {errors.password}
                  </div>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 border-2 border-[#00ff88]/20 peer-checked:bg-[#00ff88] peer-checked:border-[#00ff88] transition-all"></div>
                  <svg className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0a0a0f] hidden peer-checked:block pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 font-['JetBrains_Mono'] text-xs text-[#a0a0b8] group-hover:text-white transition-colors uppercase tracking-wider">
                  Remember Me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-['JetBrains_Mono'] text-xs text-[#00ff88] hover:text-white transition-colors uppercase tracking-wider"
              >
                Forgot?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00ff88] text-[#0a0a0f] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ACCESSING...
                </span>
              ) : (
                'LOGIN →'
              )}
            </button>
          </form>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full bg-white text-[#0a0a0f] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-3"
          >
            {isGoogleLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                CONNECTING...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                CONTINUE WITH GOOGLE
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#00ff88]/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#14141f] px-4 font-['JetBrains_Mono'] text-xs text-[#5a5a70] uppercase tracking-wider">
                OR
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="font-['DM_Sans'] text-[#a0a0b8]">New to the system? </span>
            <Link
              to="/register"
              className="font-['JetBrains_Mono'] text-sm text-[#00ff88] hover:text-white transition-colors uppercase tracking-wider font-bold"
            >
              Create Account →
            </Link>
          </div>
        </div>

        {/* Right Side - Info Panel */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1c1c2e] p-16 border-l-2 border-[#00ff88]/20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 grid-pattern opacity-10"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block mb-8">
              <div className="font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-2">
                System Status
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></span>
                <span className="font-['JetBrains_Mono'] text-sm text-white">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            <h2 className="font-['Syne'] font-extrabold text-4xl text-white mb-6 leading-tight">
              WELCOME BACK TO THE
              <br />
              <span className="holographic">FUTURE</span>
            </h2>
            
            <p className="font-['DM_Sans'] text-[#c0c0d0] text-lg leading-relaxed mb-8">
              Access your personalized learning dashboard. Continue where you left off and unlock new skills.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'AI-powered learning assistant',
                'Track your progress in real-time',
                'Access 500+ premium courses',
                'Earn verified certificates',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-[#00ff88] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#00ff88] text-xs">✓</span>
                  </div>
                  <span className="font-['DM_Sans'] text-[#c0c0d0]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Window */}
          <div className="relative z-10 bg-[#0a0a0f] border border-[#00ff88]/20 p-6 mt-8">
            <div className="font-['JetBrains_Mono'] text-xs space-y-2">
              <div className="text-[#5a5a70]">
                <span className="text-[#00ff88]">$</span> system.authenticate()
              </div>
              <div className="text-[#a0a0b8]">
                → Initializing secure connection...
              </div>
              <div className="text-[#00ff88]">
                → Ready for authentication
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00ff88] opacity-30"></div>
        </div>
      </div>

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-8 left-8 flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#a0a0b8] hover:text-[#00ff88] transition-colors uppercase tracking-wider z-20"
      >
        <span>←</span>
        Back to Home
      </Link>
    </div>
  );
};

export default Login;