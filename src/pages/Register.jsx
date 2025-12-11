import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../config/firebase';
import { validateRegistrationForm } from '../utils/validators';
import { post } from '../utils/apiClient';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register } = useAuth();
  
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: ""
    });
  
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Check password validation in real-time
    const hasMinLength = formData.password.length >= 6;
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isPasswordValid = hasMinLength && hasUppercase && hasSpecialChar;

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

    const handleGoogleSignUp = async () => {
        setApiError('');
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

            const tokenResponse = await post('/auth/generate-token', { email: user.email });
            const token = tokenResponse.data.token;
            localStorage.setItem('token', token);

            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (err) {
            setApiError(err.message || 'Google sign-up failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Ambient animated background accents */}
                <motion.div
                    className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 blur-3xl opacity-40"
                    aria-hidden="true"
                    initial={{ x: 0, y: 0 }}
                    animate={{ x: [0, -15, 10, 0], y: [0, 12, -8, 0] }}
                    transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Image & Content */}
                    <motion.div 
                        className="lg:w-5/12 relative p-10 flex flex-col justify-center text-white overflow-hidden bg-cover bg-center"
                        style={{backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=1200&fit=crop&q=80')"}}
                        initial={{ opacity: 0.8, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/80 to-blue-900/85"></div>
                        <div className="relative z-10">
                            <div className="mb-6">
                                <h2 className="text-3xl font-bold mb-3">Start Your Journey</h2>
                                <p className="text-blue-100 text-base leading-relaxed">Join thousands of students who found their perfect scholarship opportunities with ScholarStream.</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 0 0 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Access Thousands of Scholarships</h3>
                                        <p className="text-blue-100 text-sm">Find opportunities that match your profile</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Easy Application Process</h3>
                                        <p className="text-blue-100 text-sm">Apply to multiple scholarships with one profile</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Track Your Applications</h3>
                                        <p className="text-blue-100 text-sm">Monitor your scholarship journey in one place</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div className="lg:w-7/12 p-8" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h1>
                            <p className="text-gray-600 text-sm">Start your scholarship journey today</p>
                        </div>

                        {apiError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-red-700 text-sm font-medium">{apiError}</p>
                            </div>
                        )}

                        {/* Register Form */}
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-xs lg:text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500" />
                                {errors.name && <span className="text-red-600 text-xs font-medium mt-0.5 block">{errors.name}</span>}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-xs lg:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500" />
                                {errors.email && <span className="text-red-600 text-xs font-medium mt-0.5 block">{errors.email}</span>}
                            </div>

                            {/* Photo URL Field */}
                            <div>
                                <label htmlFor="photoURL" className="block text-xs lg:text-sm font-semibold text-gray-700 mb-1">Photo URL <span className="text-gray-500 font-normal text-xs">(Optional)</span></label>
                                <input type="url" id="photoURL" name="photoURL" value={formData.photoURL} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500" />
                                {errors.photoURL && <span className="text-red-600 text-xs font-medium mt-0.5 block">{errors.photoURL}</span>}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-xs lg:text-sm font-semibold text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}</button>
                                </div>

                                {/* Password Validation Indicators */}
                                <div className="mt-2 space-y-1 text-xs">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${hasMinLength ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"}`}>{hasMinLength && <FaCheck className="text-white w-3 h-3" />}</div>
                                        <span className={`transition-colors ${hasMinLength ? "text-green-600 font-medium" : "text-gray-600"}`}>At least 6 characters</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${hasUppercase ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"}`}>{hasUppercase && <FaCheck className="text-white w-3 h-3" />}</div>
                                        <span className={`transition-colors ${hasUppercase ? "text-green-600 font-medium" : "text-gray-600"}`}>One uppercase letter</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${hasSpecialChar ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"}`}>{hasSpecialChar && <FaCheck className="text-white w-3 h-3" />}</div>
                                        <span className={`transition-colors ${hasSpecialChar ? "text-green-600 font-medium" : "text-gray-600"}`}>One special character</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sign Up Button */}
                            <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 mt-4 text-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                                {isLoading ? (<><span className="loading loading-spinner loading-sm"></span>Creating account...</>) : ('Create Account')}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-3">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-xs text-gray-500 font-medium">OR</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* Google Sign Up Button */}
                        <motion.button onClick={handleGoogleSignUp} disabled={isLoading} type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                            <FcGoogle className="w-5 h-5" />
                            Sign up with Google
                        </motion.button>

                        {/* Terms */}
                        <p className="text-center text-xs text-gray-600 mt-4">By signing up, you agree to our <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">Terms of Service</Link></p>

                        {/* Sign In Link */}
                        <p className="text-center text-xs text-gray-600 mt-2 mb-4">Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">Sign In</Link></p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
