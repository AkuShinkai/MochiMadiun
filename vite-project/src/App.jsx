import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import useCustomJS from './useCostumeJS';
import { useStateContext } from './contexts/ContextProvider';

function App() {
    useCustomJS();
    // const { token, roles } = useStateContext();
    // const navigate = useNavigate();

    // console.log(token)
    // console.log(roles)

    return (
        <div className="">
            <Navbar />
            <div className="">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
