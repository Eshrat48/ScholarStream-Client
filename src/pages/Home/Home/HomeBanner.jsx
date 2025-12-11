import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../../../assets/banner.jpg'; 
import { FaSearch } from 'react-icons/fa';

const HomeBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Handle search functionality
    const handleSearch = () => {
        if (searchQuery.trim()) {
            // Navigate to All Scholarships page with search query
            navigate(`/scholarships?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Animation variants for Framer Motion
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' }
        }
    };

    const searchBarVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' }
        }
    };

    return (
        // Container: Full width background matching image white
        <div className="bg-white py-4 lg:py-8">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
                    {/* 1. Left Side: Text and Search Bar */}
                    <div className="text-left space-y-6">
                        {/* Title Section with animation */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={titleVariants}
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Unlock Your Future. Find Your Scholarship.
                            </h1>
                        </motion.div>

                        {/* Description with animation */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={descriptionVariants}
                        >
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xl">
                                ScholarStream simplifies the search for financial aid, connecting students with the perfect opportunities to fund their education.
                            </p>
                        </motion.div>

                        {/* Search Bar / Search Scholarship Button Section */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={searchBarVariants}
                            className="w-full max-w-lg"
                        >
                            <div className="flex gap-2 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-2">
                                <div className="flex items-center flex-1 px-4 gap-3 text-gray-600">
                                    <FaSearch className="text-lg text-blue-500 flex-shrink-0" />
                                    <input
                                        type="text"
                                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                                        placeholder="Search for scholarships..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                {/* Blue Search Button */}
                                <button 
                                    onClick={handleSearch}
                                    className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 border-none rounded-md transition-all duration-300 active:scale-95 flex-shrink-0 text-sm"
                                >
                                    Search
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* 2. Right Side: Illustration Image with animation */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={imageVariants}
                        className="flex justify-center lg:justify-end"
                    >
                        {/* Image without shadow, blending with white background */}
                        <div className="relative w-full max-w-sm md:max-w-md">
                            <img 
                                src={heroImage} 
                                alt="Students looking at a large scholarship opportunity" 
                                className="w-full h-auto rounded-2xl object-cover hover:opacity-90 transition-all duration-300 relative z-10" 
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;