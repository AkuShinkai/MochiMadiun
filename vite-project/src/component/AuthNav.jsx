import React from "react";
import useCustomJS from "../useCostumeJS";
import { useLocation } from "react-router-dom";

const AuthNav = () => {
    useCustomJS();

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <header className="bg-primaryColor dark:bg-darkColor fixed top-0 left-0 w-full z-50" id="header">
            <nav className="container relative h-14 flex justify-between items-center">
                <div>
                    <a href="/" className="text-2xl uppercase  font-oswald">
                        Mochi<span className="text-secondaryColor">Madiun</span>
                    </a>
                </div>

                <div
                    className="hidden absolute top-0 left-0 w-full py-14 bg-primaryColor dark:bg-darkColor border-b border-secondaryColor md:block md:static md:py-0 md:border-none md:w-auto md:ml-auto"
                    id="nav-menu">
                    <ul className="flex flex-col text-center gap-5 md:flex-row">
                        <li className={currentPath === '/login' ? 'active-class' : ''}>
                            <a
                                href="/login"
                                className={`hover:text-secondaryColor ease-in duration-200 ${currentPath === '/login' ? 'active-class' : ''
                                    }`}
                            >
                                Login
                            </a>
                        </li>
                        {/* <li className={currentPath === '/register' ? 'active-class' : ''}>
                            <a
                                href="/register"
                                className={`hover:text-secondaryColor ease-in duration-200 ${currentPath === '/register' ? 'active-class' : ''
                                    }`}
                            >
                                Register
                            </a>
                        </li> */}
                    </ul>

                    <div className="absolute top-[0.7rem] right-4 text-2xl cursor-pointer md:hidden" id="nav-close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    {/* <i className="ri-moon-line cursor-pointer ml-4 text-xl" id="theme-toggle"></i> */}

                    <div className="md:hidden" id="hamburger">
                        <i className="ri-menu-2-line cursor-pointer text-xl"></i>
                    </div>
                </div>
            </nav>
        </header>

    );
};

export default AuthNav;
