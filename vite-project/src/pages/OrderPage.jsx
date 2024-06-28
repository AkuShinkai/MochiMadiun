import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const OrderPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [proof, setProof] = useState(null); // State untuk menyimpan bukti pembayaran
    const [bankAccount, setBankAccount] = useState('');
    const navigate = useNavigate();

    const { token } = useStateContext()
    if (!token) {
        return <Navigate to="/login" />
    }

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axiosClient.get(`/items/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Gagal mengambil item:', error);
            }
        };

        fetchItem();
    }, [id]);

    const handleFileChange = (e) => {
        setProof(e.target.files[0]); // Menyimpan file yang dipilih ke state proof
    };

    const handleOrder = async () => {
        try {
            const formData = new FormData();
            formData.append('items_id', item.id);
            formData.append('quantity', quantity);
            formData.append('status', 'pending');
            formData.append('payment', paymentMethod);
            formData.append('proof', proof); // Menambahkan proof ke FormData

            const response = await axiosClient.post('/orders', formData);

            const newOrderId = response.data.id;
            alert('Pesanan berhasil ditempatkan dan bukti pembayaran berhasil diunggah!');
            navigate('/'); // Navigasi kembali ke halaman utama setelah pesanan dan pembayaran selesai
        } catch (error) {
            if (error.response) {
                // Server mengembalikan respons dengan status diluar 2xx
                console.error('Error response:', error.response.data);
                console.error('Status code:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                // Permintaan dibuat tetapi tidak menerima respons
                console.error('No response received:', error.request);
            } else {
                // Terjadi kesalahan dalam membuat permintaan
                console.error('Error setting up the request:', error.message);
            }
            alert('Gagal menempatkan pesanan.');
        }
    };


    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        // Set bank account based on payment method
        switch (e.target.value) {
            case 'shopepay':
                setBankAccount('123456789 (ShopeePay)');
                break;
            case 'bri':
                setBankAccount('012345678 (BRI)');
                break;
            case 'bca':
                setBankAccount('987654321 (BCA)');
                break;
            default:
                setBankAccount('');
                break;
        }
    };

    return (
        <section id='orderpage'>
            <div className="container mx-auto mt-10 mb-10 py-9 bg-primaryColorLight rounded-xl">
                <h1 className="text-2xl font-bold mb-5">Order {item && item.name}</h1>
                {item ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={`data:image/jpeg;base64,${item.photo}`}
                            alt={item.name}
                            className="h-64 w-64 object-cover rounded-xl ring-yellow-300 ring-2 mb-5"
                        />
                        <div className="mb-5">
                            <p className="text-lg mb-2">Description: {item.description}</p>
                            <p className="text-lg mb-2">Price: ${item.price}</p>
                            <p className="text-lg mb-2">Stock: {item.stock}</p>
                        </div>
                        <div className="mb-5">
                            <label className="text-lg mb-2">Quantity: </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="border rounded px-2 py-1 text-black"
                                min="1"
                                max={item.stock}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="text-lg mb-2">Payment Method: </label>
                            <select
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                                className="border rounded px-2 py-1 text-black"
                            >
                                <option value="">Select a payment method</option>
                                <option value="shopepay">ShopeePay</option>
                                <option value="bri">BRI</option>
                                <option value="bca">BCA</option>
                            </select>
                        </div>
                        {bankAccount && (
                            <p className="text-lg mb-5">Transfer to Bank Account: {bankAccount}</p>
                        )}
                        {/* Input untuk unggah bukti pembayaran */}
                        <div className="mb-5">
                            <label className="text-lg mb-2">Upload Payment Proof: </label>
                            <input type="file" onChange={handleFileChange} className="mb-2" />
                        </div>
                        <button
                            onClick={handleOrder}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Place Order & Upload Proof
                        </button>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </section>
    );
};

export default OrderPage;
