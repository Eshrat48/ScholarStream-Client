import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaBookOpen } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6) {
            errors.push("at least 6 characters");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("one uppercase letter");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("one special character");
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate password
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            setErrors({
                password: `Password must contain ${passwordErrors.join(", ")}`
            });
            return;
        }

        // Registration logic will be implemented with Firebase later
        // Default role will be "Student"
        console.log("Register data:", { ...formData, role: "Student" });
    };

    const handleGoogleSignIn = () => {
        // Google sign-in logic will be implemented with Firebase later
        console.log("Google sign-in clicked");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <FaBookOpen className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">ScholarStream</h1>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Welcome Text */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join ScholarStream to discover scholarships.</p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-900 mb-2">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                id="photoURL"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                placeholder="https://example.com/photo.jpg"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
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
                                    className={`w-full px-4 py-3 bg-gray-50 border ${
                                        errors.password ? "border-red-500" : "border-gray-200"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder:text-gray-500`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Min 6 chars, 1 uppercase, 1 special character
                            </p>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">OR</span>
                        </div>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-300"
                    >
                        <FcGoogle className="text-2xl" />
                        Sign up with Google
                    </button>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
