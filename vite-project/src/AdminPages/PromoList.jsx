import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PromoList = () => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [promoToDelete, setPromoToDelete] = useState(null);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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



    const handleDeletePromo = async () => {
        try {
            await axiosClient.delete(`/promos/${promoToDelete.id}`);
            setPromos((prevPromos) => prevPromos.filter((promo) => promo.id !== promoToDelete.id));
            setPromoToDelete(null);
            setIsConfirmModalOpen(false);

            // Tampilkan animasi konfirmasi
            setShowDeleteConfirmation(true);
            setTimeout(() => setShowDeleteConfirmation(false), 3000); // Sembunyikan setelah 3 detik
        } catch (error) {
            setError('Failed to delete promo.');
            console.error(error);
        }
    };

    const openConfirmModal = (promo) => {
        setPromoToDelete(promo);
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setPromoToDelete(null);
        setIsConfirmModalOpen(false);
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
        const priceBeforeDiscount = updatedPromo.product?.price || 0;
        const discountAmount = (priceBeforeDiscount * updatedPromo.discount) / 100;
        const priceAfterDiscount = priceBeforeDiscount - discountAmount;

        // Anda bisa menambahkan perhitungan harga di sini jika perlu
        // console.log('Price before discount:', priceBeforeDiscount);
        // console.log('Price after discount:', priceAfterDiscount);

        try {
            const formData = new FormData();
            formData.append('name_promo', updatedPromo.name_promo);
            formData.append('description_promo', updatedPromo.description_promo);
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
            <div className="container mx-auto px-0">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-6">Promo List</h1>
                    {/* Pesan konfirmasi setelah penghapusan */}
                    {showDeleteConfirmation && (
                        <div
                            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out"
                            style={{
                                animation: 'fade-in-out 3s ease-in-out',
                            }}
                        >
                            Promo berhasil dihapus!
                        </div>
                    )}
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
                                        {['Nama Promo', 'Deskripsi', 'Harga Sebelum Diskon', 'Harga Setelah Diskon', 'Diskon', 'Mulai Promo', 'Akhir Promo', 'Status', 'Gambar', 'Actions'].map((header) => (
                                            <th key={header} className="py-4 px-6 text-left bg-gray-200 text-sm font-bold text-black">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {promos.map((promo, index) => {
                                        const priceBeforeDiscount = promo.product?.price || 0;
                                        const discountAmount = (priceBeforeDiscount * promo.discount) / 100;
                                        const priceAfterDiscount = priceBeforeDiscount - discountAmount;

                                        return (
                                            <tr key={promo.id || index} className="border-b">
                                                <td className="py-3 px-6">{promo.name_promo}</td>
                                                <td className="py-3 px-6">{promo.description_promo}</td>
                                                <td className="py-3 px-6">Rp.{priceBeforeDiscount.toLocaleString()}</td>
                                                <td className="py-3 px-6">Rp.{priceAfterDiscount.toLocaleString()}</td>
                                                <td className="py-3 px-6">{promo.discount}%</td>
                                                <td className="py-3 px-6">{promo.start_promo}</td>
                                                <td className="py-3 px-6">{promo.end_promo}</td>
                                                <td className={`py-3 px-6 ${promo.status === 'available' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>
                                                    {promo.status === 'available' ? 'Tersedia' : 'Tidak Tersedia'}
                                                </td>
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
                                                <td className="py-3 px-6 space-x-4">
                                                    <button className="text-blue-500 hover:text-blue-700" title="Edit" onClick={() => openModal(promo)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button className="text-red-500 hover:text-red-700" title="Delete" onClick={() => openConfirmModal(promo)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Modal Edit Promo */}
                    {isModalOpen && selectedPromo && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-5 rounded-lg w-11/12 md:w-1/3 max-h-screen overflow-y-auto">
                                <h2 className="text-xl font-bold mb-4">Edit Promo</h2>

                                {/* Promo Name */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Nama Promo</label>
                                    <input
                                        type="text"
                                        value={selectedPromo.name_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, name_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Deskripsi</label>
                                    <textarea
                                        value={selectedPromo.description_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, description_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Discount */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Diskon (%)</label>
                                    <input
                                        type="number"
                                        value={selectedPromo.discount}
                                        onChange={(e) => {
                                            const updatedDiscount = e.target.value;
                                            const priceBeforeDiscount = selectedPromo.product?.price || 0;
                                            const discountAmount = (priceBeforeDiscount * updatedDiscount) / 100;
                                            const priceAfterDiscount = priceBeforeDiscount - discountAmount;
                                            setSelectedPromo({ ...selectedPromo, discount: updatedDiscount, price_after_discount: priceAfterDiscount });
                                        }}
                                        className="w-full p-2 border rounded"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                {/* Preview Prices */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Preview Harga</label>
                                    <div className="flex justify-between">
                                        <span>Sebelum Diskon:</span>
                                        <span>Rp.{selectedPromo.product?.price?.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Setelah Diskon:</span>
                                        <span>Rp.{(selectedPromo.product?.price - (selectedPromo.product?.price * selectedPromo.discount) / 100)?.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Start Promo */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Mulai Promo</label>
                                    <input
                                        type="date"
                                        value={selectedPromo.start_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, start_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* End Promo */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Akhir Promo</label>
                                    <input
                                        type="date"
                                        value={selectedPromo.end_promo}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, end_promo: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Status</label>
                                    <select
                                        value={selectedPromo.status || 'available'}
                                        onChange={(e) => setSelectedPromo({ ...selectedPromo, status: e.target.value })}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="available">Tersedia</option>
                                        <option value="not available">Tidak Tersedia</option>
                                    </select>
                                </div>

                                {/* Product Selector */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Produk</label>
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

                                {/* Current Images */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold">Gambar Promo Saat Ini</label>
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
                                    <label className="block text-sm font-semibold">Upload Gambar Baru</label>
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
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => handleUpdatePromo(selectedPromo)}
                                    >
                                        Update Promo
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={closeModal}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal Konfirmasi Hapus */}
                    {isConfirmModalOpen && promoToDelete && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
                                <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus Promo</h2>
                                <p>Apakah Anda yakin ingin menghapus promo: <strong>{promoToDelete.name_promo}</strong>?</p>
                                <div className="flex justify-end mt-6 space-x-4">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleDeletePromo}
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={closeConfirmModal}
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={navigateToAddPromo}
                    >
                        Tambah Promo Baru
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PromoList;
