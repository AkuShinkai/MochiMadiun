// src/pages/Admin.jsx
import React from 'react';

import { Outlet } from 'react-router-dom';
import AdminNavbar from './component/AdminNavbar';
import useCustomJS from './useCostumeJS';
import Footer from './component/Footer';

const AppAdmin = () => {
    useCustomJS();
    return (
        <div className="w-screen max-w-full overflow-x-hidden py-5">
            <AdminNavbar />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppAdmin;
