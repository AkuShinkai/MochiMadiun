import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import Slider from 'react-slick';

const DetailItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [promos, setPromos] = useState([]);
    const [notification, setNotification] = useState(null); // State for notification

    useEffect(() => {
        const fetchItemAndPromos = async () => {
            try {
                // Ambil data produk
                const response = await axiosClient.get(`/products/${id}`);
                setItem(response.data);
                console.log("Product:", response.data); // Log produk untuk verifikasi

                // Ambil data promo
                const promosResponse = await axiosClient.get('/promos');
                setPromos(promosResponse.data);
                console.log("Promos:", promosResponse.data); // Log promo untuk verifikasi
            } catch (error) {
                console.error('Failed to fetch item or promos:', error);
            }
        };

        fetchItemAndPromos();
    }, [id]);

    if (!item || promos.length === 0) {
        return <div>Loading...</div>;
    }

    const handleOrder = () => {
        // Get current cart from localStorage, or create a new one if it's empty
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check for the promo and calculate the price
        const priceDetails = getDiscountedPrice(item);

        // Create an object for the item with the correct price (either discounted or regular)
        const cartItem = priceDetails ? {
            ...item,
            price: priceDetails.discountedPrice,  // Use discounted price if available
            originalPrice: priceDetails.priceBeforeDiscount, // Store the original price
            discount: priceDetails.discount, // Store discount for reference
        } : {
            ...item,
            price: item.price,  // If no promo, use the regular price
            originalPrice: item.price, // Store the regular price
            discount: 0, // No discount if not applicable
        };

        // Add the current item to the cart
        currentCart.push(cartItem);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));

        // Show success notification
        setNotification('Item added to cart!');

        // Remove notification after 3 seconds
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };


    // Check for promo and calculate price after discount (if any)
    const getDiscountedPrice = (item) => {
        console.log('Checking promo for product', item.name); // Log nama produk
        console.log('Promo IDs:', promos.map(promo => promo.id_product)); // Log ID produk pada promo

        const currentPromo = promos.find(promo => promo.id_product === item.id && promo.status === 'available');

        console.log('Current Promo:', currentPromo); // Log promo yang ditemukan

        if (currentPromo) {
            const discount = currentPromo.discount;
            const priceBeforeDiscount = item.price;
            const discountedPrice = priceBeforeDiscount - (priceBeforeDiscount * (discount / 100));

            return { priceBeforeDiscount, discountedPrice, discount };
        }
        return null;
    };

    const priceDetails = getDiscountedPrice(item);

    // Slick settings for auto-slide and manual control
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section id="detailitem" className="bg-primaryColorLight py-10 pt-24 relative">
            <div className="container mx-auto px-4 md:px-0">
                <div className="max-w-screen-lg mx-auto bg-white rounded-3xl shadow-md overflow-hidden">
                    <div className="md:flex p-6">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <Slider {...settings}>
                                {item.image_urls && item.image_urls.length > 0 ? (
                                    item.image_urls.map((url, index) => (
                                        <div key={index} className="flex justify-center items-center my-5">
                                            <img
                                                src={url}
                                                alt={`Product image ${index + 1}`}
                                                className="w-full h-auto object-contain rounded-xl"
                                                style={{ maxHeight: '400px' }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex justify-center items-center my-5">
                                        <img
                                            src="/path/to/default-image.jpg"
                                            alt="Default image"
                                            className="w-full h-auto object-contain rounded-xl"
                                            style={{ maxHeight: '400px' }}
                                        />
                                    </div>
                                )}
                            </Slider>
                        </div>
                        <div className="md:w-1/2 p-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.name}</h1>
                            <p className="text-lg text-gray-700 mb-6">{item.description}</p>
                            <div className="mb-6">
                                <table className="table-auto text-gray-800 w-full">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold pr-2 py-2">
                                                <i className="fas fa-tag mr-2 text-green-500"></i>Price:
                                            </td>
                                            <td className="text-right py-2">
                                                {/* Jika ada diskon, tampilkan harga asli dan harga diskon */}
                                                {priceDetails ? (
                                                    <>
                                                        <span className="line-through text-gray-500 mr-2">
                                                            Rp.{priceDetails.priceBeforeDiscount}
                                                        </span>
                                                        <span className="text-lg font-semibold text-red-600">
                                                            Rp.{priceDetails.discountedPrice}
                                                        </span>
                                                    </>
                                                ) : (
                                                    // Jika tidak ada promo, tampilkan harga normal
                                                    `Rp.${item.price}`
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold pr-2 py-2">
                                                <i className="fas fa-th-large mr-2 text-blue-500"></i>Category:
                                            </td>
                                            <td className="text-right py-2">{item.category}</td>
                                        </tr>
                                        {/* Display promo information if available */}
                                        {priceDetails && (
                                            <tr>
                                                <td className="font-semibold pr-2 py-2">
                                                    <i className="fas fa-percent mr-2 text-red-500"></i>Promo:
                                                </td>
                                                <td className="text-right py-2 text-red-600">
                                                    {priceDetails.discount}% off
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg w-full md:w-auto flex justify-center items-center"
                                onClick={handleOrder}
                            >
                                <i className="fas fa-cart-plus mr-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Toast Notification */}
            {notification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    <i className="fas fa-check-circle mr-2"></i>{notification}
                </div>
            )}
        </section>
    );
};

export default DetailItem;
