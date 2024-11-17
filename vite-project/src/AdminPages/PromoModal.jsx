import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../axios-client';

const PromoModal = ({ promo, onClose, onUpdatePromo }) => {
    const [formData, setFormData] = useState({
        name_promo: '',
        description_promo: '',
        price_promo: '',
        discount: '',
        status: 'active', // default value
        image_promo: null,
    });

    const [error, setError] = useState(null);

    // UseEffect to initialize form data when promo is passed
    useEffect(() => {
        if (promo) {
            setFormData({
                name_promo: promo.name_promo,
                description_promo: promo.description_promo,
                price_promo: promo.price_promo,
                discount: promo.discount,
                status: promo.status,
                image_promo: null, // reset image on load
            });
        }
    }, [promo]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input for image
    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image_promo: e.target.files[0],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare form data for API request
            const data = new FormData();
            data.append('name_promo', formData.name_promo);
            data.append('description_promo', formData.description_promo);
            data.append('price_promo', formData.price_promo);
            data.append('discount', formData.discount);
            data.append('status', formData.status);
            data.append('id_product', promo.id_product); // Assuming id_product is the same
            if (formData.image_promo) {
                data.append('image_promo', formData.image_promo);
            }

            // Update promo request to backend API
            const response = await axiosClient.put(`/promos/${promo.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Call onUpdatePromo to update the parent component state
            onUpdatePromo(response.data.promo);

            // Close the modal after successful update
            onClose();
        } catch (error) {
            console.error('Error updating promo:', error);
            setError('Failed to update promo. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Edit Promo</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name_promo"
                            value={formData.name_promo}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description_promo"
                            value={formData.description_promo}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price_promo"
                            value={formData.price_promo}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Discount</label>
                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image_promo"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PromoModal;
