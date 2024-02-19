import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function RegisterPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            setSuccessMessage('User createsd successfully!, Please Login');
            setErrorMessage(null);

            // Redirect to the login page after successful registration
            navigate('/login');

        } catch (error) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);

            setSuccessMessage(null);
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500">
            <div className="bg-white p-8 shadow-md rounded-xl w-96">
                <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>
                {successMessage && <div>{successMessage}</div>}
                {errorMessage && <div>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Fullname
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded-md"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-sm text-gray-600">
                        Sudah punya akun? <a href="/login" className="text-blue-500">Login di sini</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
