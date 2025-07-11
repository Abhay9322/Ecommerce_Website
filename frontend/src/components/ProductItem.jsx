import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext); // optional if you still use currency

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${id}`}
      className='group block text-gray-700 hover:text-black transition duration-300'
    >
      {/* Product Image */}
      <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
        <img
          src={image[0]}
          alt={name}
          className='w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out'
        />
      </div>

      {/* Product Info */}
      <div className='mt-3'>
        <p className='text-sm md:text-base font-medium truncate'>{name}</p>
        <p className='text-sm text-gray-600 mt-1'>
          Rs. {new Intl.NumberFormat('en-IN').format(price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
