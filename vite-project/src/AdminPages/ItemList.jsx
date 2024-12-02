import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const navigate = useNavigate();

    const fetchItems = async () => {
        try {
            const response = await axiosClient.get('/products');
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch items.');
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await axiosClient.delete(`/products/${id}`);
            alert(response.data.message); // Tampilkan pesan sukses
            fetchItems(); // Panggil ulang fungsi untuk memuat daftar produk
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete product');
        }
    };


    useEffect(() => {
        fetchItems();
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setSelectedFiles([]);
        setPreviewImages([]);
        setIsModalOpen(false);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);

        const previews = Array.from(files).map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const formData = new FormData();
            formData.append('name', updatedItem.name);
            formData.append('description', updatedItem.description);
            formData.append('price', updatedItem.price);
            formData.append('status', updatedItem.status); // Tambahkan status

            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => {
                    formData.append('images[]', file);
                });
            }

            await axiosClient.post(`/products/${updatedItem.id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchItems();
            closeModal();
        } catch (error) {
            setError('Failed to update item.');
            console.error(error);
        }
    };

    const navigateToAddItem = () => {
        navigate('/additems');
    };

    return (
        <section id="itemslist" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-6">Item List</h1>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl">
                            <table className="min-w-full bg-gray-50 rounded-xl shadow-md">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 bg-gray-200 text-left text-sm text-black font-bold">Name</th>
                                        <th className="py-3 px-6 bg-gray-200 text-left text-sm text-black font-bold">Description</th>
                                        <th className="py-3 px-6 bg-gray-200 text-left text-sm text-black font-bold">Price</th>
                                        <th className="py-3 px-6 bg-gray-200 text-center text-sm text-black font-bold">Status</th>
                                        <th className="py-3 px-6 bg-gray-200 text-left text-sm text-black font-bold">Photo</th>
                                        <th className="py-3 px-6 bg-gray-200 text-left text-sm text-black font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={item.id ? item.id : index} className="border-b">
                                            <td className="py-3 px-6 text-black">{item.name}</td>
                                            <td className="py-3 px-6 text-black">{item.description}</td>
                                            <td className="py-3 px-6 text-black">Rp.{item.price.toLocaleString()}</td>
                                            <td
                                                className={`py-3 px-6 ${item.status === 'available'
                                                        ? 'text-green-600 font-bold text-center'
                                                        : 'text-red-600 font-bold text-pretty text-center'
                                                    }`}
                                            >
                                                {item.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                                            </td>
                                            <td className="py-3 px-6 text-black">
                                                {item.image_urls?.map((imgPath, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={imgPath}
                                                        alt={`${item.name} ${idx + 1}`}
                                                        className="h-16 w-16 object-cover rounded-md"
                                                    />
                                                )) || <span>No images available</span>}
                                            </td>
                                            <td className="py-16 px-6 text-black flex items-center space-x-4">
                                                <button onClick={() => openModal(item)} title="Edit">
                                                    <FontAwesomeIcon icon={faEdit} className="text-blue-500 text-lg cursor-pointer hover:text-blue-700" />
                                                </button>
                                                <button onClick={() => deleteProduct(item.id)} title="Delete">
                                                    <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 text-lg cursor-pointer hover:text-red-700" />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {isModalOpen && selectedItem && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-5 rounded-lg w-11/12 md:w-1/3 max-h-screen overflow-y-auto">
                                <h2 className="text-xl font-bold mb-3">Edit Item</h2>
                                <div className="mb-3">
                                    <label className="font-semibold">Name</label>
                                    <input
                                        type="text"
                                        value={selectedItem.name}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold">Description</label>
                                    <textarea
                                        value={selectedItem.description}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold">Price</label>
                                    <input
                                        type="number"
                                        value={selectedItem.price}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold">Status</label>
                                    <select
                                        value={selectedItem.status || 'available'}
                                        onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="available">Available</option>
                                        <option value="not available">Not Available</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold">Current Images</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedItem.image_urls?.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`Current ${idx + 1}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="font-semibold">Upload New Images</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {previewImages.map((src, idx) => (
                                            <img
                                                key={idx}
                                                src={src}
                                                alt={`Preview ${idx + 1}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex space-x-4 mt-3">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleUpdateItem(selectedItem)}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-5">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={navigateToAddItem}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemList;
