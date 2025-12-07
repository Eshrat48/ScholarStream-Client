import React from "react";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaBookOpen } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl bg-white rounded-xl px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left: logo + description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 logo-badge fade-up">
              <div className="badge w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaBookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">ScholarStream</h3>
              </div>
            </div>

            <p className="mt-4 text-gray-600">Connecting students with opportunities for a brighter future.</p>

            <p className="mt-6 text-sm text-gray-500">© 2024 ScholarStream. All rights reserved.</p>
          </div>

          {/* Columns: Company, Resources, Legal */}
          <div>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Company</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/about" className="footer-link fade-up" data-delay="0ms">About Us</a></li>
              <li><a href="/careers" className="footer-link fade-up" data-delay="30ms">Careers</a></li>
              <li><a href="/press" className="footer-link fade-up" data-delay="60ms">Press</a></li>
              <li><a href="/contact" className="footer-link fade-up" data-delay="90ms">Contact</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Resources</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/blog" className="footer-link fade-up" data-delay="0ms">Blog</a></li>
              <li><a href="/help" className="footer-link fade-up" data-delay="30ms">Help Center</a></li>
              <li><a href="/universities" className="footer-link fade-up" data-delay="60ms">For Universities</a></li>
            </ul>
          </div>

          <div>
            <h6 className="text-sm font-semibold text-gray-900 mb-4">Legal</h6>
            <ul className="space-y-3 text-gray-600">
              <li><a href="/terms" className="footer-link fade-up" data-delay="0ms">Terms of Service</a></li>
              <li><a href="/privacy" className="footer-link fade-up" data-delay="30ms">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="text-gray-600">Follow Us</div>

          <div className="flex items-center gap-3">
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150">
              <FaLinkedinIn />
            </a>
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150">
              <FaTwitter />
            </a>
            <a className="w-9 h-9 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors duration-150">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;