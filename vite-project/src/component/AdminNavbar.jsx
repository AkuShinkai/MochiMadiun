// src/components/AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useCustomJS from '../useCostumeJS';

const AdminNavbar = () => {
    useCustomJS();
    return (
        <header className="bg-primaryColor dark:bg-darkColor fixed top-0 left-0 w-full z-50" id="header">
            <nav className="container relative h-14 flex justify-between items-center">
                <div>
                    <a href="#" className="text-2xl uppercase  font-oswald">
                    Admin<span className="text-secondaryColor">Panel</span>
                    </a>
                </div>

                <div
                    className="hidden absolute top-0 left-0 w-full py-14 bg-primaryColor dark:bg-darkColor border-b border-secondaryColor md:block md:static md:py-0 md:border-none md:w-auto md:ml-auto"
                    id="nav-menu">
                    <ul className="flex flex-col text-center gap-5 md:flex-row">
                        <li>
                            <a href="#dashboard"
                                className="nav__link text-secondaryColor hover:text-secondaryColor ease-in duration-200">Dashboard</a>
                        </li>
                        <li>
                            <a href="#items" className="nav__link hover:text-secondaryColor ease-in duration-200">Items</a>
                        </li>
                        <li>
                            <a href="#users" className="nav__link hover:text-secondaryColor ease-in duration-200">Users</a>
                        </li>
                        <li>
                            <a href="#purchaselist" className="nav__link hover:text-secondaryColor ease-in duration-200">Purchases</a>
                        </li>
                    </ul>

                    <div className="absolute top-[0.7rem] right-4 text-2xl cursor-pointer md:hidden" id="nav-close">
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <i className="ri-moon-line cursor-pointer ml-4 text-xl" id="theme-toggle"></i>

                    <div className="md:hidden" id="hamburger">
                        <i className="ri-menu-2-line cursor-pointer text-xl"></i>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default AdminNavbar;
