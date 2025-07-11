import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const { backendUrl, token } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }

    } catch (error) {
      console.error('Order fetch failed:', error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-14 px-4 md:px-16 bg-gray-50 min-h-screen">
      {/* Title */}
      <div className="text-3xl font-semibold mb-6 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gray-200"
            >
              {/* Left Part */}
              <div className="flex gap-4 text-sm text-gray-700">
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={item.image[0]}
                  alt={item.name}
                />
                <div>
                  <p className="text-base font-semibold text-gray-800">{item.name}</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Price: <span className="font-medium">Rs. {item.price.toLocaleString('en-IN')}</span></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span></p>
                    <p>Payment: <span className="text-gray-500">{item.paymentMethod}</span></p>
                  </div>
                </div>
              </div>

              {/* Right Part */}
              <div className="flex md:flex-col md:items-end justify-between w-full md:w-auto text-sm gap-2 md:gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${item.status === 'Delivered'
                      ? 'bg-green-500'
                      : item.status === 'Pending'
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                      }`}
                  ></span>
                  <span className="text-gray-800">{item.status}</span>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-gray-800 px-4 py-2 rounded hover:bg-black hover:text-white transition duration-300"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
