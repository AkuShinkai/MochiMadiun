import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const AddPromo = () => {
    const [formData, setFormData] = useState({
        name_promo: '',
        description_promo: '',
        price_promo: '',
        start_promo: '',
        end_promo: '',
        image_promo: null,
        discount: '',
        id_products: [], // Array untuk menampung produk yang dipilih
    });
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil produk yang tersedia
        axiosClient.get('/products')
            .then(response => setProducts(response.data))
            .catch(() => setError('Failed to fetch products'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image_promo: file });
    };

    const addProduct = () => {
        setFormData({ ...formData, id_products: [...formData.id_products, ''] });
    };

    const updateProduct = (index, value) => {
        const updatedProducts = [...formData.id_products];
        updatedProducts[index] = value;
        setFormData({ ...formData, id_products: updatedProducts });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...formData.id_products];
        updatedProducts.splice(index, 1);
        setFormData({ ...formData, id_products: updatedProducts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'id_products') {
                // Append multiple product IDs
                formData[key].forEach((id) => data.append('id_products[]', id));
            } else if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            await axiosClient.post('/promos', data);
            setSuccess('Promo added successfully!');
            navigate('/promos'); // Redirect to promo list page
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.errors || 'Failed to add promo.');
            } else {
                setError('Failed to add promo.');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-2xl font-bold mb-5">Add Promo</h1>
            {error && <div className="text-red-500 mb-3">{error}</div>}
            {success && <div className="text-green-500 mb-3">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name_promo" className="font-bold text-black">Promo Name</label>
                    <input
                        type="text"
                        id="name_promo"
                        name="name_promo"
                        value={formData.name_promo}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description_promo" className="font-bold text-black">Description</label>
                    <textarea
                        id="description_promo"
                        name="description_promo"
                        value={formData.description_promo}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price_promo" className="font-bold text-black">Price</label>
                    <input
                        type="number"
                        id="price_promo"
                        name="price_promo"
                        value={formData.price_promo}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="start_promo" className="font-bold text-black">Start Date</label>
                    <input
                        type="date"
                        id="start_promo"
                        name="start_promo"
                        value={formData.start_promo}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="end_promo" className="font-bold text-black">End Date</label>
                    <input
                        type="date"
                        id="end_promo"
                        name="end_promo"
                        value={formData.end_promo}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="discount" className="font-bold text-black">Discount</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-bold text-black">Products</label>
                    {formData.id_products.map((id, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <select
                                value={id}
                                onChange={(e) => updateProduct(index, e.target.value)}
                                className="border rounded p-2 flex-1"
                                required
                            >
                                <option value="">Select a Product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => removeProduct(index)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addProduct}
                        className="bg-green-500 text-white p-2 rounded mt-2"
                    >
                        Add Product
                    </button>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image_promo" className="font-bold text-black">Promo Image</label>
                    <input
                        type="file"
                        id="image_promo"
                        name="image_promo"
                        onChange={handleFileChange}
                        className="border rounded p-2"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Promo</button>
                </div>
            </form>
        </div>
    );
};

export default AddPromo;
