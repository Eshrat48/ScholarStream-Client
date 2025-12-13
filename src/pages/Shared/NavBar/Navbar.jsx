import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <div className="sticky top-0 z-50 py-6">
            <div className="mx-auto max-w-6xl bg-white shadow-xl rounded-xl px-6 py-3 flex items-center justify-between transition-shadow duration-300 hover:shadow-2xl">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <Link to="/" className="logo-badge cursor-pointer fade-up">
                        <div className="badge w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <FaBookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-black text-xl font-bold shimmer-text">ScholarStream</span>
                    </Link>
                </div>

                {/* Center: Links (visible on md+) */}
                <div className="hidden md:flex gap-8 items-center">
                    <Link to="/" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">Home</Link>
                    <Link to="/scholarships" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">All Scholarships</Link>
                    
                    {/* Logged in navigation */}
                    {user && (
                        <>
                            <Link to="/dashboard/my-applications" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">My Applications</Link>
                            <Link to="/dashboard" className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">Dashboard</Link>
                        </>
                    )}
                </div>

                {/* Right: Auth buttons or user profile */}
                <div className="flex items-center gap-3">
                    {!user ? (
                            <>
                            <Link to="/register" className="btn-gradient rounded-full px-5 py-2 text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150">
                                Register
                            </Link>
                            <Link to="/login" className="bg-gray-100 text-black rounded-full px-5 py-2 text-base font-medium hover:bg-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-150">
                                Login
                            </Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((s) => !s)}
                                className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-2 py-1 hover:shadow transition-shadow duration-150"
                                title={user.email}
                            >
                                <img 
                                    src={user.photoURL || localStorage.getItem('userPhotoURL') || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=0D8ABC&color=fff`} 
                                    alt="avatar" 
                                    className="w-10 h-10 rounded-full object-cover"
                                    onError={(e) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=0D8ABC&color=fff`;
                                    }}
                                />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50 transform transition-all duration-150 origin-top-right">
                                    <div className="px-4 py-2 text-sm text-gray-600 border-b">
                                        {user.displayName || user.email}
                                    </div>
                                    <Link 
                                        to="/dashboard" 
                                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link 
                                        to="/dashboard/my-applications" 
                                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        My Applications
                                    </Link>
                                    <Link 
                                        to="/dashboard/my-reviews" 
                                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        My Reviews
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 border-t"
                                    >
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;