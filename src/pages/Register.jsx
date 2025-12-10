import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validateRegistrationForm } from '../utils/validators';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Password validation checks
  const hasMinLength = formData.password.length >= 6;
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasSpecialChar = /[@$!%*?&]/.test(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateRegistrationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password, formData.photoURL);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Image & Content */}
          <div 
            className="lg:w-5/12 relative p-12 flex flex-col justify-center text-white"
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800')", backgroundSize: 'cover', backgroundPosition: 'center'}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/80 to-blue-900/85"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
              <p className="text-blue-100 text-lg">Join thousands of students who found their perfect scholarship opportunities.</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600 mb-8">Start your scholarship journey today</p>

            {apiError && (
              <div className="alert alert-error mb-4">
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full"
                  required
                />
                {errors.name && <span className="text-error text-sm">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                  required
                />
                {errors.email && <span className="text-error text-sm">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo URL</label>
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full"
                  required
                />
                {errors.photoURL && <span className="text-error text-sm">{errors.photoURL}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="input input-bordered w-full pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheck className={hasMinLength ? "text-success" : "text-gray-300"} />
                    <span className={hasMinLength ? "text-success" : "text-gray-600"}>At least 6 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheck className={hasUppercase ? "text-success" : "text-gray-300"} />
                    <span className={hasUppercase ? "text-success" : "text-gray-600"}>One uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaCheck className={hasSpecialChar ? "text-success" : "text-gray-300"} />
                    <span className={hasSpecialChar ? "text-success" : "text-gray-600"}>One special character</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-spinner"></span> : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
