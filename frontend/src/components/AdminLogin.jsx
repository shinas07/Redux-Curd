import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [isAdmin, setIsAdmin]  = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (isAdmin) {
            console.log('next page rendering place')
            navigate('/admin-dashboard');
        } else {
            setError('You are not authorized to access the admin page.');
        }
    }, [isAdmin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin-login/', {username, password});
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token',refresh);
            setIsAdmin(response.data.isAdmin);
            
        } catch (error) {
            console.log('Error during login:', error.response? error.response.data : error.message);
            setError('Login failed. Please check your username and password.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r">
    <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-80 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Admin Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-inner p-4 bg-gray-50 bg-opacity-60">
                <div className="mb-4">
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className="relative block w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="relative block w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium ${isLoading? 'opacity-50 cursor-not-allowed' : 'text-white bg-indigo-600 border border-transparent rounded-lg shadow-lg group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    disabled={isLoading}
                >
                    {isLoading? 'Logging In...' : 'Login'}
                </button>
            </div>
        </form>
    </div>
</div>

    );
};

export default AdminLogin;
