// import aboutImage from '../assets/Android WIth Github.png';
import React from "react";
import useCustomJS from "../useCostumeJS";

function About() {
    useCustomJS();
    return (
        <section id="about">
            <div className="container flex flex-col gap-10 md:flex-row">
                <div className="about__img flex-1">
                    <img src="src/assets/Android WIth Github.png" alt="about image" className="rounded-lg" />
                </div>

                <div className="about__content flex-1">
                    <h2 className="section__title uppercase">Menyajikan Informasi Setajam Mata Pena, Mengungkap Kebenaran Seiring Waktu.</h2>
                    <div className="separator"></div>
                    <p className="paragraph">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                        dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
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
