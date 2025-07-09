import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 md:px-10 bg-white text-gray-800">

      {/* Title */}
      <div className="text-3xl mb-8 text-center font-semibold">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {
          cartData.map((item, index) => {
            const productData = products.find(product => product._id === item._id);
            return (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-center gap-6">

                {/* Product Image & Info */}
                <div className="flex items-start gap-5 w-full sm:w-2/3">
                  <img className="w-20 h-20 rounded object-cover" src={productData.image[0]} alt={productData.name} />
                  <div className="flex flex-col gap-2">
                    <p className="text-lg font-medium">{productData.name}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{currency}{productData.price}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">Size: {item.size}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity & Delete */}
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== '' && val !== '0') {
                        updateQuantity(item._id, item.size, Number(val));
                      }
                    }}
                    className="w-16 sm:w-20 text-center border border-gray-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition"
                  />
                </div>
              </div>
            );
          })
        }
      </div>

      {/* Cart Total & Checkout Button */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px] bg-gray-50 p-6 rounded-xl shadow-md">
          <CartTotal />
          <div className="text-end mt-6">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black hover:bg-gray-900 text-white text-sm px-8 py-3 rounded transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
