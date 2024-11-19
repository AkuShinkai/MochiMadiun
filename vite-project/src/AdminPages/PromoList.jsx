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
            const response = await axiosClient.get('/products'); // Pastikan endpoint sesuai
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        fetchPromos();
        fetchProducts(); // Panggil saat komponen dimuat
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


            // Menambahkan gambar baru jika ada
            if (selectedFiles.length > 0) {
                Array.from(selectedFiles).forEach((file) => {
                    formData.append('images[]', file);
                });
            }

            // Kirim data ke server menggunakan axios
            const response = await axiosClient.post(`/promos/${updatedPromo.id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Jika update berhasil, refresh data promo
            fetchPromos();
            closeModal();
        } catch (error) {
            // Menampilkan pesan error jika ada
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Failed to update promo.');
            } else {
                setError('Failed to update promo.');
            }
            console.error(error);
        }
    };

    const navigateToAddPromo = () => {
        navigate('/addpromo');
    };

    return (
        <section id="promolist" className="pt-0">
            <div className="container bg-primaryColorLight max-w-screen mx-auto rounded-3xl shadow-md mb-6 mt-10 p-5">
                <h1 className="text-2xl font-bold mb-5">Promo List</h1>
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
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Promo Name</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Description</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Price</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Discount</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Status</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Images</th>
                                    <th className="py-3 px-6 text-left text-sm font-bold text-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promos.map((promo, index) => (
                                    <tr key={promo.id ? promo.id : index} className="border-b">
                                        <td className="py-3 px-6 text-black">{promo.name_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.description_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.price_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.discount}%</td>
                                        <td className="py-3 px-6 text-black">{promo.status}</td>
                                        <td className="py-3 px-6 text-black">
                                            {promo.image_urls?.map((url, idx) => (
                                                <img
                                                    key={idx}
                                                    src={url}
                                                    alt={`Promo ${idx + 1}`}
                                                    className="h-16 w-16 object-cover rounded-md"
                                                />
                                            )) || <span>No images available</span>}
                                        </td>
                                        <td className="py-3 px-6 text-black">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => openModal(promo)}
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

                {isModalOpen && selectedPromo && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded-lg w-1/3 overflow-y-auto max-h-screen">
                            <h2 className="text-xl font-bold mb-3">Edit Promo</h2>
                            <div className="mb-3">
                                <label className="font-semibold">Promo Name</label>
                                <input
                                    type="text"
                                    value={selectedPromo.name_promo}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, name_promo: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Description</label>
                                <textarea
                                    value={selectedPromo.description_promo}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, description_promo: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Price</label>
                                <input
                                    type="number"
                                    value={selectedPromo.price_promo}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, price_promo: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Discount</label>
                                <input
                                    type="number"
                                    value={selectedPromo.discount}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, discount: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Start Promo</label>
                                <input
                                    type="date"
                                    value={selectedPromo.start_promo}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, start_promo: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">End Promo</label>
                                <input
                                    type="date"
                                    value={selectedPromo.end_promo}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, end_promo: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Product</label>
                                <select
                                    value={selectedPromo.id_product}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, id_product: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    {/* Render opsi produk dari API */}
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="font-semibold">Status</label>
                                <select
                                    value={selectedPromo.status}
                                    onChange={(e) => setSelectedPromo({ ...selectedPromo, status: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold">Current Images</label>
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
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={() => handleUpdatePromo(selectedPromo)}
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
                        onClick={navigateToAddPromo}
                    >
                        Add Promo
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PromoList;
