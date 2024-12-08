import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil data keranjang dari localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(currentCart);
    }, []);

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
        // Redirect to WhatsApp with the order message
        window.open(`https://wa.me/+6285790258894?text=${encodeURIComponent(orderMessage)}`, '_blank');
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p>Your cart is empty. Add products to the cart first.</p>
                ) : (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center py-2 border-b">
                                <span>{item.name}</span>
                                <span>${item.price}</span>
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
        </div>
    );
};

export default Cart;
