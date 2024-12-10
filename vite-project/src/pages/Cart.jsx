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
            setNotification('Item removed successfully!');
            setTimeout(() => setNotification(null), 3000);

            // Tutup modal
            setShowModal(false);
            setItemToDelete(null);
        }
    };

    const createOrderMessage = (cart) => {
        let message = 'I would like to order the following products:\n\n';
        cart.forEach(item => {
            message += `${item.name} - $${item.price}\n`;
        });
        message += '\nThank you!';
        return message;
    };

    const handleWhatsAppOrder = () => {
        const orderMessage = createOrderMessage(cart);
        window.open(`https://wa.me/+6285790258894?text=${encodeURIComponent(orderMessage)}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-40">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p>Your cart is empty. Add products to the cart first.</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center py-4 border-b space-x-4">
                                <div className="flex items-center space-x-4">
                                    {item.image_urls && item.image_urls.length > 0 && (
                                        <img
                                            src={item.image_urls[0]}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="font-bold">${item.price}</span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleConfirmDelete(index)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                onClick={handleWhatsAppOrder}
            >
                Order via WhatsApp
            </button>

            {/* Modal Konfirmasi Hapus */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to remove this item from the cart?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleRemoveItem}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifikasi */}
            {notification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default Cart;
