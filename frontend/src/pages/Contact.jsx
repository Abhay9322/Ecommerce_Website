import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 px-4 md:px-16 lg:px-32 border-t">

      {/* Title Section */}
      <div className="text-center text-3xl pt-12 font-bold">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Main Content */}
      <div className="my-16 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Info */}
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-700">
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">Our Store</p>
            <p>
              Shop No. 12, Phoenix Marketcity<br />
              LBS Marg, Kurla (West), Mumbai – 400070<br />
              Maharashtra, India
            </p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>+91-9898989898</p>
            <p className="font-medium mt-2">Email:</p>
            <p>support@forever.in</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-1">Careers at Forever</p>
            <p className="text-gray-600 mb-4">Learn more about our teams and job openings.</p>
            <button className="px-6 py-3 text-sm border border-gray-900 rounded-md hover:bg-black hover:text-white transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Contact Image */}
        <img
          src={assets.contact_img}
          alt="contact"
          className="w-full md:w-[480px] rounded-lg shadow-md"
        />
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  )
}

export default Contact
