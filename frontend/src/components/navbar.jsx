import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutUser, logoutUser} from '../features/auth/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const {user:isLoggedIn} = useSelector(state => state.auth);
    
   

    const handleLogout = async () => {
        await dispatch(logoutUser());
        dispatch(LogoutUser())
        navigate('/login')
    }
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex justify-center gap-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
      {!isLoggedIn? (
            <>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="text-white hover:text-gray-300">User Profile</Link>
              </li>
              <li>
                <button onClick={() => handleLogout()} className="text-white hover:text-gray-300">Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
