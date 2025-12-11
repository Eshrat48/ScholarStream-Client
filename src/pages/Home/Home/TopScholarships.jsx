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
                // Fetch top 6 scholarships with lowest fees
                const response = await get('/scholarships?limit=6&sortBy=applicationFees');
                // Handle both direct array and object with data property
                const data = Array.isArray(response) ? response : (response?.scholarships || response?.data || []);
                setScholarships(data);
            } catch (err) {
                console.error('Failed to fetch scholarships:', err);
                setError('Failed to load scholarships');
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
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary group flex flex-col h-full"
                            >
                                {/* University Image */}
                                <figure className="h-48 overflow-hidden flex-shrink-0">
                                    <img
                                        src={scholarship.universityImage || 'https://via.placeholder.com/400x300'}
                                        alt={scholarship.universityName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </figure>

                                {/* Card Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    {/* University Name */}
                                    <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{scholarship.universityName}</h3>
                                    
                                    {/* Scholarship Name */}
                                    <h2 className="text-lg font-bold text-gray-800 leading-tight mb-3 line-clamp-2">{scholarship.scholarshipName}</h2>

                                    {/* Category Badges */}
                                    <div className="flex gap-2 mb-3">
                                        <span className="badge badge-primary badge-sm text-white font-medium">{scholarship.scholarshipCategory}</span>
                                        <span className="badge badge-secondary badge-sm text-white font-medium">{scholarship.degree}</span>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center text-sm text-gray-600 mb-2">
                                        <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-medium">{scholarship.universityCity}, {scholarship.universityCountry}</span>
                                    </div>

                                    {/* Application Fee */}
                                    <div className="flex items-center text-sm text-gray-600 mb-4 mt-auto pt-3 border-t border-gray-200">
                                        <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5m-11-5v5h5m0-5L19 10" />
                                        </svg>
                                        <span className="font-medium">
                                            {scholarship.applicationFees === 0 ? (
                                                <span className="text-green-600 font-semibold">No Fee</span>
                                            ) : (
                                                <span>${scholarship.applicationFees}</span>
                                            )}
                                        </span>
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={() => handleViewDetails(scholarship._id)}
                                        className="btn btn-primary btn-sm w-full shadow-md hover:shadow-lg transition-shadow mt-2"
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
