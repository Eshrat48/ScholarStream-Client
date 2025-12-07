import React from "react";
import { motion } from "framer-motion";
import scholar01 from "../../../assets/scholars/scholar01.jpg";
import scholar02 from "../../../assets/scholars/scholar02.jpg";
import scholar03 from "../../../assets/scholars/scholar03.jpg";

const HearFrom = () => {
    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            title: "Recipient of the Innovators in STEM Scholarship",
            image: scholar01,
            quote: "ScholarStream was a game-changer! I found a scholarship that perfectly matched my major and aspirations. The process was so simple."
        },
        {
            id: 2,
            name: "Maria Garcia",
            title: "Recipient of the Future Leaders Grant",
            image: scholar02,
            quote: "I never thought I'd be able to afford my dream university. Thanks to this platform, I secured the Future Leaders Grant!"
        },
        {
            id: 3,
            name: "David Chen",
            title: "Recipient of the Creative Arts Award",
            image: scholar03,
            quote: "The variety of scholarships is amazing. I'm an art student, and I found several awards specifically for my field. Highly recommend!"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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

    return (
        <section className="bg-gray-50 py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Hear From Our Scholars
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            variants={cardVariants}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            {/* Profile Image */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 p-1">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Quote - fixed height */}
                            <div className="text-center mb-6">
                                <div className="h-[140px] flex items-center justify-center">
                                    <p className="text-sm md:text-base text-blue-700 italic leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                            </div>

                            {/* Name and Title - always at bottom */}
                            <div className="text-center border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {testimonial.name}
                                </h3>
                                <p className="text-xs md:text-sm text-blue-600">
                                    {testimonial.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HearFrom;