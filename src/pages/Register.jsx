import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if Firebase is properly configured
    if (!auth) {
      setError('Firebase is not properly configured. Please check your Firebase configuration.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update the user profile with display name
      await updateProfile(user, {
        displayName: formData.name
      });

      console.log('Registration successful:', user);
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#14141f] border-2 border-[#00ff88]/20 p-8">
        <div className="text-center mb-8">
          <h1 className="font-['Syne'] font-extrabold text-3xl text-white mb-2">
            CREATE ACCOUNT
          </h1>
          <p className="font-['DM_Sans'] text-[#c0c0d0]">
            Join the learning system
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
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
              placeholder="Your full name"
            />
            {errors.name && (
              <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                ⚠ {errors.name}
              </div>
            )}
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
              placeholder="your@email.com"
            />
            {errors.email && (
              <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                ⚠ {errors.email}
              </div>
            )}
          </div>

          <div>
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
            </div>
            {errors.password && (
              <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                ⚠ {errors.password}
              </div>
            )}
          </div>

          <div>
            <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                ⚠ {errors.confirmPassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00ff88] text-[#0a0a0f] py-4 font-['JetBrains_Mono'] text-sm font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        <div className="text-center mt-8">
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
  );
};

export default Register;
