import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './pages/Home';

import About from './pages/About';
import Contact from './pages/Contact';
import News from './pages/Promo';
import Items from './pages/Items';

import useCustomJS from './useCostumeJS';

function App() {
    useCustomJS();
    return (
        <div className="w-screen max-w-full overflow-x-hidden pt-5">
            <Navbar />
            <div className="w-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
