import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
            <motion.div 
                className="text-center max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Animated 404 Image */}
                <motion.div 
                    className="mb-4 flex justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="relative w-40 h-40">
                        {/* Floating elements */}
                        <motion.div
                            className="absolute top-0 left-4 w-8 h-8 bg-blue-500/30 rounded-lg"
                            animate={{ 
                                y: [0, -10, 0],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-4 right-2 w-6 h-6 bg-purple-500/30 rounded-full"
                            animate={{ 
                                y: [0, 10, 0],
                                x: [0, 5, 0]
                            }}
                            transition={{ 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        />
                        <motion.div
                            className="absolute bottom-8 left-2 w-7 h-7 bg-blue-400/30 rounded-lg"
                            animate={{ 
                                y: [0, -8, 0],
                                rotate: [0, -10, 0]
                            }}
                            transition={{ 
                                duration: 2.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3
                            }}
                        />
                        
                        {/* Main illustration - Document with magnifying glass */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <motion.div
                                    animate={{ 
                                        y: [0, -5, 0],
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                                        {/* Document/Paper */}
                                        <rect x="20" y="15" width="40" height="55" rx="3" fill="#3B82F6" opacity="0.2"/>
                                        <rect x="22" y="17" width="36" height="51" rx="2" fill="white" stroke="#3B82F6" strokeWidth="2"/>
                                        {/* Lines on document */}
                                        <line x1="28" y1="25" x2="52" y2="25" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
                                        <line x1="28" y1="32" x2="48" y2="32" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
                                        <line x1="28" y1="39" x2="52" y2="39" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
                                        
                                        {/* Magnifying glass */}
                                        <circle cx="60" cy="55" r="15" fill="white" stroke="#8B5CF6" strokeWidth="3"/>
                                        <circle cx="60" cy="55" r="10" fill="none" stroke="#8B5CF6" strokeWidth="2"/>
                                        <line x1="70" y1="65" x2="80" y2="75" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round"/>
                                        
                                        {/* Question mark inside magnifying glass */}
                                        <text x="60" y="62" textAnchor="middle" fill="#8B5CF6" fontSize="14" fontWeight="bold">?</text>
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 404 Text */}
                <motion.h1 
                    className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    404
                </motion.h1>

                {/* Error Message */}
                <motion.h2 
                    className="text-xl md:text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Oops! It seems you've wandered off the path.
                </motion.h2>

                <motion.p 
                    className="text-sm text-gray-600 mb-5 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    The page you are looking for could not be found. It might have been moved, deleted, or perhaps never existed.
                </motion.p>

                {/* Return Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link 
                        to="/"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95"
                    >
                        Return to Homepage
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Error;
