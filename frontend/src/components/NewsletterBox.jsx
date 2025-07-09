import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault()
    // You can add toast or success message here later
  }

  return (
    <div className='text-center px-4 py-10 bg-gray-50 rounded-xl'>
      {/* Heading */}
      <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>Subscribe now & get 20% off</p>

      {/* Subtext */}
      <p className='text-gray-500 mt-3 max-w-xl mx-auto text-sm'>
        Stay updated with our latest arrivals, special offers, and news from Forever.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 max-w-xl mx-auto'
      >
        <input
          type='email'
          placeholder='Enter your email'
          required
          className='w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black transition duration-200'
        />
        <button
          type='submit'
          className='bg-black text-white text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition duration-300'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
