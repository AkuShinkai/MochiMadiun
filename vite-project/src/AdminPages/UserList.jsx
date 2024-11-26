import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const fetchUsers = async () => {
        try {
            const response = await axiosClient.get('/admins');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/admins', formData);
            fetchUsers(); // Refresh list
            setFormData({ name: '', email: '', password: '' }); // Clear form
            setShowModal(false); // Close modal
        } catch (error) {
            console.error('Error creating user', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axiosClient.delete(`/admins/${id}`);
            fetchUsers(); // Refresh list
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Admin Users</h1>
            <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary mb-4"
            >
                Add Admin
            </button>

            {/* Modal for adding admin */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">Add Admin</h2>
                        <form onSubmit={handleCreateUser}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table for user list */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {user.status === 'active' ? (
                                        <span className="text-green-600 font-bold">Active</span>
                                    ) : (
                                        <span className="text-red-600 font-bold">Nonactive</span>
                                    )}
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
