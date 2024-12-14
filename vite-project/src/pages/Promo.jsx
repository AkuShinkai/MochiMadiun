import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import useCustomJS from "../useCostumeJS";
import Slider from "react-slick";
// Impor file CSS kustom
import "../assets/styles/slick-custom.css";

const Promo = () => {
    useCustomJS();

    const [promos, setPromos] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Ambil data promo dan produk yang tersedia
        const fetchPromosAndItems = async () => {
            try {
                const promosResponse = await axiosClient.get("/promos");
                const productsResponse = await axiosClient.get("/products");
                setPromos(promosResponse.data.filter(promo => promo.status === "available"));
                setItems(productsResponse.data);
            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data promo dan produk!", error);
            }
        };

        fetchPromosAndItems();
    }, []);

    const settings = {
        dots: true,
        infinite: promos.length > 1, // Harus lebih dari 1 item untuk loop
        speed: 500,
        slidesToShow: promos.length === 1 ? 1 : 1,
        slidesToScroll: 1,
        autoplay: true, // Selalu aktifkan autoplay untuk testing
        autoplaySpeed: 2000, // Ubah kecepatan autoplay menjadi 2 detik
        arrows: false,
        centerMode: true,
        centerPadding: "0",
        focusOnSelect: true,
    };

    // Fungsi untuk menghitung harga diskon
    const getDiscountedPrice = (promo, item) => {
        if (promo && promo.id_product === item.id) {
            const discount = promo.discount;
            const priceBeforeDiscount = item.price;
            const discountedPrice = priceBeforeDiscount - (priceBeforeDiscount * (discount / 100));

            return { priceBeforeDiscount, discountedPrice, discount };
        }
        return null;
    };

    return (
        <section id="promo" className="py-8 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="section__title text-center">Promo Menarik</h2>
                <div className="separator mx-auto mb-8"></div>

                {/* Slider untuk promo */}
                <Slider {...settings}>
                    {promos.map((promo) => {
                        const associatedItem = items.find(item => item.id === promo.id_product);
                        const discountInfo = associatedItem ? getDiscountedPrice(promo, associatedItem) : null;

                        return (
                            <Link
                                key={promo.id}
                                to={`/detailitem/${promo.id_product}`}
                                className="promo_card bg-gray-50 dark:bg-darkColorLight rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                    <div className="flex justify-center items-center">
                                        {promo.image_urls && promo.image_urls.length > 0 ? (
                                            <img
                                                src={promo.image_urls[0]}
                                                alt={promo.name_promo}
                                                className="w-40 h-40 object-cover rounded-md shadow-md"
                                            />
                                        ) : (
                                            <img
                                                src="/default-promo-image.jpg"
                                                alt={promo.name_promo}
                                                className="w-40 h-40 object-cover rounded-md shadow-md"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 uppercase">
                                            {promo.product_name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                            {promo.description_promo}
                                        </p>
                                        <div className="mb-4">
                                            {discountInfo ? (
                                                <>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        Harga: <span className="line-through text-gray-400">Rp{discountInfo.priceBeforeDiscount}</span>
                                                    </p>
                                                    <p className="text-lg font-semibold text-red-500">
                                                        Diskon: {discountInfo.discount}%
                                                    </p>
                                                    <p className="text-lg font-semibold text-green-500">
                                                        Harga Promo: Rp{discountInfo.discountedPrice.toFixed(2)}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                    Harga: Rp{associatedItem ? associatedItem.price : "N/A"}
                                                </p>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                            Berlaku dari{" "}
                                            {new Date(promo.start_promo).toLocaleDateString()} sampai{" "}
                                            {new Date(promo.end_promo).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </Slider>
            </div>
        </section>
    );
};

export default Promo;
