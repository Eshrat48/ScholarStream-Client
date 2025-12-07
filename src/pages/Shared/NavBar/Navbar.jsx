import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
    // Replace this mock with your real auth state (context, redux, etc.)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const user = {
        name: "Jane Doe",
        avatar:
            "https://i.pravatar.cc/40?img=47",
    };

    return (
        <div className="bg-gray-50 py-6">
            <div className="mx-auto max-w-6xl bg-white shadow-xl rounded-xl px-6 py-3 flex items-center justify-between transition-shadow duration-300 hover:shadow-2xl">
                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="logo-badge cursor-pointer fade-up">
                        <div className="badge w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <FaBookOpen className="w-5 h-5" />
                        </div>
                        <a className="text-black text-xl font-bold shimmer-text">ScholarStream</a>
                    </div>
                </div>

                {/* Center: Links (visible on md+) */}
                <div className="hidden md:flex gap-8 items-center">
                    <a className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">Home</a>
                    <a className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-150">All Scholarships</a>
                </div>

                {/* Right: Auth buttons or user profile */}
                <div className="flex items-center gap-3">
                    {!isLoggedIn ? (
                            <>
                            <button className="btn-gradient rounded-full px-5 py-2 text-base font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150">
                                Register
                            </button>
                            <button className="bg-gray-100 text-black rounded-full px-5 py-2 text-base font-medium hover:bg-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-150">
                                Login
                            </button>
                        </>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen((s) => !s)}
                                className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-2 py-1 hover:shadow transition-shadow duration-150"
                            >
                                <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50 transform transition-all duration-150 origin-top-right">
                                    <a className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Dashboard</a>
                                    <button
                                        onClick={() => {
                                            // Replace with real logout logic
                                            setIsLoggedIn(false);
                                            setMenuOpen(false);
                                        }}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                    >
                                        <FiLogOut /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-t border-gray-200" />
        </div>
    );
};

export default Navbar;