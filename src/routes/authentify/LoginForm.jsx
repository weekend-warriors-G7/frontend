// src/LoginForm.js
import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../../components/Spinner";
import axios from "axios";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rememberMe' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const dataToSend = {email: formData.email, password: formData.password};
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', dataToSend);

            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data.token;
                localStorage.setItem('accessToken', accessToken);
                if(formData.rememberMe)
                    localStorage.setItem('refreshToken', refreshToken)
                navigate('/'); // Nav to the main page
            }
        } catch (error) {
            if (error.response.status === 404) {
                console.error('Bad request, validation error:', error.response.data);
                setError(error.response.data.error || 'Incorrect input');
            } else if (error.response.status === 400) {
                console.error('User not found:', error.response.data);
                setError('Email or password not correct');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-bgColour">
            {loading ? (
                <div className="flex items-center justify-center">
                    <Spinner></Spinner>
                </div>
            ) : (
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-elemColour rounded-md focus:outline-none focus:ring-2 focus:ring-linkColour"
                        />
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-black">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="text-accentColour border-elemColour rounded focus:ring-accentColour"
                            />
                            <span className="ml-2">Remember Me</span>
                        </label>
                        <Link to="/" className="text-sm text-linkColour hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-qbold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
            </div>
            )}
        </div>
    );
};

export default LoginForm;
