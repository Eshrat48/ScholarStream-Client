import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaBookOpen } from "react-icons/fa";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="py-10">
      <motion.div 
        className="mx-auto max-w-6xl bg-white rounded-xl px-8 py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left: logo + description */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <div className="flex items-center gap-3 logo-badge">
              <div className="badge w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaBookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">ScholarStream</h3>
              </div>
            </div>

            <p className="mt-4 text-gray-600">Connecting students with opportunities for a brighter future.</p>

            <p className="mt-6 text-sm text-gray-500">© 2024 ScholarStream. All rights reserved.</p>
          </motion.div>

          {/* Columns: Company, Resources, Legal */}
          <motion.div variants={itemVariants}>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Company</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-blue-600 transition-colors">Press</a></li>
              <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Resources</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="/help" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="/universities" className="hover:text-blue-600 transition-colors">For Universities</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Legal</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </motion.div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        <motion.div 
          className="flex items-center justify-between"
          variants={itemVariants}
        >
          <div className="text-gray-600">Follow Us</div>

          <div className="flex items-center gap-3">
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
              <FaLinkedinIn />
            </a>
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
              <FaTwitter />
            </a>
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
              <FaFacebookF />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;