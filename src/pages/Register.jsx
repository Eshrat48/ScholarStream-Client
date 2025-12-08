import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Check password validation in real-time
    const hasMinLength = formData.password.length >= 6;
    const hasUppercase = /[A-Z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const isPasswordValid = hasMinLength && hasUppercase && hasSpecialChar;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate password
        if (!isPasswordValid) {
            alert("Please meet all password requirements");
            return;
        }

        // Registration logic will be implemented with Firebase later
        // Default role will be "Student"
        console.log("Register data:", { ...formData, role: "Student" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Image & Content */}
                    <div 
                        className="lg:w-5/12 relative p-12 flex flex-col justify-center text-white overflow-hidden bg-cover bg-center"
                        style={{backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=1200&fit=crop&q=80')"}}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/80 to-blue-900/85"></div>
                        <div className="relative z-10">
                        <div className="mb-8">
                            <h2 className="text-4xl font-bold mb-4">
                                Start Your Journey
                            </h2>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                Join thousands of students who found their perfect scholarship opportunities with ScholarStream.
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
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
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
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
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:w-7/12 p-12">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Your Account
                            </h1>
                            <p className="text-gray-600">
                                Start your scholarship journey today
                            </p>
                        </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-700 mb-2">
                                Profile Photo URL <span className="text-gray-500 font-normal text-xs">(Optional)</span>
                            </label>
                            <input
                                type="url"
                                id="photoURL"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                    className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Validation Indicators */}
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                        hasMinLength ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"
                                    }`}>
                                        {hasMinLength && <FaCheck className="text-white w-3 h-3" />}
                                    </div>
                                    <span className={`transition-colors ${hasMinLength ? "text-green-600 font-medium" : "text-gray-600"}`}>
                                        At least 6 characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                        hasUppercase ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"
                                    }`}>
                                        {hasUppercase && <FaCheck className="text-white w-3 h-3" />}
                                    </div>
                                    <span className={`transition-colors ${hasUppercase ? "text-green-600 font-medium" : "text-gray-600"}`}>
                                        One uppercase letter
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                        hasSpecialChar ? "bg-green-500" : "bg-gray-100 border-2 border-gray-300"
                                    }`}>
                                        {hasSpecialChar && <FaCheck className="text-white w-3 h-3" />}
                                    </div>
                                    <span className={`transition-colors ${hasSpecialChar ? "text-green-600 font-medium" : "text-gray-600"}`}>
                                        One special character
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 mt-6 text-base shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-sm text-gray-500 font-medium">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Google Sign Up Button */}
                    <button
                        type="button"
                        className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-all duration-300 text-base border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:scale-105 transform active:scale-95"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign up with Google
                    </button>

                    {/* Terms */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        By signing up, you agree to our{" "}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                            Terms of Service
                        </Link>
                    </p>

                    {/* Sign In Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;
