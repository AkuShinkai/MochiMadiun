// src/pages/Admin.jsx
import React, { useEffect } from 'react';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from './component/AdminNavbar';
import useCustomJS from './useCostumeJS';
import Footer from './component/Footer';
import { useStateContext } from './contexts/ContextProvider';

const AppAdmin = () => {
    useCustomJS();
    const { token, roles } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AppAdmin - roles:", roles);
        if (roles !== 'admin') {
            navigate('/');
        }
    }, [roles, navigate]);

    if (!token) {
        // console.log("No token found, redirecting to /");
        return <Navigate to="/" />;
    }

    return (
        <div className="w-screen max-w-full overflow-x-hidden py-5">
            <AdminNavbar />
            <div className="container mx-auto p-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AppAdmin;
