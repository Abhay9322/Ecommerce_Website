import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='py-20 px-4 bg-gray-50'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center text-gray-700'>

        {/* Policy Item */}
        <div className='flex flex-col items-center'>
          <img src={assets.exchange_icon} className='w-12 mb-4' alt="Exchange Icon" />
          <p className='text-base font-semibold'>Easy Exchange Policy</p>
          <p className='text-sm text-gray-500 mt-1'>We offer hassle-free exchange for all items.</p>
        </div>

        {/* Policy Item */}
        <div className='flex flex-col items-center'>
          <img src={assets.quality_icon} className='w-12 mb-4' alt="Return Icon" />
          <p className='text-base font-semibold'>7 Days Return Policy</p>
          <p className='text-sm text-gray-500 mt-1'>Return items easily within 7 days of delivery.</p>
        </div>

        {/* Policy Item */}
        <div className='flex flex-col items-center'>
          <img src={assets.support_img} className='w-12 mb-4' alt="Support Icon" />
          <p className='text-base font-semibold'>24/7 Customer Support</p>
          <p className='text-sm text-gray-500 mt-1'>Our team is here to help you anytime, anywhere.</p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
