import React from "react";
import useCustomJS from "../useCostumeJS";
import { useStateContext } from "../contexts/ContextProvider"; // Import useStateContext

const Navbar = () => {
    useCustomJS();
    const { token, user, roles } = useStateContext(); // Gunakan konteks untuk mendapatkan token dan data pengguna
    const isLoggedIn = !!token; // Cek apakah pengguna sudah login

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
                            <a href="#home" className="nav__link hover:text-secondaryColor ease-in duration-200">Home</a>
                        </li>
                        <li>
                            <a href="#promo" className="nav__link hover:text-secondaryColor ease-in duration-200">Promo</a>
                        </li>
                        <li>
                            <a href="#about" className="nav__link hover:text-secondaryColor ease-in duration-200">About Us</a>
                        </li>
                        <li>
                            <a href="#more" className="nav__link hover:text-secondaryColor ease-in duration-200">More</a>
                        </li>
                        <li>
                            <a href="#contact" className="nav__link hover:text-secondaryColor ease-in duration-200">Contact</a>
                        </li>
                    </ul>

                    <div className="absolute top-[0.7rem] right-4 text-2xl cursor-pointer md:hidden" id="nav-close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            {user.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full cursor-pointer ml-4 ring-2 ring-orange-300"
                                    onClick={() => window.location.href = '/profile'}
                                />
                            ) : (
                                <button
                                    className="fa-solid fa-user cursor-pointer hover:text-secondaryColor ml-4 text-xl"
                                    onClick={() => window.location.href = '/profile'}
                                ></button>
                            )}
                        </div>
                    ) : (
                        <a className="ri-door-open-fill cursor-pointer hover:text-secondaryColor ml-4 text-xl" href="/login"></a>
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
