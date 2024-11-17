import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import PromoModal from './PromoModal';
import { useNavigate } from 'react-router-dom';

const PromoList = () => {
    const [promos, setPromos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromo, setSelectedPromo] = useState(null);
    const navigate = useNavigate();

    // State untuk menandai gambar yang error
    const imageErrorState = {};

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await axiosClient.get('/promos'); // Ganti dengan endpoint yang sesuai untuk promos
                setPromos(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch promos.');
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    const openModal = (promo) => {
        setSelectedPromo(promo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPromo(null);
        setIsModalOpen(false);
    };

    const handleUpdatePromo = (updatedPromo) => {
        setPromos((prevPromos) =>
            prevPromos.map((promo) => (promo.id === updatedPromo.id ? updatedPromo : promo))
        );
    };

    const navigateToAddPromo = () => {
        navigate('/addpromo');
    };

    // Function untuk menangani error gambar
    const handleImageError = (promoId, index) => {
        if (!imageErrorState[promoId]) {
            imageErrorState[promoId] = [];
        }
        imageErrorState[promoId][index] = true; // Tandai gambar yang gagal dimuat
    };

    return (
        <section id="promolist" className='pt-0'>
            <div className="container pt-12 bg-primaryColorLight max-w-screen mx-auto rounded-3xl shadow-md mb-6 mt-10 p-5">
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
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Image</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Product Name</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Promo Name</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Description</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Price</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Discount</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Status</th>
                                    <th className="py-3 px-6 bg-primaryColor text-left text-sm font-semibold text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promos.map((promo) => (
                                    <tr key={promo.id} className="border-b">
                                        <td className="py-3 px-6 text-black">
                                            {promo.image_urls && promo.image_urls.length > 0 ? (
                                                promo.image_urls.map((imgPath, index) => {
                                                    if (!imageErrorState[promo.id]) {
                                                        imageErrorState[promo.id] = [];
                                                    }
                                                    const handleError = () => {
                                                        imageErrorState[promo.id][index] = true;
                                                    };
                                                    return (
                                                        <img
                                                            key={index}
                                                            src={imageErrorState[promo.id][index] ? 'path/to/default_image.jpg' : imgPath}
                                                            alt={`${promo.name} ${index + 1}`}
                                                            className="h-16 w-16 object-cover rounded-md"
                                                            onError={handleError}
                                                        />
                                                    );
                                                })
                                            ) : (
                                                <span>No images available</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-black">{promo.product_name || 'N/A'}</td>
                                        <td className="py-3 px-6 text-black">{promo.name_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.description_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.price_promo}</td>
                                        <td className="py-3 px-6 text-black">{promo.discount}%</td>
                                        <td className="py-3 px-6 text-black">{promo.status}</td>
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
                    <PromoModal promo={selectedPromo} onClose={closeModal} onUpdatePromo={handleUpdatePromo} />
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
