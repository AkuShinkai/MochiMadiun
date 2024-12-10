import React from "react";
import useCustomJS from "../useCostumeJS";
import { useStateContext } from "../contexts/ContextProvider"; // Import useStateContext

const Navbar = () => {
    useCustomJS();
    const { token, user } = useStateContext(); // Gunakan konteks untuk mendapatkan token dan data pengguna
    const isLoggedIn = !!token; // Cek apakah pengguna sudah login

    const handleRedirectToRoot = (hash) => {
        if (window.location.pathname !== "/") {
            // Redirect ke root dan tambahkan hash
            window.location.href = `/${hash}`;
        } else {
            // Scroll ke bagian tertentu di halaman root
            document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="bg-primaryColor dark:bg-darkColor fixed top-0 left-0 w-full z-50" id="header">
            <nav className="container relative h-14 flex justify-between items-center">
                <div>
                    <a href="/" className="text-2xl uppercase font-oswald">
                        Mochi Madiun<span className="text-secondaryColor"> by Nada</span>
                    </a>
                </div>

                <div
                    className="hidden absolute top-0 left-0 w-full items-center py-14 bg-primaryColor dark:bg-darkColor border-b border-secondaryColor md:block md:static md:py-0 md:border-none md:w-auto md:ml-auto"
                    id="nav-menu">
                    <ul className="flex flex-col text-center gap-5 md:flex-row">
                        <li>
                            <a
                                href="#home"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRedirectToRoot("#home");
                                }}
                                className="nav__link hover:text-secondaryColor ease-in duration-200">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#promo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRedirectToRoot("#promo");
                                }}
                                className="nav__link hover:text-secondaryColor ease-in duration-200">
                                Promo
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRedirectToRoot("#about");
                                }}
                                className="nav__link hover:text-secondaryColor ease-in duration-200">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#more"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRedirectToRoot("#more");
                                }}
                                className="nav__link hover:text-secondaryColor ease-in duration-200">
                                More
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRedirectToRoot("#contact");
                                }}
                                className="nav__link hover:text-secondaryColor ease-in duration-200">
                                Contact
                            </a>
                        </li>
                    </ul>

                    <div className="absolute top-[0.7rem] right-4 text-2xl cursor-pointer md:hidden" id="nav-close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {isLoggedIn && (
                        <div className="flex items-center">
                            {user.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full cursor-pointer ml-4 ring-2 ring-orange-300"
                                    onClick={() => (window.location.href = "/admin")}
                                />
                            ) : (
                                <button
                                    className="fa-solid fa-user cursor-pointer hover:text-secondaryColor ml-4 text-xl"
                                    onClick={() => (window.location.href = "/admin")}
                                ></button>
                            )}
                        </div>
                    )}

                    <div className="md:hidden" id="hamburger">
                        <i className="ri-menu-2-line cursor-pointer text-xl"></i>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
