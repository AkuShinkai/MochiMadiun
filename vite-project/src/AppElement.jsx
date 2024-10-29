import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';

import About from './pages/About';
import Contact from './pages/Contact';
import Items from './pages/Items';

import useCustomJS from './useCostumeJS';
import Promo from './pages/Promo';

function AppElement() {
    useCustomJS();
    return (
        <div className="w-screen">
            <Home />
            <Promo />
            <About />
            <Items />
            <Contact />
        </div>
    );
}

export default AppElement;
