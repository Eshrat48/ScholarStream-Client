import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How do I apply for a scholarship?",
            answer: "Browse our scholarship listings, select the one that fits your profile, and click 'Apply'. You'll be guided through a simple application process including payment of any application fees via our secure payment system."
        },
        {
            id: 2,
            question: "Are there scholarships with no application fees?",
            answer: "Yes! We have many scholarships with zero application fees. Use our filter options on the All Scholarships page to find free-to-apply opportunities."
        },
        {
            id: 3,
            question: "How long does the application review take?",
            answer: "Review times vary by scholarship and university. Typically, moderators review applications within 2-4 weeks. You can track your application status in your dashboard."
        },
        {
            id: 4,
            question: "Can I apply for multiple scholarships?",
            answer: "Absolutely! You can apply for as many scholarships as you qualify for. We recommend applying to multiple opportunities to increase your chances of success."
        },
        {
            id: 5,
            question: "What payment methods do you accept?",
            answer: "We accept all major credit and debit cards through our secure Stripe payment integration. All transactions are encrypted and secure."
        },
        {
            id: 6,
            question: "Can I edit my application after submission?",
            answer: "You can edit your application only if the status is 'Pending'. Once a moderator begins reviewing (status changes to 'Processing'), editing is no longer available."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
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
        <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg">
                        Find answers to common questions about ScholarStream
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="space-y-4"
                >
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="text-lg font-semibold text-gray-900 pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <FaChevronDown className="text-blue-600 text-xl" />
                                </motion.div>
                            </button>

                            {/* Answer */}
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center bg-white rounded-xl p-8 shadow-md"
                >
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Our support team is here to help you find the perfect scholarship opportunity.
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
