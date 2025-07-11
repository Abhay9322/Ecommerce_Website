// frontend/src/pages/ChangePassword.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    const { backendUrl, token, navigate } = useContext(ShopContext);
    const [form, setForm] = useState({ oldPassword: '', newPassword: '' });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${backendUrl}/api/user/changepassword`, form, {
                headers: { token },
            });
            if (res.data.success) {
                toast.success('Password changed successfully');
                navigate('/profile');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Failed to change password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto py-10 space-y-4">
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <input
                type="password"
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Old Password"
            />
            <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="New Password"
            />
            <button className="bg-black text-white py-2 px-4 rounded">Change</button>
        </form>
    );
};

export default ChangePassword;
