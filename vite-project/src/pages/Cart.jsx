import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false); // State untuk modal
    const [itemToDelete, setItemToDelete] = useState(null); // State untuk item yang akan dihapus
    const [notification, setNotification] = useState(null); // State untuk notifikasi
    const navigate = useNavigate();

    useEffect(() => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(currentCart);
    }, []);

    const handleConfirmDelete = (index) => {
        setItemToDelete(index);
        setShowModal(true);
    };

    const handleRemoveItem = () => {
        if (itemToDelete !== null) {
            const updatedCart = [...cart];
            updatedCart.splice(itemToDelete, 1);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Tampilkan notifikasi
            setNotification('Item berhasil dihapus!');
            setTimeout(() => setNotification(null), 3000);

            // Tutup modal
            setShowModal(false);
            setItemToDelete(null);
        }
    };

    const createOrderMessage = (cart) => {
        let message = 'Saya ingin memesan produk berikut:\n\n';
        cart.forEach(item => {
            message += `- ${item.name} - Rp ${item.price}\n`;
            if (item.discount > 0) {
                message += `  *Promo:* Diskon ${item.discount}% - Harga Setelah Diskon: Rp ${getDiscountedPrice(item)}\n`;
            }
            message += `\n`;
        });
        message += '\nTerima kasih!';
        return message;
    };

    const handleWhatsAppOrder = () => {
        const orderMessage = createOrderMessage(cart);
        window.open(`https://wa.me/+6287755226610?text=${encodeURIComponent(orderMessage)}`, '_blank');
    };

    const getDiscountedPrice = (item) => {
        if (item.discount > 0) {
            const discountedPrice = item.originalPrice - (item.originalPrice * (item.discount / 100));
            return discountedPrice;
        }
        return null; // No discount
    };

    return (
        <section id="detailitem" className="bg-primaryColorLight py-10 pt-24 relative">
            <div className="container mx-auto px-4 md:px-0">
                <div className="max-w-screen-lg mx-auto py-10 px-10 bg-white rounded-3xl shadow-md overflow-hidden">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">Keranjang Anda</h2>
                    <div className="space-y-6">
                        {cart.length === 0 ? (
                            <p className="text-lg text-gray-600 text-center">Keranjang Anda kosong. Tambahkan produk terlebih dahulu.</p>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item, index) => {
                                    const discountedPrice = getDiscountedPrice(item); // Get discounted price if available
                                    return (
                                        <li key={index} className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-300 sm:space-x-4">
                                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                                {item.image_urls && item.image_urls.length > 0 && (
                                                    <img
                                                        src={item.image_urls[0]}
                                                        alt={item.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                                                {/* Tampilkan harga dengan promo jika ada */}
                                                {discountedPrice ? (
                                                    <>
                                                        <span className="line-through text-gray-500">Rp {item.originalPrice}</span>
                                                        <span className="font-semibold text-lg text-red-600">Rp {discountedPrice}</span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-lg text-gray-800">Rp {item.price}</span>
                                                )}
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleConfirmDelete(index)}
                                                >
                                                    <i className="fas fa-trash-alt"></i> Hapus
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    <button
                        className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg w-full sm:w-auto flex items-center justify-center mx-auto"
                        onClick={handleWhatsAppOrder}
                    >
                        <i className="fab fa-whatsapp mr-2"></i> Pesan lewat WhatsApp
                    </button>

                    {/* Modal Konfirmasi Hapus */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Konfirmasi Hapus</h3>
                                <p className="text-gray-600 mb-4">Apakah Anda yakin ingin menghapus item ini dari keranjang?</p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                        onClick={handleRemoveItem}
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Notifikasi */}
                {notification && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
                        <i className="fas fa-check-circle mr-2"></i>{notification}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
