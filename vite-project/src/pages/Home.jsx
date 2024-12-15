import React, { useEffect, useState } from "react";
import useCustomJS from "../useCostumeJS";
import axiosClient from "../axios-client";
import home from "../assets/Dinada.png";

const Home = () => {
    useCustomJS();

    const [content, setContent] = useState(null);  // Menyimpan satu konten
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContent = async () => {
        try {
            const response = await axiosClient.get('/content');
            setContent(response.data);  // Mengambil satu konten
            // console.log(response.data)
        } catch (error) {
            setError('Failed to fetch content.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();  // Fetch konten saat pertama kali render
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!content) {
        return <div>No content available</div>;
    }

    return (
        <section id="home">
            <div className="container flex flex-col items-center gap-10 md:flex-row">
                <div className="mx-auto md:basis-1/2 lg:basis-2/5 animate-movingY">
                    <img src={home} alt="home image" className="home__image w-60 md:w-full"/>
                </div>

                <div className="home__content text-center md:basis-1/2 md:text-start lg:basis-3/5">
                    <h1 className="home__title">{content.headers}</h1>
                    <div className="separator mx-auto md:mx-0"></div>
                    <p className="capitalize text-justify">{content.header_decs}</p>
                    {/* <p className="paragraph capitalize">menerima jual beli HP/laptop bekas/baru. service HP dan laptop. kredit HP dan laptop.</p> */}
                    <div className="text-base flex items-center justify-center gap-4 py-10 md:justify-start md:gap-20">
                        <div className="text-center">
                            <i
                                className="fa-solid fa-star text-secondaryColor text-4xl hover:-translate-y-1 ease-in duration-200"></i>
                            <br />
                            Berkualitas
                        </div>

                        <div className="text-center">
                            <i className="fa-solid fa-heart text-secondaryColor text-4xl hover:-translate-y-1 ease-in duration-200"></i>
                            <br />
                            Pelayanan Ramah
                        </div>

                        <div className="text-center">
                            <i
                                className="fa-solid fa-circle-check text-secondaryColor text-4xl hover:-translate-y-1 ease-in duration-200"></i>
                            <br />
                            Terpercaya
                        </div>
                    </div>

                    <a href="#" className="btn btn-primary">Pelajari Lebih Lanjut</a>
                </div>
            </div>
        </section>
    );
};

export default Home;
