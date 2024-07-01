import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';

const AdminDashboard = () => {


    const navigate = useNavigate();
    const dispatch  = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin')
    }

    return (
        <div className="flex h-screen ">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md ">
                <div className="p-6 bg-neutral-900">
                <h1 className="text-2xl  text-white">Admin Dashboard</h1>
                </div>
                <ul className="space-y-2">
                    <li>
                        <Link to="" className="flex items-center p-3 text-gray-700 hover:bg-gray-300">
                            <span className="ml-2">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/user" className="flex items-center p-3 text-gray-700 hover:bg-gray-200">
                            <span className="text-lg"><FaUsers /></span>
                            <span className="ml-2">Users</span>
                        </Link>
                    </li>
                    <li>
                <button onClick={() => handleLogout()} className=" hover:text-gray-300">Logout</button>
              </li>
                    {/* Add more sidebar links as needed */}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-10 overflow-hidden">
                <div className="flex justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white ">Welcome Back, Admin!</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-900">6</p>
                    </div>
                    {/* Add more dashboard cards as needed */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
