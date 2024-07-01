import React from 'react'

import { useNavigate  } from 'react-router-dom'
import Navbar from './navbar.jsx';


const Home = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () =>{
        navigate('/profile')
    };

    return(
        <>
        <Navbar/>
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-indigo-950">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">Welcome to the Home page</h1>
          <button onClick={handleRegisterClick} className="bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
    Go to profile
  </button>
        </div>
      </div>
      </>
    );
};

export default Home;