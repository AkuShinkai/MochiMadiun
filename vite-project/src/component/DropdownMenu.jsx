import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setIsSidebarOpen }) => {
    const navigate = useNavigate();

    const handleToggleSidebar = () => {
        setIsSidebarOpen(prev => !prev); // Mengubah state isSidebarOpen dari AppUserOnly
    };

    return (
        <div className="sidebar bg-darkColor text-white w-64 max-h-screen rounded-xl mt-24">
            <div className="sidebar-menu">
                <button
                    className="flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left"
                    onClick={() => navigate('/profile')}
                >
                    <i className="fa-solid fa-user"></i>
                    <span>Profile</span>
                </button>
                <button
                    className="flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left"
                    onClick={() => navigate('/orders')}
                >
                    <i className="fa-solid fa-list"></i>
                    <span>Riwayat Pesanan</span>
                </button>
                <button
                    className="flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left"
                    onClick={() => navigate('/topup')}
                >
                    <i className="fa-solid fa-wallet"></i>
                    <span>Top Up</span>
                </button>
                <button
                    className="flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left"
                    onClick={() => navigate('/upgrade')}
                >
                    <i className="fa-solid fa-arrow-up"></i>
                    <span>Upgrade Akun</span>
                </button>
                <button
                    className="flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left"
                    onClick={() => navigate('/logout')}
                >
                    <i className="fa-solid fa-sign-out-alt"></i>
                    <span>Log Out</span>
                </button>
            </div>
            {/* Tombol untuk memunculkan dropdown menu saat sidebar tertutup */}
            <button
                className={`flex items-center gap-3 w-full py-3 px-4 hover:bg-secondaryColor text-left ${!isSidebarOpen ? 'lg:hidden' : 'hidden'}`}
                onClick={handleToggleSidebar}
            >
                <i className="fa-solid fa-bars"></i>
                <span>Menu</span>
            </button>
        </div>
    );
};

export default Sidebar;
