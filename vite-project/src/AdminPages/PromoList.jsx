import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const PromoList = () => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const fetchPromos = async () => {
        try {
            const response = await axiosClient.get('/promos');
            setPromos(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch promos.');
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axiosClient.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const handleDeletePromo = async (id) => {
        if (window.confirm("Are you sure you want to delete this promo?")) {
            try {
                await axiosClient.delete(`/promos/${id}`);
                setPromos((prevPromos) => prevPromos.filter((promo) => promo.id !== id));
            } catch (error) {
                setError("Failed to delete promo.");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchPromos();
        fetchProducts();
    }, []);

    const openModal = (promo) => {
        setSelectedPromo(promo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPromo(null);
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

    const handleUpdatePromo = async (updatedPromo) => {
        try {
            const formData = new FormData();
            formData.append('name_promo', updatedPromo.name_promo);
            formData.append('description_promo', updatedPromo.description_promo);
            formData.append('price_promo', updatedPromo.price_promo);
            formData.append('discount', updatedPromo.discount);
            formData.append('status', updatedPromo.status);
            formData.append('start_promo', updatedPromo.start_promo);
            formData.append('end_promo', updatedPromo.end_promo);
            formData.append('id_product', updatedPromo.id_product);

            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => {
                    formData.append('images[]', file);
                });
            }

            const response = await axiosClient.post(`/promos/${updatedPromo.id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchPromos();
            closeModal();
        } catch (error) {
            setError(error.response?.data.message || 'Failed to update promo.');
            console.error(error);
        }
    };

    const navigateToAddPromo = () => {
        navigate('/addpromo');
    };

    return (
        <section id="promolist" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-3xl font-bold mb-6">Promo List</h1>
                    {error && <div className="text-red-500 mb-3">{error}</div>}

                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-orange-500"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-xl shadow-md">
                            <table className="min-w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        {['Promo Name', 'Description', 'Price', 'Discount', 'Status', 'Images', 'Actions'].map((header) => (
                                            <th key={header} className="py-4 px-6 text-left text-sm font-bold text-black">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {promos.map((promo, index) => (
                                        <tr key={promo.id || index} className="border-b">
                                            <td className="py-3 px-6">{promo.name_promo}</td>
                                            <td className="py-3 px-6">{promo.description_promo}</td>
                                            <td className="py-3 px-6">{promo.price_promo}</td>
                                            <td className="py-3 px-6">{promo.discount}%</td>
                                            <td className="py-3 px-6">{promo.status}</td>
                                            <td className="py-3 px-6">
                                                {promo.image_urls?.map((url, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={url}
                                                        alt={`Promo ${idx + 1}`}
                                                        className="h-16 w-16 object-cover rounded-md"
                                                    />
                                                )) || <span>No images available</span>}
                                            </td>
                                            <td className="py-3 px-6">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="View/Edit"
                                                    onClick={() => openModal(promo)}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700 ml-4"
                                                    title="Delete"
                                                    onClick={() => handleDeletePromo(promo.id)}
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

                    {isModalOpen && selectedPromo && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-5 rounded-lg w-11/12 md:w-1/3 max-h-screen overflow-y-auto">
                                <h2 className="text-xl font-bold mb-4">Edit Promo</h2>

                                {/* Promo Name */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Promo Name</label>
                                    <input
                                        type="text"
                                        value={selectedPromo.name_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, name_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Description</label>
                                    <textarea
                                        value={selectedPromo.description_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, description_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Price</label>
                                    <input
                                        type="number"
                                        value={selectedPromo.price_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, price_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Discount */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Discount</label>
                                    <input
                                        type="number"
                                        value={selectedPromo.discount}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, discount: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Start Promo */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Start Promo</label>
                                    <input
                                        type="date"
                                        value={selectedPromo.start_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, start_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* End Promo */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">End Promo</label>
                                    <input
                                        type="date"
                                        value={selectedPromo.end_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, end_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Product Selector */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Product</label>
                                    <select
                                        value={selectedPromo.id_product}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, id_product: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Selector */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Status</label>
                                    <select
                                        value={selectedPromo.status}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, status: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Current Images */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Current Images</label>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPromo.image_urls?.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`Current ${idx + 1}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Upload New Images */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Upload New Images</label>
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

                                {/* Action Buttons */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={() => handleUpdatePromo(selectedPromo)}
                                    >
                                        Update Promo
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={navigateToAddPromo}
                    >
                        Add New Promo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PromoList;
