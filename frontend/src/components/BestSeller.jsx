import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-20">
      {/* Section Title */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Discover our top-rated products that our customers love the most.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-8">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="opacity-0 animate-fade-in transition-opacity duration-500 delay-[index * 100] fill-mode-forwards"
          >
            <ProductItem
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
