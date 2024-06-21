import React from "react";
import useCustomJS from "../useCostumeJS";

const Footer = () => {
    useCustomJS();
    return (
        <footer className="w-screen">
            <section className="footer">
                <div className="container">
                    <ul className="grid grid-cols-1 items-start gap-5 pb-5 md:grid-cols-2 lg:grid-cols-4">
                        <li>
                            <div className="space-y-3">
                                <a href="#" className="text-4xl font-oswald uppercase">
                                    <i className="fa-solid fa-quote-left text-4xl text-secondaryColor ml-auto"></i>F₂<span
                                        className="text-secondaryColor">group</span><i
                                            className="fa-solid fa-quote-right text-4xl text-whiteColor ml-auto"></i>
                                </a>

                                <p className="text-xs capitalize">
                                    keinginan anda adalah prioritas kami. dengan menyediakan gadget terkini dan berkualitas.
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
                                <h3 className="text-lg uppercase font-oswald">phone</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-phone text-lg text-secondaryColor"></i>
                                    +62 857 0258 894
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">email</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-envelope text-lg text-secondaryColor"></i>
                                    whywelose272@gmail.com
                                </p>
                            </div>
                        </li>

                        <li className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">address</h3>

                                <p className="flex items-center gap-2 text-xs">
                                    <i className="fa-solid fa-location-dot text-lg text-secondaryColor"></i>
                                    Athanor No 32
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg uppercase font-oswald">follow us on</h3>

                                <div className="space-x-3">
                                    <i
                                        className="fa-brands fa-facebook-f text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    <i
                                        className="fa-brands fa-twitter text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    <i
                                        className="fa-brands fa-square-instagram text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                    <i
                                        className="fa-brands fa-square-github text-lg cursor-pointer text-secondaryColor hover:-translate-y-1 ease-in duration-200"></i>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div
                        className="flex flex-col items-center border-t border-primaryColorLight dark:border-darkColorLight py-5 md:flex-row md:justify-between">
                        <p className="paragraph">F2Group</p>
                        <p className="paragraph">Copyright © 2024. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
