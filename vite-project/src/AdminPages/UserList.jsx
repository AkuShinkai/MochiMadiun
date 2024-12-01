import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '', roles: 'admin' });
    const [updatedUser, setUpdatedUser] = useState({ name: '', email: '', password: '', confirmPassword: '', roles: '' });

    const fetchUsers = async () => {
        try {
            const response = await axiosClient.get('/admins');
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setUpdatedUser({ ...user, password: '', confirmPassword: '' });
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setNewUser({ name: '', email: '', password: '', confirmPassword: '', roles: 'admin' });
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();

        // Validasi password dan confirmPassword
        if (newUser.password !== newUser.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            if (!newUser.name || !newUser.email || !newUser.password || !newUser.roles) {
                setError("All fields are required.");
                return;
            }
            await axiosClient.post('/admins', newUser);
            fetchUsers();
            closeModal();
        } catch (error) {
            setError('Failed to add user.');
            console.log(error.response ? error.response.data : error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        // Validasi password dan confirmPassword untuk edit
        if (updatedUser.password !== updatedUser.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            if (!updatedUser.name || !updatedUser.email || !updatedUser.roles) {
                setError("All fields are required.");
                return;
            }
            await axiosClient.put(`/admins/${selectedUser.id}`, updatedUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === selectedUser.id ? updatedUser : user))
            );
            closeModal();
        } catch (error) {
            setError('Failed to update user.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section id="userlist" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-5">Admin List</h1>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={openAddModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Admin
                        </button>
                    </div>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-50 rounded-xl shadow">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-gray-700">Name</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-gray-700">Email</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-gray-700">Role</th>
                                        <th className="py-3 px-6 text-sm font-bold text-gray-700 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-3 px-6 text-gray-800">{user.name}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.email}</td>
                                            <td className="py-3 px-6 text-gray-800">{user.roles}</td>
                                            <td className="py-3 px-6 text-gray-800 text-center">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700 mr-3"
                                                    onClick={() => openEditModal(user)}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Add Admin Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center px-5 bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
                            <h2 className="text-lg font-bold mb-4">Add Admin</h2>
                            <form onSubmit={handleCreateUser}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        placeholder="Name"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        placeholder="Email"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        placeholder="Password"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={newUser.confirmPassword}
                                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                                        placeholder="Confirm Password"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <select
                                        name="roles"
                                        value={newUser.roles}
                                        onChange={(e) => setNewUser({ ...newUser, roles: e.target.value })}
                                        className="border w-full px-3 py-2 rounded"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Admin Modal */}
                {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 flex items-center justify-center px-5 bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
                            <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
                            <form onSubmit={handleUpdateUser}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                                        placeholder="Name"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                                        placeholder="Email"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        name="password"
                                        value={updatedUser.password}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, password: e.target.value })}
                                        placeholder="New Password"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={updatedUser.confirmPassword}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, confirmPassword: e.target.value })}
                                        placeholder="Confirm New Password"
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <select
                                        name="roles"
                                        value={updatedUser.roles}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, roles: e.target.value })}
                                        className="border w-full px-3 py-2 rounded"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserList;
