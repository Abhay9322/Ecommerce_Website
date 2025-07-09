import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">📦 All Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 border border-gray-200 rounded-md p-4 md:p-6 shadow-sm bg-white"
            >
              {/* Parcel Icon */}
              <div className="flex justify-center">
                <img className="w-10 md:w-12" src={assets.parcel_icon} alt="parcel" />
              </div>

              {/* Order Items and Address */}
              <div className="text-sm text-gray-700">
                <div className="mb-2">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="mb-0.5">
                      {item.name} x {item.quantity} <span>({item.size})</span>
                      {idx !== order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <div className="mt-3">
                  <p className="font-semibold">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street}</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                  </p>
                  <p className="text-gray-500">{order.address.phone}</p>
                </div>
              </div>

              {/* Order Meta */}
              <div className="text-sm text-gray-700">
                <p>🧾 Items: {order.items.length}</p>
                <p className="mt-2">💳 Method: {order.paymentMethod}</p>
                <p>💰 Payment: {order.payment ? 'Done ✅' : 'Pending ❌'}</p>
                <p>📅 Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Price */}
              <div className="text-sm font-semibold text-gray-800 flex items-center">
                ₹ {order.amount.toLocaleString('en-IN')}
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className="w-full p-2 text-sm border border-gray-300 rounded outline-none bg-gray-50"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
