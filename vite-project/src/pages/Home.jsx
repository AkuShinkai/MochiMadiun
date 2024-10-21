import React from "react";
import useCustomJS from "../useCostumeJS";

const Home = () => {
    useCustomJS();
    return (
        <section id="home">
            <div className="container flex flex-col items-center gap-10 md:flex-row">
                <div className="mx-auto md:basis-1/2 lg:basis-2/5 animate-movingY">
                    <img src="/src/assets/[LT]-Dinada.png" alt="home image" className="home__image w-60 md:w-full"/>
                </div>

                <div className="home__content text-center md:basis-1/2 md:text-start lg:basis-3/5">
                    <h1 className="home__title">Mochi Madiun by Nada</h1>
                    <div className="separator mx-auto md:mx-0"></div>
                    <p className=" capitalize">solusi permasalahan teknologi anda. mulai dari Gadget, elektronik, aksesoris dan lain - lain.</p>
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
