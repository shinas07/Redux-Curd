import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/loginSlice';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error,user } = useSelector((state) => state.auth);
    console.log(user)
    const navigate = useNavigate('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           const g= await dispatch(loginUser({ username, password })).unwrap();
            dispatch(setUser(g?.access))
            alert('Login successful!');
            navigate('/')
        } catch (error) {
            if (error.message && typeof error.message === 'string') {
                alert("Login failed");
            } else {
                alert('An unexpected error occurred during login.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} Display error message */}
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    );
};

export default Login;
