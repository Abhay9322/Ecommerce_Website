import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between px-6 sm:px-10 py-3 bg-white shadow-sm border-b'>

      {/* Logo */}
      <img
        src={assets.logo}
        alt="Logo"
        className='w-28 sm:w-36 object-contain'
      />

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className='bg-gray-700 text-white px-5 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-black transition-all duration-200'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar
