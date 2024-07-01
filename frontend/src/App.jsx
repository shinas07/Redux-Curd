import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/home';
import UserProfile from './components/UserProfile'
import AdminLogin from './components/AdminLogin';
import { useSelector } from 'react-redux';
import AdminDashboard from './components/AdminDashboard';
import UserListPage from './components/AdminUserListPage';





function App() {
  const {user} = useSelector(state=>state.auth);
  console.log(user)

    return (
        <Router>
            <div className="items-center h-screen bg-gradient-to-br from-gray-950 to-indigo-950">
                <Routes>
                    <Route  path='admin'  element={<AdminLogin/>}></Route>
                    <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
                    <Route path='/admin/user' element={<UserListPage/>}></Route>

                    <Route path='/' element={<Home/>}></Route>
                    <Route path="/signup" element={!user?<Register />:<Navigate replace={true} to={'/'}/>} />
                    <Route path="/login" element={!user?<Login />:<Navigate replace={true} to={'/'}/>} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
  