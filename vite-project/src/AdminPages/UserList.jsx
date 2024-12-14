import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        status: 'not available',
        confirmPassword: '',
        roles: 'admin'
    });

    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        status: '',
        password: '',
        confirmPassword: '',
        roles: ''
    });

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
        setSuccessMessage(null);
        setError(null);
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
            setSuccessMessage('User added successfully!');
            closeModal();
        } catch (error) {
            setError('Failed to add user.');
            // console.log(error.response ? error.response.data : error);
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
            setSuccessMessage('User updated successfully!');
            closeModal();
        } catch (error) {
            setError('Failed to update user.');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) {
            return;
        }

        try {
            await axiosClient.delete(`/admins/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            setSuccessMessage('User deleted successfully!');
        } catch (error) {
            setError('Failed to delete user.');
            // console.log(error.response ? error.response.data : error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <section id="userlist" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-6">Admin List</h1>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={openAddModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Tambah Admin
                        </button>
                    </div>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-3">{successMessage}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-gray-50 rounded-xl shadow">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Nama</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Email</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Peran</th>
                                        <th className="py-3 px-6 text-sm font-bold text-black bg-gray-200 text-center">Status</th>
                                        <th className="py-3 px-6 text-sm font-bold text-black bg-gray-200 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-3 px-6 text-gray-600">{user.name}</td>
                                            <td className="py-3 px-6 text-gray-600">{user.email}</td>
                                            <td className="py-3 px-6 text-gray-600 first-letter:uppercase">{user.roles}</td>
                                            <td
                                                className={`py-3 px-6 ${user.status === 'active'
                                                    ? 'text-green-600 font-bold text-center'
                                                    : 'text-red-600 font-bold text-center'
                                                    }`}
                                            >
                                                {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                            </td>
                                            <td className="py-3 px-6 text-gray-600 text-center">
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
                            <h2 className="text-lg font-bold mb-4">Tambah Admin</h2>
                            <form onSubmit={handleCreateUser}>
                                <div className="mb-4">
                                    <label className="font-semibold">Nama<span className='text-red-600'>*</span></label>
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
                                    <label className="font-semibold">Email<span className='text-red-600'>*</span></label>
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
                                    <label className="font-semibold">Password<span className='text-red-600'>*</span></label>
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
                                    <label className="font-semibold">Konfirmasi Ulang Password<span className='text-red-600'>*</span></label>
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
                                    <label className="font-semibold">Status<span className='text-red-600'>*</span></label>
                                    <select
                                        value={newUser.status || 'available'}
                                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="nonactive">Tidak Aktif</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold">Peran<span className='text-red-600'>*</span></label>
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
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Simpan
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
                                    <label className="font-semibold">Nama</label>
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
                                    <label className="font-semibold">Email</label>
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
                                    <label className="font-semibold">Password</label>
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
                                    <label className="font-semibold">Konfirmasi Ulang Password</label>
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
                                    <label className="font-semibold">Status</label>
                                    <select
                                        value={updatedUser.status || 'available'}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, status: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="nonactive">Tidak Aktif</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold">Peran</label>
                                    <select
                                        value={updatedUser.roles || 'admin'}
                                        onChange={(e) => setUpdatedUser({ ...updatedUser, roles: e.target.value })}
                                        className="w-full p-2 border rounded"
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
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Simpan
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
