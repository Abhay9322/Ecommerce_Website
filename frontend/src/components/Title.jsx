import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex items-center gap-3 mb-4'>
      <h2 className='text-gray-500 text-sm sm:text-base font-medium tracking-wide'>
        {text1}{' '}
        <span className='text-gray-800 font-semibold'>
          {text2}
        </span>
      </h2>
      <div className='h-[1.5px] sm:h-[2px] w-8 sm:w-12 bg-gray-800 rounded'></div>
    </div>
  )
}

export default Title
