import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                toast.success('Login successful')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'Something went wrong')
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
            <div className='bg-white shadow-lg rounded-xl px-8 py-8 w-full max-w-md'>
                <h1 className='text-3xl font-bold mb-6 text-gray-800 text-center'>Admin Login</h1>
                <form onSubmit={onSubmitHandler} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                            Email Address
                        </label>
                        <input
                            id='email'
                            type='email'
                            placeholder='admin@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-200'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
