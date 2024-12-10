import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const AddItems = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: [],
        price: '',
        status: 'not available',
        category: 'mochi daifuku',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files) {
            const fileArray = Array.from(files);
            setFormData({ ...formData, image: fileArray });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'image') {
                // Hanya tambahkan jika ada gambar yang dipilih
                if (formData.image.length > 0) {
                    formData.image.forEach((file) => {
                        data.append('images[]', file);
                    });
                }
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await axiosClient.post('/products', data);
            setSuccess('Item added successfully!');
            setFormData({
                name: '',
                description: '',
                image: [],
                price: '',
            });
        } catch (error) {
            setError('Failed to add item.');
            console.log(error);
        }
    };


    const handleCancel = () => {
        setFormData({
            name: '',
            description: '',
            // stock: '',
            image: '',
            price: '',
            // category: '',
        });
        setError(null);
        setSuccess(null);
    };

    return (
        <div className="container pt-12 bg-primaryColorLight max-w-3xl mx-auto rounded-xl shadow-md mb-6 mt-10 p-5">
            <h1 className="text-2xl font-bold mb-5">Add New Item</h1>
            {error && <div className="text-red-500 bg-red-100 mb-3">{error}</div>}
            {success && <div className="m-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                        Name <span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="description" className="font-semibold">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border rounded p-2 text-black"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-semibold">
                        Price <span className="text-red-500">*</span>
                    </label>
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
                    <label htmlFor="status" className="font-semibold">
                        Status <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border rounded p-2 text-black"
                        required
                    >
                        <option value="available">Available</option>
                        <option value="not available">Not Available</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-semibold">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border rounded p-2 text-black"
                        required
                    >
                        <option value="mochi daifuku">Mochi Daifuku</option>
                        <option value="mochi mantap">Mochi Mantap</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image" className="font-semibold">
                        image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        multiple // Tambahkan ini
                        onChange={handleFileChange}
                        className="border rounded p-2 text-white cursor-pointer"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-green-700 hover:bg-green-400 text-white p-2 rounded">
                        Add Item
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center bg-red-500 text-md px-3 py-1 rounded text-white hover:bg-red-600">
                        <span>Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;
