import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../config/firebase';
import { post } from '../utils/apiClient';
import { FcGoogle } from 'react-icons/fc';
import { FaBookOpen } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      try {
        await post('/users', {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'Student',
        });
      } catch (err) {
        // User might already exist
      }

      const tokenResponse = await post('/auth/jwt', { email: user.email });
      const token = tokenResponse.token;
      localStorage.setItem('token', token);

      // Small delay to allow Firebase auth state to propagate
      await new Promise(resolve => setTimeout(resolve, 100));

      // Navigate after state is updated by Firebase auth observer
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Google login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 flex items-center justify-center py-4 px-3">
      <div className="w-full max-w-md max-h-[85vh] overflow-y-auto">
        {/* Logo Section */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaBookOpen className="text-white text-xl" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">ScholarStream</h1>
          <p className="text-gray-600 text-sm">Welcome back! Login to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          {error && (
            <div className="mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 text-xs font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-2.5 py-2 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-2.5 py-2 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                <span className="ml-2 text-[11px] text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-[11px] text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-[11px]">
              <span className="px-3 bg-white text-gray-600 font-medium">OR</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs"
            disabled={isLoading}
          >
            <FcGoogle className="text-lg" />
            <span>Continue with Google</span>
          </button>

          {/* Signup Link */}
          <div className="text-center mt-3">
            <p className="text-gray-600 text-[11px]">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Info Text */}
          <p className="text-center text-[11px] text-gray-500 mt-2 mb-2">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
