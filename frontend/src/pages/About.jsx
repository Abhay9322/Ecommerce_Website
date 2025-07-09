import React from 'react'
import { assets } from '../assets/assets'
import { FaCheckCircle, FaBolt, FaSmile } from 'react-icons/fa'
import NewsletterBox from '../components/NewsletterBox'
import Title from '../components/Title'

const About = () => {
  return (
    <div className="bg-white text-gray-800 px-6 md:px-20 lg:px-32">

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-12 py-20">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6">Welcome to <span className="text-blue-600">ForEveryYou</span></h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            ForEveryYou is more than just an online store—it's a lifestyle. We’re here to transform the way people shop by
            blending quality, variety, and convenience into one amazing experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our journey started with a single idea: to create a shopping platform that feels personal, modern, and truly helpful.
          </p>
        </div>
        <img
          src={assets.about_img}
          alt="About"
          className="w-full md:w-[500px] rounded-2xl shadow-xl"
        />
      </section>

      {/* Mission Statement */}
      <section className="bg-blue-50 rounded-xl p-10 mb-20">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          We aim to make online shopping effortless, enjoyable, and trustworthy. Whether you're looking for fashion, gadgets,
          or daily essentials — we provide a smooth and satisfying journey from browsing to delivery.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="grid gap-8 md:grid-cols-3 text-center">
          <div className="bg-gray-50 hover:shadow-lg transition-all p-8 rounded-xl">
            <FaCheckCircle className="text-blue-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Top-Quality Products</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We carefully select each product to ensure the best quality and long-lasting performance.
            </p>
          </div>

          <div className="bg-gray-50 hover:shadow-lg transition-all p-8 rounded-xl">
            <FaBolt className="text-yellow-500 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Fast & Easy Shopping</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Enjoy a lightning-fast interface and a checkout process that takes just seconds.
            </p>
          </div>

          <div className="bg-gray-50 hover:shadow-lg transition-all p-8 rounded-xl">
            <FaSmile className="text-green-500 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Support You’ll Love</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our support team is friendly, fast, and always ready to help you with anything.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterBox />
    </div>
  )
}

export default About
