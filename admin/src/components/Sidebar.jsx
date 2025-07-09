import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r bg-white shadow-sm'>
            <div className='flex flex-col gap-4 pt-10 pl-6 text-sm'>

                {/* Add Items */}
                <NavLink
                    to="/add"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-l-full border-l-4 transition-all duration-200 ${isActive
                            ? 'bg-gray-100 border-black text-black font-semibold'
                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`
                    }
                >
                    <img className='w-5 h-5' src={assets.add_icon} alt="Add" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                {/* List Items */}
                <NavLink
                    to="/list"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-l-full border-l-4 transition-all duration-200 ${isActive
                            ? 'bg-gray-100 border-black text-black font-semibold'
                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`
                    }
                >
                    <img className='w-5 h-5' src={assets.order_icon} alt="List" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                {/* Orders */}
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-l-full border-l-4 transition-all duration-200 ${isActive
                            ? 'bg-gray-100 border-black text-black font-semibold'
                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
                        }`
                    }
                >
                    <img className='w-5 h-5' src={assets.order_icon} alt="Orders" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
