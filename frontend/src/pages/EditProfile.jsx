// frontend/src/pages/EditProfile.jsx

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { backendUrl, token, navigate } = useContext(ShopContext);
    const [formData, setFormData] = useState({ name: '', email: '' });

    useEffect(() => {
        axios.get(`${backendUrl}/api/user/profile`, { headers: { token } })
            .then(res => {
                if (res.data.success) {
                    setFormData(res.data.user);
                }
            });
    }, [token]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${backendUrl}/api/user/profile`, formData, {
                headers: { token },
            });
            if (res.data.success) {
                toast.success('Profile updated');
                navigate('/profile');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Failed to update');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10 space-y-4">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
            />
            <button className="bg-black text-white py-2 px-4 rounded">Update</button>
        </form>
    );
};

export default EditProfile;
