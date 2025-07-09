import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(location.pathname.includes('collection'))
  }, [location])

  return showSearch && visible ? (
    <div className='border-y bg-gray-50 py-5 px-4 sm:px-0'>
      <div className='flex items-center justify-center gap-2 relative mx-auto max-w-xl'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Search for products...'
          className='w-full py-2 px-4 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white'
        />
        <img
          src={assets.search_icon}
          alt='Search'
          className='absolute right-3 w-4 cursor-pointer opacity-70'
        />
      </div>
      <div className='text-right mt-2 pr-4'>
        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt='Close'
          className='w-3 inline-block cursor-pointer opacity-60 hover:opacity-100 transition duration-200'
        />
      </div>
    </div>
  ) : null
}

export default SearchBar
