import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-28 pt-12 px-4 sm:px-10">
      {/* Footer Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm text-gray-700 max-w-7xl mx-auto">

        {/* Logo and Description */}
        <div>
          <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
          <p className="max-w-md text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">COMPANY</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition">Home</li>
            <li className="hover:text-black transition">About Us</li>
            <li className="hover:text-black transition">Delivery</li>
            <li className="hover:text-black transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition">📞 9322721757</li>
            <li className="hover:text-black transition">✉️ contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <div className="mt-10 border-t pt-5 text-center text-xs text-gray-500">
        © 2024 Forever.com — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
