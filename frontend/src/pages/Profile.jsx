// frontend/src/pages/Profile.jsx

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Profile = () => {
    const { token, backendUrl } = useContext(ShopContext);
    const [user, setUser] = useState({ name: "", email: "" });
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({ name: "", email: "" });
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: { token },
            });
            if (res.data.success) {
                setUser(res.data.user);
                setNewData(res.data.user);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to load profile");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await axios.put(`${backendUrl}/api/user/profile`, newData, {
                headers: { token },
            });
            if (res.data.success) {
                toast.success("Profile updated");
                setUser(res.data.user);
                setEditing(false);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Error updating profile");
        }
    };

    const handleChangePassword = async () => {
        try {
            const res = await axios.put(`${backendUrl}/api/user/changepassword`, passwords, {
                headers: { token },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setPasswords({ oldPassword: "", newPassword: "" });
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Error changing password");
        }
    };

    useEffect(() => {
        if (token) fetchProfile();
    }, [token]);

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {!editing ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={newData.name}
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                        placeholder="Name"
                        className="w-full px-3 py-2 border rounded"
                    />
                    <input
                        type="email"
                        value={newData.email}
                        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdateProfile}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                <input
                    type="password"
                    placeholder="Old Password"
                    value={passwords.oldPassword}
                    onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                    className="w-full px-3 py-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border rounded mb-2"
                />
                <button
                    onClick={handleChangePassword}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default Profile;
