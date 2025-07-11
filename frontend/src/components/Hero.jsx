import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-14 sm:py-0 px-6">
        <div className="text-gray-800 dark:text-gray-100 max-w-md">

          {/* Tagline */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 md:w-10 h-[2px] bg-gray-800 dark:bg-gray-200"></span>
            <p className="text-sm md:text-base font-medium tracking-wide">OUR BESTSELLERS</p>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight my-4">
            Latest Arrivals
          </h1>

          {/* CTA */}
          <Link to="/collection" className="flex items-center gap-2 group cursor-pointer">
            <p className="font-semibold text-base md:text-lg group-hover:underline">SHOP NOW</p>
            <span className="w-8 md:w-10 h-[1px] bg-gray-800 dark:bg-gray-200"></span>
          </Link>

        </div>
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-1/2">
        <img src={assets.hero_img} alt="Hero" className="w-full h-full object-cover" />
      </div>

    </section>
  );
};

export default Hero;
