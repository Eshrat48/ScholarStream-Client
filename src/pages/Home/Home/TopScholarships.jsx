import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { get } from "../../../utils/apiClient";

const TopScholarships = () => {
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopScholarships = async () => {
            try {
                setLoading(true);
                // Fetch top 6 scholarships with lowest fees, sorted by newest first
                const response = await get('/scholarships?limit=6&sortBy=applicationFees');
                setScholarships(response || []);
            } catch (err) {
                console.error('Failed to fetch scholarships:', err);
                setError('Failed to load scholarships');
                // Fallback to empty array
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopScholarships();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const handleViewDetails = (scholarshipId) => {
        // Navigate to scholarship details page
        navigate(`/scholarships/${scholarshipId}`);
    };

    return (
        <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Top Scholarships
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Explore our most popular scholarship opportunities with the lowest application fees
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="alert alert-error mb-6">
                        <span>{error}</span>
                    </div>
                )}

                {/* Scholarships Grid */}
                {!loading && scholarships.length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {scholarships.map((scholarship) => (
                            <motion.div
                                key={scholarship._id}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            >
                                {/* University Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={scholarship.universityImage || 'https://via.placeholder.com/400x300'}
                                        alt={scholarship.universityName}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Scholarship Category Badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white">
                                            {scholarship.scholarshipCategory}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    {/* University Name */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {scholarship.universityName}
                                    </h3>

                                    {/* Scholarship Name */}
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {scholarship.scholarshipName}
                                    </p>

                                    {/* Location */}
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span>{scholarship.universityCity}, {scholarship.universityCountry}</span>
                                    </div>

                                    {/* Degree & Category */}
                                    <div className="flex gap-2 mb-4">
                                        <span className="badge badge-sm badge-primary">{scholarship.degree}</span>
                                        <span className="badge badge-sm badge-secondary">{scholarship.scholarshipCategory}</span>
                                    </div>

                                    {/* Application Fees */}
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                        <span className="text-sm text-gray-600">Application Fee:</span>
                                        <span className={`text-lg font-bold ${scholarship.applicationFees === 0 ? 'text-green-600' : 'text-blue-600'}`}>
                                            {scholarship.applicationFees === 0 ? "Free" : `$${scholarship.applicationFees}`}
                                        </span>
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={() => handleViewDetails(scholarship._id)}
                                        className="w-full btn btn-primary btn-sm"
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && scholarships.length === 0 && !error && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">No scholarships available at the moment</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopScholarships;
