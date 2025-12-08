import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TopScholarships = () => {
    const navigate = useNavigate();

    // Mock data for top 6 scholarships (will be replaced with API data later)
    const scholarships = [
        {
            id: 1,
            scholarshipName: "Future Leaders Scholarship",
            universityName: "Harvard University",
            universityImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
            scholarshipCategory: "Full fund",
            location: "Cambridge, USA",
            applicationFees: 0,
            degree: "Masters",
            postDate: "2024-12-01"
        },
        {
            id: 2,
            scholarshipName: "Innovation in STEM Award",
            universityName: "MIT",
            universityImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
            scholarshipCategory: "Full fund",
            location: "Massachusetts, USA",
            applicationFees: 50,
            degree: "Bachelor",
            postDate: "2024-11-28"
        },
        {
            id: 3,
            scholarshipName: "Global Excellence Scholarship",
            universityName: "Oxford University",
            universityImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
            scholarshipCategory: "Partial",
            location: "Oxford, UK",
            applicationFees: 75,
            degree: "Masters",
            postDate: "2024-11-25"
        },
        {
            id: 4,
            scholarshipName: "Creative Arts Grant",
            universityName: "Stanford University",
            universityImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
            scholarshipCategory: "Partial",
            location: "California, USA",
            applicationFees: 100,
            degree: "Bachelor",
            postDate: "2024-11-20"
        },
        {
            id: 5,
            scholarshipName: "Research Excellence Award",
            universityName: "Cambridge University",
            universityImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
            scholarshipCategory: "Full fund",
            location: "Cambridge, UK",
            applicationFees: 0,
            degree: "Masters",
            postDate: "2024-11-15"
        },
        {
            id: 6,
            scholarshipName: "Community Impact Scholarship",
            universityName: "Yale University",
            universityImage: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=400&h=300&fit=crop",
            scholarshipCategory: "Partial",
            location: "Connecticut, USA",
            applicationFees: 60,
            degree: "Bachelor",
            postDate: "2024-11-10"
        }
    ];

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
        // Navigate to scholarship details page (will be implemented later)
        navigate(`/scholarship/${scholarshipId}`);
    };

    return (
        <section className="bg-white py-16 lg:py-20">
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

                {/* Scholarships Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {scholarships.map((scholarship) => (
                        <motion.div
                            key={scholarship.id}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            {/* University Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={scholarship.universityImage}
                                    alt={scholarship.universityName}
                                    className="w-full h-full object-cover"
                                />
                                {/* Scholarship Category Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        scholarship.scholarshipCategory === "Full fund" 
                                            ? "bg-green-500 text-white" 
                                            : "bg-yellow-500 text-white"
                                    }`}>
                                        {scholarship.scholarshipCategory}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                {/* University Name */}
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {scholarship.universityName}
                                </h3>

                                {/* Scholarship Name */}
                                <p className="text-sm text-gray-600 mb-3">
                                    {scholarship.scholarshipName}
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{scholarship.location}</span>
                                </div>

                                {/* Application Fees */}
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">Application Fee:</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        {scholarship.applicationFees === 0 ? "Free" : `$${scholarship.applicationFees}`}
                                    </span>
                                </div>

                                {/* View Details Button */}
                                <button
                                    onClick={() => handleViewDetails(scholarship.id)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                                >
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TopScholarships;
