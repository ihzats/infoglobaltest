import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { role_id } = response.data.user;

      // Menangani navigasi sesuai peran pengguna
      if (role_id === 1) {
        navigate('/homesuperadmin');
      } else if (role_id === 2) {
        navigate('/homeadmin');
      } else {
        // Jika role tidak dikenali, tambahkan penanganan sesuai kebutuhan
        console.error('Role tidak dikenali');
      }

    } catch (error) {
      
      // Handle errors, misalnya menampilkan pesan kesalahan pada pengguna
      console.error('Login failed. Please try again.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500">
      <div className="bg-white p-8 shadow-md rounded-xl w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleSubmit}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleSubmit}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Belum punya akun? <a href="/register" className="text-blue-500">Daftar di sini</a>
          </p>
        </form>
      </div>
    </div>
  )
}
