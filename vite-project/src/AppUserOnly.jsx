import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Sidebar from './component/Sidebar';
import DropdownMenu from './component/DropdownMenu';

function AppUserOnly() {
    const { token, roles } = useStateContext();
    const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk mengontrol dropdown menu
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div className="">
            <Navbar />
            {/* Tombol menu dropdown saat sidebar tertutup */}
            {!isSidebarOpen && (
                <div className="lg:hidden sm:top-40 absolute top-16 right-0">
                    <DropdownMenu isOpen={dropdownOpen} onClose={closeDropdown} />
                </div>
            )}
            <div className="flex container">
                <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-1"> {/* Ini untuk memberikan padding pada content */}
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AppUserOnly;
