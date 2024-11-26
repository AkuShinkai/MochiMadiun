import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import useCustomJS from "../useCostumeJS";

function Promo() {
    useCustomJS();

    const [promos, setPromos] = useState([]);

    // Ambil data promo dari API
    useEffect(() => {
        axiosClient.get("/promos") // Ganti dengan endpoint API yang sesuai
            .then((response) => {
                setPromos(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the promo data!", error);
            });
    }, []);

    return (
        <section id="promo" className="py-16">
            <div className="container">
                <h2 className="section__title text-center">Hot Promo</h2>
                <div className="separator mx-auto"></div>

                {/* Gunakan grid untuk layout promo */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="promo__card bg-primaryColorLight dark:bg-darkColorLight flex flex-col p-5 rounded-lg md:flex-row md:items-center lg:flex-row-reverse lg:flex-1 font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn"
                        >
                            {/* Cek apakah promo memiliki gambar */}
                            {promo.image_urls && promo.image_urls.length > 0 ? (
                                <img
                                    src={promo.image_urls[0]} // Ambil gambar pertama
                                    alt={promo.name_promo}
                                    className="w-40 mx-auto hover:animate-movingY md:mx-5 transition-transform duration-300"
                                />
                            ) : (
                                <img
                                    src="/default-promo-image.jpg" // Gambar default jika promo tidak memiliki gambar
                                    alt={promo.name_promo}
                                    className="w-40 mx-auto hover:animate-movingY md:mx-5 transition-transform duration-300"
                                />
                            )}

                            <div className="space-y-2 pt-5 md:pt-0">
                                <p className="text-xs text-secondaryColor">Promo: {promo.name_promo}</p>
                                <h3 className="card__title uppercase">{promo.product_name}</h3>
                                <p className="paragraph">{promo.description_promo}</p>
                                <p className="text-sm font-semibold">Price: ${promo.price_promo}</p>
                                <p className="text-sm text-red-500">Discount: {promo.discount}%</p>
                                <p className="text-xs text-secondaryColor">
                                    Valid from {new Date(promo.start_promo).toLocaleDateString()} to {new Date(promo.end_promo).toLocaleDateString()}
                                </p>
                                <a href="#" className="text-xs text-secondaryColor">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Promo;
