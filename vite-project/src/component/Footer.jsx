import React, { useEffect, useState } from "react";
import useCustomJS from "../useCostumeJS";
import axiosClient from "../axios-client";

const Footer = () => {
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
        <footer className="w-screen border-t border-secondaryColor">
            <section className="footer">
                <div className="container">
                    <ul className="grid grid-cols-1 items-start gap-5 pb-5 md:grid-cols-2 lg:grid-cols-4">
                        <li>
                            <div className="space-y-3">
                                <a href="#" className="text-4xl font-oswald uppercase">
                                    <i className="fa-solid fa-quote-left text-4xl text-secondaryColor ml-auto"></i>Mochi<span
                                        className="text-secondaryColor">Madiun</span><i
                                            className="fa-solid fa-quote-right text-4xl text-whiteColor ml-auto"></i>
                                </a>

                                <p className="text-xs capitalize">
                                    keinginan anda adalah prioritas kami. Melayani dengan sepenuh hati
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-lg uppercase font-oswald">SUPPORT</h3>
                                <a href="" className="text-xs hover:text-secondaryColor">FAQ's</a>
                                <a href="" className="text-xs hover:text-secondaryColor">Privacy Policy</a>
                                <a href="" className="text-xs hover:text-secondaryColor">Term & Condition</a>
                                <a href="" className="text-xs hover:text-secondaryColor">Contact</a>
                            </div>
                        </li>

                        <li className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">Telfon</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-phone text-lg text-secondaryColor"></i>
                                    {content.phones}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">email</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-envelope text-lg text-secondaryColor"></i>
                                    {content.emails}
                                </p>
                            </div>
                        </li>

                        <li className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">alamat toko</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-location-dot text-lg text-secondaryColor"></i>
                                    {content.alamat}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">follow us on</h3>

                                <div className="space-x-3">
                                    <a href={content.fb_links} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-facebook-f text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    </a>
                                    <a href={content.twitter_links} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-twitter text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    </a>
                                    <a href={content.ig_links} target="_blank" rel="noopener noreferrer">
                                        <i className="fa-brands fa-square-instagram text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    </a>
                                    <a href={content.tiktok_links} target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-tiktok text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div
                        className="flex flex-col items-center border-t border-primaryColorLight dark:border-darkColorLight py-5 md:flex-row md:justify-between">
                        <p className="paragraph">MochiMadiun</p>
                        <p className="paragraph">Copyright © 2024. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
