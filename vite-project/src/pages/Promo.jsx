import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import useCustomJS from "../useCostumeJS";
import Slider from "react-slick"; // Import Slider

const Promo = () => {
    useCustomJS();

    const [promos, setPromos] = useState([]);

    // Ambil data promo dari API
    useEffect(() => {
        axiosClient
            .get("/promos") // Ganti dengan endpoint API yang sesuai
            .then((response) => {
                setPromos(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the promo data!", error);
            });
    }, []);

    // Pengaturan Slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
    };

    return (
        <section id="promo" className="py-8 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
            <h2 className="section__title text-center">Hot Promo</h2>
                <div className="separator mx-auto mb-8"></div>

                {/* Slider untuk promo */}
                <Slider {...settings}>
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="promo_card bg-white dark:bg-darkColorLight rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                {/* Gambar di sebelah kiri */}
                                <div className="flex justify-center items-center">
                                    {promo.image_urls && promo.image_urls.length > 0 ? (
                                        <img
                                            src={promo.image_urls[0]} // Ambil gambar pertama
                                            alt={promo.name_promo}
                                            className="w-40 h-40 object-cover rounded-md shadow-md"
                                        />
                                    ) : (
                                        <img
                                            src="/default-promo-image.jpg" // Gambar default jika promo tidak memiliki gambar
                                            alt={promo.name_promo}
                                            className="w-40 h-40 object-cover rounded-md shadow-md"
                                        />
                                    )}
                                </div>

                                {/* Deskripsi di sebelah kanan */}
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 uppercase">{promo.product_name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{promo.description_promo}</p>
                                    <div className="mb-4">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Price: ${promo.price_promo}</p>
                                        <p className="text-lg font-semibold text-red-500">Discount: {promo.discount}%</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        Valid from {new Date(promo.start_promo).toLocaleDateString()} to {new Date(promo.end_promo).toLocaleDateString()}
                                    </p>
                                    <a href="#" className="text-xs text-primaryColor hover:text-primaryColorDark underline">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Promo;
