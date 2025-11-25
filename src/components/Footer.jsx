import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-white text-lg mb-4 tracking-wide">Get to Know Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Press Releases
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Science & Technology
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg mb-4 tracking-wide">Connect with Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg mb-4 tracking-wide">Make Money with Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Sell on Flipkart
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Sell under Accelerator
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Protect Your Brand
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Global Selling
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Become an Affiliate
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white text-lg mb-4 tracking-wide">Let Us Help You</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Your Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Returns Centre
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                100% Purchase Protection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                App Download
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-colors duration-200">
                Help
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;