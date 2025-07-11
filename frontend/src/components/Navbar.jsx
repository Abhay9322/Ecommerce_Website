import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <header className="flex items-center justify-between py-5 px-4 sm:px-6 lg:px-12 shadow-sm relative z-50 bg-white">

            {/* Logo or App Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                🛍️ ForEveryYou
            </h1>

            {/* Desktop Menu */}
            <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
                {['/', '/collection', '/about', '/contact'].map((path, idx) => {
                    const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
                    return (
                        <NavLink
                            key={idx}
                            to={path}
                            className={({ isActive }) =>
                                `relative pb-1 hover:text-black ${isActive ? 'text-black font-semibold' : ''}`
                            }
                        >
                            {labels[idx]}
                            <span
                                className={`absolute left-0 bottom-0 w-full h-[2px] bg-black rounded transition-opacity ${path === window.location.pathname ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                            ></span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-5">
                {/* Search Icon */}
                <img
                    onClick={() => {
                        setShowSearch(true);
                        navigate('/collection');
                    }}
                    src={assets.search_icon}
                    className="w-5 cursor-pointer"
                    alt="Search"
                />

                {/* Profile Dropdown */}
                <div className="relative group">
                    <img
                        onClick={() => !token && navigate('/login')}
                        className="w-5 cursor-pointer"
                        src={assets.profile_icon}
                        alt="Profile"
                    />
                    {token && (
                        <div className="absolute right-0 mt-3 w-36 bg-white border rounded shadow-md
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-200">
                            <div className="flex flex-col py-2 px-4 text-sm text-gray-600">
                                <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
                                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <Link to="/cart" className="relative">
                    <img src={assets.cart_icon} className="w-5" alt="Cart" />
                    {getCartCount() > 0 && (
                        <span className="absolute -right-1 -bottom-1 bg-black text-white text-[10px] leading-4 w-4 h-4 flex items-center justify-center rounded-full">
                            {getCartCount()}
                        </span>
                    )}
                </Link>

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className="w-5 cursor-pointer sm:hidden"
                    alt="Menu"
                />
            </div>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 ease-in-out ${visible ? 'w-3/4 max-w-xs px-6 py-6' : 'w-0 overflow-hidden'}`}
            >
                <div className="flex flex-col text-gray-700">
                    <button
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-3 mb-6 text-gray-600 hover:text-black"
                    >
                        <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
                        <span>Back</span>
                    </button>

                    <NavLink to="/" onClick={() => setVisible(false)} className="py-2 border-b">HOME</NavLink>
                    <NavLink to="/collection" onClick={() => setVisible(false)} className="py-2 border-b">COLLECTION</NavLink>
                    <NavLink to="/about" onClick={() => setVisible(false)} className="py-2 border-b">ABOUT</NavLink>
                    <NavLink to="/contact" onClick={() => setVisible(false)} className="py-2 border-b">CONTACT</NavLink>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

