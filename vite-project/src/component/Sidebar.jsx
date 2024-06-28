import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logout from '../pages/Logout';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar
    const [activeLink, setActiveLink] = useState(''); // State untuk menyimpan link aktif
    const [showModal, setShowModal] = useState(false);

    // Ketika lokasi berubah, perbarui activeLink
    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`sidebar bg-darkColor text-white w-64 max-h-screen rounded-xl mt-24 mb-7 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div className="sidebar-menu">
                <button
                    className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left ${activeLink === '/profile' ? 'bg-yellow-600 rounded-xl' : ''}`}
                    onClick={() => navigate('/profile')}
                >
                    <i className="fa-solid fa-user"></i>
                    <span>Profile</span>
                </button>
                <button
                    className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left ${activeLink === '/orders' ? 'bg-yellow-600 rounded-xl' : ''}`}
                    onClick={() => navigate('/orders')}
                >
                    <i className="fa-solid fa-list"></i>
                    <span>Riwayat Pesanan</span>
                </button>
                <button
                    className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left ${activeLink === '/topup' ? 'bg-yellow-600 rounded-xl' : ''}`}
                    onClick={() => navigate('/topup')}
                >
                    <i className="fa-solid fa-wallet"></i>
                    <span>Top Up</span>
                </button>
                <button
                    className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left ${activeLink === '/upgrade' ? 'bg-yellow-600 rounded-xl' : ''}`}
                    onClick={() => navigate('/upgrade')}
                >
                    <i className="fa-solid fa-arrow-up"></i>
                    <span>Upgrade Akun</span>
                </button>
            </div>
            <div className=''>
                <button
                    className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-red-500 text-left hover:rounded-xl`}
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <span>Log Out</span>
                </button>
                {showModal && <Logout setOpen={setShowModal} />}
            </div>
        </div>
    );
};

export default Sidebar;
