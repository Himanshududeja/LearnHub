import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    bio: '',
    expertise: '',
    linkedin: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Very Weak', feedback: 'Enter a password' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role: role
    });
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    let label = '';
    if (score === 0) label = 'Very Weak';
    else if (score === 1) label = 'Weak';
    else if (score === 2) label = 'Fair';
    else if (score === 3) label = 'Good';
    else if (score === 4) label = 'Strong';
    else label = 'Very Strong';

    const feedbackText = feedback.length > 0 ? `Add: ${feedback.join(', ')}` : 'Strong password!';

    setPasswordStrength({ score, label, feedback: feedbackText });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (passwordStrength < 50) newErrors.password = 'Password is too weak. Please choose a stronger password';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must agree to the Terms & Conditions';

    // Instructor-specific validation
    if (formData.role === 'instructor') {
      if (!formData.bio.trim()) newErrors.bio = 'Bio/Experience is required for instructors';
      if (!formData.expertise.trim()) newErrors.expertise = 'Expertise/Subject area is required for instructors';
    }

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

    setIsLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update the user profile with display name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Send email verification
      await sendEmailVerification(user);

      console.log('Registration successful:', user);

      // Redirect to email verification page
      navigate('/verify-email', {
        state: {
          email: formData.email,
          role: formData.role,
          instructorData: formData.role === 'instructor' ? {
            bio: formData.bio,
            expertise: formData.expertise,
            linkedin: formData.linkedin
          } : null
        }
      });
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
        return 'An account with this email already exists. Please try logging in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      default:
        return 'Registration failed. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00ff88]/10 to-[#00ff88]/5 items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="font-['Syne'] font-extrabold text-5xl text-white mb-4">
              JOIN THE
            </h1>
            <h2 className="font-['Syne'] font-extrabold text-4xl text-[#00ff88] mb-6">
              LEARNING REVOLUTION
            </h2>
            <p className="font-['DM_Sans'] text-[#c0c0d0] text-lg max-w-md mx-auto">
              Create your account and start your journey towards mastering new skills with our comprehensive learning platform.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">✓</span>
              <span className="font-['DM_Sans']">Access to premium courses</span>
            </div>
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">✓</span>
              <span className="font-['DM_Sans']">Interactive learning experience</span>
            </div>
            <div className="flex items-center gap-3 text-[#a0a0b8]">
              <span className="text-[#00ff88] text-xl">✓</span>
              <span className="font-['DM_Sans']">Community support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
            {/* Role Selection */}
            <div>
              <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`p-4 border-2 transition-all font-['DM_Sans'] ${
                    formData.role === 'student'
                      ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
                      : 'border-[#00ff88]/20 bg-[#1c1c2e] text-[#a0a0b8] hover:border-[#00ff88]/40'
                  }`}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('instructor')}
                  className={`p-4 border-2 transition-all font-['DM_Sans'] ${
                    formData.role === 'instructor'
                      ? 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
                      : 'border-[#00ff88]/20 bg-[#1c1c2e] text-[#a0a0b8] hover:border-[#00ff88]/40'
                  }`}
                >
                  👨‍🏫 Instructor
                </button>
              </div>
              {errors.role && (
                <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                  ⚠ {errors.role}
                </div>
              )}
            </div>

            {/* Full Name */}
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

            {/* Email */}
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

            {/* Password */}
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
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-[#1c1c2e] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.score === 0 ? 'bg-[#ff0088]' :
                          passwordStrength.score === 1 ? 'bg-[#ff8800]' :
                          passwordStrength.score === 2 ? 'bg-[#ffff00]' :
                          passwordStrength.score === 3 ? 'bg-[#88ff00]' :
                          passwordStrength.score === 4 ? 'bg-[#00ff88]' :
                          'bg-[#00ff88]'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`font-['JetBrains_Mono'] text-xs ${
                      passwordStrength.score >= 3 ? 'text-[#00ff88]' : 'text-[#ff0088]'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="text-xs text-[#a0a0b8] font-['DM_Sans']">
                    {passwordStrength.feedback}
                  </div>
                </div>
              )}
              {errors.password && (
                <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                  ⚠ {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
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

            {/* Instructor Fields */}
            {formData.role === 'instructor' && (
              <>
                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors resize-none"
                    placeholder="Tell us about your teaching experience and expertise..."
                  />
                  {errors.bio && (
                    <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                      ⚠ {errors.bio}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                    Areas of Expertise
                  </label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
                    placeholder="e.g., Web Development, Data Science, Design"
                  />
                  {errors.expertise && (
                    <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                      ⚠ {errors.expertise}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono'] text-xs text-[#00ff88] uppercase tracking-[0.2em] mb-3">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-[#1c1c2e] border-2 border-[#00ff88]/20 px-4 py-3 text-white font-['DM_Sans'] focus:outline-none focus:border-[#00ff88] transition-colors"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </>
            )}

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 bg-[#1c1c2e] border-2 border-[#00ff88]/20 text-[#00ff88] focus:ring-[#00ff88] focus:ring-2"
                />
                <span className="font-['DM_Sans'] text-sm text-[#a0a0b8]">
                  I agree to the{' '}
                  <a href="#" className="text-[#00ff88] hover:text-white transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#00ff88] hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.acceptTerms && (
                <div className="mt-2 font-['JetBrains_Mono'] text-xs text-[#ff0088]">
                  ⚠ {errors.acceptTerms}
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
    </div>
  );
};

export default Register;
