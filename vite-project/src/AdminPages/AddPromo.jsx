import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const AddPromo = () => {
    const [formData, setFormData] = useState({
        name_promo: '',
        description_promo: '',
        start_promo: '',
        end_promo: '',
        status: 'not available',
        image_promo: null,
        discount: '',
        id_product: '', // ID produk yang sudah ada
    });
    const [products, setProducts] = useState([]);
    const [productPrice, setProductPrice] = useState(0); // Harga produk
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil produk yang tersedia
        axiosClient.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => setError('Gagal mengambil data produk'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        setFormData({ ...formData, id_product: productId });

        const selectedProduct = products.find(product => product.id === parseInt(productId));
        if (selectedProduct) {
            setProductPrice(selectedProduct.price);
        } else {
            setProductPrice(0); // Reset harga produk jika tidak ditemukan
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image_promo: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            await axiosClient.post('/promos', data);
            setSuccess('Promo berhasil ditambahkan!');
            navigate('/promo'); // Arahkan ke halaman daftar promo
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.errors || 'Gagal menambahkan promo.');
            } else {
                setError('Gagal menambahkan promo.');
            }
        }
    };

    // Menghitung harga setelah diskon
    const priceAfterDiscount = (productPrice > 0 && formData.discount) ?
        productPrice - (productPrice * (parseInt(formData.discount) / 100)) :
        productPrice;

    return (
        <section id="promos" className="pt-4">
            <div className="container mx-auto px-0">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-5">Tambah Promo</h1>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    {success && <div className="text-green-500 mb-3">{success}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="name_promo" className="font-bold text-black">Nama Promo</label>
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
                            <label htmlFor="description_promo" className="font-bold text-black">Deskripsi</label>
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
                            <label htmlFor="start_promo" className="font-bold text-black">Tanggal Mulai</label>
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
                            <label htmlFor="end_promo" className="font-bold text-black">Tanggal Selesai</label>
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
                            <label htmlFor="id_product" className="font-bold text-black">Produk</label>
                            <select
                                id="id_product"
                                name="id_product"
                                value={formData.id_product}
                                onChange={handleProductChange}
                                className="border rounded p-2"
                                required
                            >
                                <option value="">Pilih Produk</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="discount" className="font-bold text-black">Diskon (%)</label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                                min="0"
                            />
                        </div>
                        {/* Debugging: Menampilkan nilai harga produk dan diskon */}
                        {productPrice > 0 && formData.discount !== '' && (
                            <div className="flex flex-col">
                                <label className="font-bold text-black">Pratinjau Harga Promo</label>
                                <p>Harga sebelum diskon: Rp {productPrice.toLocaleString()}</p>
                                <p>Harga setelah diskon: Rp {priceAfterDiscount.toFixed(2).toLocaleString()}</p>
                            </div>
                        )}
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
                                <option value="available">Tersedia</option>
                                <option value="not available">Tidak Tersedia</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="image_promo" className="font-bold text-black">Gambar Promo</label>
                            <input
                                type="file"
                                id="image_promo"
                                name="image_promo"
                                onChange={handleFileChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Tambah Promo</button>
                            <button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center bg-red-500 text-md px-3 py-1 rounded text-white hover:bg-red-600">
                                <span>Batalkan</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddPromo;
