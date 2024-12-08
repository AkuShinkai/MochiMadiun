import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Slider from 'react-slick';

const DetailItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axiosClient.get(`/products/${id}`);
                setItem(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch item:', error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const handleOrder = () => {
        // Get current cart from localStorage, or create a new one if it's empty
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the current item to the cart
        currentCart.push(item);

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
        console.log(localStorage)

        // // Navigate to order page (or directly to WhatsApp)
        // navigate(`/order/${id}`);
    };

    // Slick settings for auto-slide and manual control
    const settings = {
        dots: true, // Show dots for navigation
        infinite: true, // Infinite loop
        speed: 500, // Transition speed
        slidesToShow: 1, // Show one image at a time
        slidesToScroll: 1, // Scroll one image at a time
        autoplay: true, // Auto slide
        autoplaySpeed: 3000, // Delay for auto slide
    };

    return (
        <section id="detailitem" className="bg-primaryColorLight py-10 pt-24">
            <div className="container mx-auto px-4 md:px-0">
                <div className="max-w-screen-lg mx-auto bg-primaryColor rounded-3xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 m-5 items-center">
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
                        <div className="md:w-1/2 p-6 md:py-10">
                            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                            <p className="text-lg mb-6">{item.description}</p>
                            <div className="mb-6">
                                <table className="table-auto text-black">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold pr-2">Price:</td>
                                            <td>{item.price}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold pr-2">Category:</td>
                                            <td>{item.category}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleOrder}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailItem;
