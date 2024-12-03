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
        centerMode: true, // Untuk menampilkan satu slide di tengah dan menyesuaikan sisa konten
        centerPadding: "0", // Menghilangkan padding antar slide
        focusOnSelect: true, // Menjaga agar slide dipilih saat diklik
    };

    return (
        <section id="promo" className="py-8">
            <div className="container">
                <h2 className="section__title text-center">Hot Promo</h2>
                <div className="separator mx-auto"></div>

                {/* Slider untuk promo */}
                <Slider {...settings}>
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="promo_card bg-primaryColorLight dark:bg-darkColorLight flex items-center p-4 rounded-lg mb-0 max-w-full mx-auto"
                        >
                            {/* Gambar di sebelah kiri */}
                            <div className="flex-shrink-0 mr-4">
                                {promo.image_urls && promo.image_urls.length > 0 ? (
                                    <img
                                        src={promo.image_urls[0]} // Ambil gambar pertama
                                        alt={promo.name_promo}
                                        className="w-24 h-24 object-cover rounded-md" // Ukuran gambar lebih besar
                                    />
                                ) : (
                                    <img
                                        src="/default-promo-image.jpg" // Gambar default jika promo tidak memiliki gambar
                                        alt={promo.name_promo}
                                        className="w-24 h-24 object-cover rounded-md" // Ukuran gambar lebih besar
                                    />
                                )}
                            </div>

                            {/* Deskripsi di sebelah kanan */}
                            <div className="flex flex-col justify-between">
                                <h3 className="text-lg font-bold mb-1 uppercase">{promo.product_name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{promo.description_promo}</p>
                                <p className="text-lg font-semibold mb-1">Price: ${promo.price_promo}</p>
                                <p className="text-lg text-red-500 font-semibold mb-1">Discount: {promo.discount}%</p>
                                <p className="text-sm text-secondaryColor">
                                    Valid from {new Date(promo.start_promo).toLocaleDateString()} to {new Date(promo.end_promo).toLocaleDateString()}
                                </p>
                                <a href="#" className="text-sm text-primaryColor underline mt-2">Read More</a>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default Promo;