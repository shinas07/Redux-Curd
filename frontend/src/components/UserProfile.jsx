import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../features/axiosInstance'; 
const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const server = 'http://localhost:8000/'



    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get('/profile/');

                if (response.data) {
                    setUsername(response.data.username); 
                    setEmail(response.data.email);
                    setPreviewImage(response.data.profile_image);
                    console.log("profile iamge",response.data.profile_image)
                    console.log(previewImage)
                    // console.log(profileImage)
                } else {
                    console.log('No data received from response.');
                }

                setLoading(false);
            } catch (error) {
                console.log('Error fetching profile:', error);
                setError('Failed to load user profile. Please login first ');
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [successMessage]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleImageUpload = async () => {
        if (!profileImage) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_image', profileImage);

        try {
            const response = await axiosInstance.put('/profile_imgUpload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setTimeout(() => {
                setSuccessMessage(null)
            }, 3000);
            setSuccessMessage('Image added successfully'); 
            

            setPreviewImage(null)
            setProfileImage(null)
        } catch (error) {
            console.error('Error uploading profile image:', error.response?.data || error.message);
        }
    };


    if (loading) return <p className='text-center mt-4 text-gray-600'>Loading...</p>;
    if (error) return <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Profile Image
                    </label>
                    {previewImage ? (
                        <img src={`${server}/${previewImage}`} alt="Preview" className="mb-2 w-32 h-32 object-cover rounded-full" />
                    ) : (
                        <div className="border-4 border-dashed border-gray-300 rounded-full w-32 h-32 flex items-center justify-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.038 12C1.242 12 0 10.758 0 9A2 2 0 012 7v14a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2H2.038zM15 20v-2a1 1 0 01-1-1H2a1 1 0 01-1-1V7a1 1 0 011-1h13a1 1 0 011 1v2a1 1 0 001 1h-2v5z"></path>
                            </svg>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Profile Image
                    </label>
                    {/* {profileImage && <img src={profileImage} alt="Selected" className="mb-2 w-24 h-24 object-cover rounded-full" />} */}

                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        onClick={handleImageUpload}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Upload Image
                    </button>
                </div>
                            {successMessage && (
                <div className="alert alert-success mt-4" role="alert">
                    {successMessage}
                </div>
            )}
            </div>
            </div>
        </div>
    );
};

export default UserProfile;

