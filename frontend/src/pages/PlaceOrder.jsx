import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products,
    } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setFormData((data) => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        response,
                        { headers: { token } }
                    )
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    toast.error(error)
                }
            },
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(
                            products.find((product) => product._id === items)
                        )
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(
                        backendUrl + '/api/order/place',
                        orderData,
                        { headers: { token } }
                    )
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break

                case 'stripe':
                    const responseStripe = await axios.post(
                        backendUrl + '/api/order/stripe',
                        orderData,
                        { headers: { token } }
                    )
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break

                case 'razorpay':
                    const responseRazorpay = await axios.post(
                        backendUrl + '/api/order/razorpay',
                        orderData,
                        { headers: { token } }
                    )
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }
                    break

                default:
                    break
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col lg:flex-row gap-10 border-t pt-10 px-6 sm:px-12"
        >
            {/* ---------------- LEFT FORM ---------------- */}
            <div className="w-full lg:w-1/2">
                <Title text1="DELIVERY" text2="INFORMATION" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <input
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="First name"
                        className="input-box"
                    />
                    <input
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Last name"
                        className="input-box"
                    />
                </div>
                <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    type="email"
                    placeholder="Email address"
                    className="input-box mt-4"
                />
                <input
                    required
                    name="street"
                    value={formData.street}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Street address"
                    className="input-box mt-4"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="City"
                        className="input-box"
                    />
                    <input
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="State"
                        className="input-box"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <input
                        required
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                        type="number"
                        placeholder="Zipcode"
                        className="input-box"
                    />
                    <input
                        required
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Country"
                        className="input-box"
                    />
                </div>
                <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeHandler}
                    type="number"
                    placeholder="Phone number"
                    className="input-box mt-4"
                />
            </div>

            {/* ---------------- RIGHT SIDE ---------------- */}
            <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
                <CartTotal />
                <div className="mt-10">
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div className="flex flex-col sm:flex-row gap-4 mt-5">
                        <div
                            onClick={() => setMethod('stripe')}
                            className={`payment-option ${method === 'stripe' ? 'active' : ''}`}
                        >
                            <span className="radio-dot" />
                            <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        <div
                            onClick={() => setMethod('razorpay')}
                            className={`payment-option ${method === 'razorpay' ? 'active' : ''}`}
                        >
                            <span className="radio-dot" />
                            <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div
                            onClick={() => setMethod('cod')}
                            className={`payment-option ${method === 'cod' ? 'active' : ''}`}
                        >
                            <span className="radio-dot" />
                            <span className="text-gray-600 text-sm">Cash on Delivery</span>
                        </div>
                    </div>

                    <div className="text-end mt-8">
                        <button
                            type="submit"
                            className="bg-black text-white px-10 py-3 text-sm rounded hover:bg-gray-800 transition"
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
