import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import ItemModal from './ItemModal';
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

    const handleUpdateItem = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    const navigateToAddItem = () => {
        navigate('/additems');
    };

    return (
        <section id="itemslist">
            <div className="container pt-12 bg-primaryColorLight max-w-screen mx-auto rounded-3xl shadow-md mb-6 mt-10 p-5">
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
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Name
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Description
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Stock
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Price
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Category
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Photo
                                    </th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-3 px-6 text-black">{item.name}</td>
                                        <td className="py-3 px-6 text-black">{item.description}</td>
                                        <td className="py-3 px-6 text-black">{item.stock}</td>
                                        <td className="py-3 px-6 text-black">{item.price}</td>
                                        <td className="py-3 px-6 text-black">{item.category}</td>
                                        <td className="py-3 px-6 text-black">
                                            {item.photo && (
                                                <img
                                                    src={`data:image/jpeg;base64,${item.photo}`}
                                                    alt={item.name}
                                                    className="h-16 w-16 object-cover rounded-md"
                                                />
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
                {isModalOpen && selectedItem && (
                    <ItemModal item={selectedItem} onClose={closeModal} onUpdateItem={handleUpdateItem} />
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
