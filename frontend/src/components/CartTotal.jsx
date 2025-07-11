import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full p-6 border rounded-lg shadow-sm bg-white">
      {/* Section Title */}
      <div className="mb-4 text-xl font-semibold text-gray-800">
        <Title text1="CART" text2="TOTALS" />
      </div>

      {/* Pricing Info */}
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toLocaleString('en-IN')}.00</span>
        </div>

        <div className="border-t" />

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>Rs. {delivery_fee.toLocaleString('en-IN')}.00</span>
        </div>

        <div className="border-t" />

        <div className="flex justify-between text-base font-medium pt-1">
          <span>Total</span>
          <span>Rs. {total.toLocaleString('en-IN')}.00</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
