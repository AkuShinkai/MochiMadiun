import React, { useEffect, useState } from "react";
import useCustomJS from "../useCostumeJS";
import axiosClient from "../axios-client";

function About() {
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
        <section id="about">
            <div className="container flex flex-col gap-10 md:flex-row">
                <div className="about__img flex-1">
                    <img src="src/assets/Android WIth Github.png" alt="about image" className="rounded-lg" />
                </div>

                <div className="about__content flex-1">
                    <h2 className="section__title uppercase">{content.abouts}</h2>
                    <div className="separator"></div>
                    <p className="paragraph text-justify">{content.about_decs}</p>
                    <ul className="grid grid-cols-3 py-5 space-y-1">
                        <li className="text-xs text-paragraphColor">
                            <i className="fa-solid fa-check text-secondaryColor pr-2"></i>
                            Terpercaya
                        </li>
                        <li className="text-xs text-paragraphColor">
                            <i className="fa-solid fa-check text-secondaryColor pr-2"></i>
                            Up To Date
                        </li>
                        <li className="text-xs text-paragraphColor">
                            <i className="fa-solid fa-check text-secondaryColor pr-2"></i>
                            Berita Terkini
                        </li>
                    </ul>
                    <a href="#about" className="btn btn-primary">About us</a>
                </div>
            </div>
        </section>
    );
}

export default About;
