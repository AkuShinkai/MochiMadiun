import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const ItemModal = ({ item, onClose, onUpdateItem }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        description: item?.description || '',
        price: item?.price || '',
        photo: null
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                description: item.description,
                price: item.price,
                photo: null // reset file photo jika perlu
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axiosClient.put(`/products/${item.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Product updated successfully!');
            onUpdateItem(response.data.product);
            onClose();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.errors || 'Failed to update product.');
            } else {
                setError('Failed to update product.');
            }
        }
    };

    return (
        <div className="fixed inset-0 overflow-auto flex products-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                {error && <div className="text-red-500 mb-3">{JSON.stringify(error)}</div>}
                {success && <div className="text-green-500 mb-3">{success}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-bold text-black">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded p-2 text-black"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-bold text-black">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded p-2 text-black"
                        ></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-bold text-black">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border rounded p-2 text-black"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="photo" className="font-bold text-black">Photo</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="border rounded p-2 text-black"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemModal;
