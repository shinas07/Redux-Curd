import axios from 'axios';
import React, { useEffect, useState , useMemo} from 'react';
import Modal from 'react-modal';
import EditUserModal from './AdminUserModal';
import AddUserModal from './AddUserModal';



const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [query, setquery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItem, setFilteredItems] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/admin-userData/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
                setUsers(response.data);
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };
        fetchData(); 
    }, [filteredItem]); 


    //admin add user
    const handleAddUser = async (user) => {
        console.log(user)
        try {
            const userData = {
                username : user.username,
                email : user.email,
                password : user.password,
            }
            const response = await axios.post('http://127.0.0.1:8000/api/admin-addUser', userData,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (response.status === 201) {
            const newUser = response.data;
            setFilteredItems((prevUser) => [...users, newUser]);
        } else {
            console.error('Failed to add user:', response.statusText);
            setErrorMessage('Failed to add user');
            // alert('Failed to add user');
        }
    } catch (error) {
        console.error('Error adding user:', error.response? error.response.data : error.message);
    }
    };



    const filteredItems = useMemo(() => {
        return users.filter(user => {
            return user.username.toLowerCase().includes(query.toLowerCase()); 
        });
    }, [users, query]);
    


    const handleDeleteUser = async (id) => {
        try {
            const token = localStorage.getItem('access_token')
            await axios.delete(`http://127.0.0.1:8000/api/admin-user-delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
            });
            setDeleteMessage('User deleted successfully.');
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }



    
    


    if (loading) return <div className="text-center mt-4">Loading user data...</div>;
    if (error) return <div className="text-center mt-4 text-red-600">Error: {error}</div>;
    

    if (!Array.isArray(users)) {
        console.error('Users data is not an array:', users);
        return <div>Error: Invalid data format</div>;
    }

    return (
<div className="p-4">
    <h2 className="text-2xl font-bold text-gray-200 mb-4 text-center">User List</h2>
    {deleteMessage && <div className='text-green-700 font-bold mb-4'>{deleteMessage}</div>}
    <div className="flex justify-end mb-4">
        <button onClick={() =>  setIsModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add User
        </button>
    </div>
    <div className="overflow-x-auto p-4">
        <div className="flex items-center border border-gray-300 rounded-md p-4 shadow-lg bg-gray-800">
            <h6 className="text-lg font-semibold text-white mb-2 mr-4">Search</h6>
            <input
                value={query}
                onChange={e => setquery(e.target.value)}
                type="search"
                className="w-full px-4 py-2 text-gray-800 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
            />
        </div>
    </div>
    <br/>
    <br/>
    <table className="min-w-full divide-y divide-gray-200 shadow-md border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <EditUserModal username={user.username} email={user.email} />
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddUser={handleAddUser}
            />
</div>


    );
};

export default UserListPage;
