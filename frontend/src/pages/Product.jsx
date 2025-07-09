import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId)
    if (selectedProduct) {
      setProductData(selectedProduct)
      setImage(selectedProduct.image[0])
    }
  }, [productId, products])

  const handleAddToCart = () => {
    if (!size) return alert('Please select a size first!')
    addToCart(productData._id, size)
  }

  if (!productData) return <div className="opacity-0 h-screen"></div>

  return (
    <div className="border-t pt-10 px-5 sm:px-10">
      {/* Product Info Section */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left - Product Images */}
        <div className="flex-1 flex gap-4 flex-col-reverse sm:flex-row">
          <div className="flex sm:flex-col gap-2 sm:w-[20%] overflow-x-auto sm:overflow-y-auto">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className="cursor-pointer w-20 h-20 object-cover border rounded"
              />
            ))}
          </div>
          <div className="sm:w-[80%] w-full">
            <img src={image} alt="" className="w-full rounded" />
          </div>
        </div>

        {/* Right - Product Description */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{productData.name}</h2>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} className="w-4" alt="" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" alt="" />
            <span className="ml-2 text-sm text-gray-500">(122)</span>
          </div>

          <p className="text-3xl font-bold mt-5">{currency}{productData.price}</p>
          <p className="text-gray-600 mt-5">{productData.description}</p>

          {/* Size Selection */}
          <div className="mt-8">
            <p className="mb-2 font-medium">Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded transition ${s === size ? 'border-orange-500 bg-orange-50' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-3 px-6 mt-6 text-sm rounded hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          {/* Assurance info */}
          <div className="text-sm text-gray-500 mt-8 space-y-1">
            <hr />
            <p>✅ 100% Original Products</p>
            <p>🚚 Cash on Delivery available</p>
            <p>🔁 Easy returns within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs Section (Description/Reviews) */}
      <div className="mt-16">
        <div className="flex border-b">
          <button className="border-t border-l border-r px-5 py-3 text-sm font-medium bg-gray-100">Description</button>
          <button className="px-5 py-3 text-sm text-gray-500">Reviews (122)</button>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-600 leading-relaxed">
          <p>
            An e-commerce website is an online platform that allows users to browse, buy, and manage purchases digitally. This virtual marketplace enables businesses to showcase their products and interact with customers across the globe.
          </p>
          <p className="mt-4">
            Products are typically listed with detailed descriptions, images, pricing, and variations like size or color. A dedicated product page allows users to explore all key information before placing an order.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  )
}

export default Product
