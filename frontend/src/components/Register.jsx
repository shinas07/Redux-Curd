import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registrationMessage, setRegisterMessage] = useState('');
    const navigate = useNavigate('');

    const validateUsername = () => username.trim()!== "";
    const validateEmail = () =>  /\S+@\S+\.\S+/.test(email);
    const validatePassword = () => password.trim().length >= 8;
    const validateConfirmPassword = () => password === confirmPassword;





    const handleRegister = async (e) => {
        e.preventDefault();
        let isValid = true;
        if (!validateUsername()) {
            setRegisterMessage('Username is required');
            isValid = false;
        }

        if (!validateEmail()) {
            setRegisterMessage('Invalid email address');
            isValid = false;
        }

        if (!validatePassword()) {
            setRegisterMessage('Password must be at least 8 characters long');
            isValid = false;
        }

        if (!validateConfirmPassword()) {
            setRegisterMessage('Passwords do not match');
            isValid = false;
        }

        if (!isValid) {
            return;
   
        }


        try {
            const resultAction = await dispatch(registerUser({ username, email, password }));
        
            if (registerUser.fulfilled.match(resultAction)) {
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setRegisterMessage('User successfully registered!');
                setTimeout(() => {
                    setRegisterMessage('');
                    navigate('/login');
                }, 2000);
            } else {
                // Registration failed
                const payload = resultAction.payload || {};
            const errorMessage = payload.username
            ? payload.username[0]
            : payload.email
            ? payload.email[0]
            : 'Username is already exists';
        setRegisterMessage(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        

        // try {
        //     await dispatch(registerUser({ username, email, password }));
        //     setUsername('');
        //     setEmail('');
        //     setPassword('');
        //     setConfirmPassword('');
        //     setRegisterMessage('User successfully registered!')
        //     setTimeout(() =>{
        //         setRegisterMessage('');
        //         navigate('/login');
        //     },2000);

        // } catch (error) {
        //     if (error.response) {
        //         console.log(error.response.data);
        //         // Assuming the error is related to the username or email, choose the appropriate key
        //         const errorMessage = error.response.data.username? error.response.data.username[0] : error.response.data.email[0];
        //         setRegisterMessage(errorMessage); // Display the error message
        //     }
        //     console.error('Error:', error);
        // }
    };
    
    

    return (
        <div className="flex justify-center items-center h-screen mb-5">
        <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-center">Register</h2>
          {registrationMessage && <p className="text-green-500 text-center mb-4">{registrationMessage}</p>}
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
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
                <div>
                <span className="text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Login
                </Link>
                </span>
            </div>
          </div>
        </form>
      </div>
    );
};

export default Register;
