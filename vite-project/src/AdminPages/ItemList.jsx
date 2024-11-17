import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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
        fetchItems();
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await axiosClient.put(`/products/${updatedItem.id}`, updatedItem);
            console.log(response.data); // Log respons untuk memeriksa apakah gambar terupdate dengan benar
            const updatedItems = items.map((item) =>
                item.id === updatedItem.id ? response.data : item
            );
            setItems(updatedItems);
            closeModal();
        } catch (error) {
            setError('Failed to update item.');
            console.error(error);
        }
    };

    const navigateToAddItem = () => {
        navigate('/additems');
    };

    // Array untuk menyimpan status gambar
    const imageErrorState = {};

    return (
        <section id="itemslist" className="pt-0">
            <div className="container bg-itemlistColor max-w-screen mx-auto rounded-3xl shadow-md mb-6 mt-10 p-5">
                <h1 className="text-2xl font-bold mb-5">Item List</h1>
                {error && <div className="text-red-500 mb-3">{error}</div>}
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full bg-white rounded-xl shadow-md">
                            <thead>
                                <tr>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Name</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Description</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Price</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Photo</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id ? item.id : index} className="border-b">
                                        <td className="py-3 px-6 text-black">{item.name}</td>
                                        <td className="py-3 px-6 text-black">{item.description}</td>
                                        <td className="py-3 px-6 text-black">{item.price}</td>
                                        <td className="py-3 px-6 text-black">
                                            {item.image_urls && item.image_urls.length > 0 ? (
                                                item.image_urls.map((imgPath, index) => {
                                                    if (!imageErrorState[item.id]) {
                                                        imageErrorState[item.id] = [];
                                                    }

                                                    const handleError = () => {
                                                        imageErrorState[item.id][index] = true;
                                                    };

                                                    return (
                                                        <img
                                                            key={index}
                                                            src={imageErrorState[item.id][index] ? 'path/to/default_image.jpg' : imgPath}
                                                            alt={`${item.name} ${index + 1}`}
                                                            className="h-16 w-16 object-cover rounded-md"
                                                            onError={handleError}
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <span>No images available</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-black">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => openModal(item)}
                                            >
                                                View/Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal Inline */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-lg w-1/3">
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
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
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
        </section>
    );
};

export default ItemList;
