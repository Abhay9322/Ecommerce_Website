import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <section className="my-16 px-4 sm:px-8 lg:px-16">

      {/* Title & Description */}
      <div className="text-center mb-10">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-full max-w-2xl mx-auto mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Discover the latest additions to our collection. Handpicked styles crafted with quality and care.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
        {latestProducts.map((item, index) => (
          <div key={index} className="hover:scale-[1.03] transition-transform duration-300">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default LatestCollection
