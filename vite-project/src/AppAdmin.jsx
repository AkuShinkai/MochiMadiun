// src/pages/Admin.jsx
import React, { useEffect } from 'react';

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AdminNavbar from './component/AdminNavbar';
import useCustomJS from './useCostumeJS';
import Footer from './component/Footer';
import { useStateContext } from './contexts/ContextProvider';
import SidebarAdmin from './component/SidebarAdmin';
import Header from './component/NavbarAdmin';

const AppAdmin = () => {
    useCustomJS();
    const { token, roles } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AppAdmin - roles:", roles);
        if (roles !== 'admin' && roles !== 'super admin') {
            navigate('/');
        }
    }, [roles, navigate]);

    if (!token) {
        // console.log("No token found, redirecting to /");
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
            <SidebarAdmin />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-2 min-h-0 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppAdmin;
