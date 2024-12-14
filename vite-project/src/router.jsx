import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import AppElement from './AppElement.jsx';
import AppAdmin from './AppAdmin.jsx';
import AppAuth from './AppAuth.jsx';
import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
import AddItems from './AdminPages/AddItems.jsx';
import ItemList from './AdminPages/ItemList.jsx';
import DetailItem from './pages/DetailItem.jsx';
import OrderPage from './pages/OrderPage.jsx';
import AddPromo from './AdminPages/AddPromo.jsx';
import PromoList from './AdminPages/PromoList.jsx';
import UserList from './AdminPages/UserList.jsx';
import Cart from './pages/Cart.jsx';
import Contents from './AdminPages/Content.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <AppElement />
            },
            {
                path: '/detailitem/:id',
                element: <DetailItem />
            },
            {
                path: "/order/:id",
                element: <OrderPage />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '/',
        element: <AppAuth />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            // {
            //     path: '/register',
            //     element: <Register />
            // },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '/',
        element: <AppAdmin />,
        children: [
            // {
            //     path: '/admin',
            //     element: <h2>Admin Home</h2>
            // },
            {
                path: '/admin',
                element: <ItemList />
            },
            {
                path: '/additems',
                element: <AddItems />
            },
            {
                path: '/promo',
                element: <PromoList />
            },
            {
                path: '/addpromo',
                element: <AddPromo />
            },
            {
                path: '/adminlist',
                element: <UserList />
            },
            {
                path: '/content',
                element: <Contents />
            }
            // {
            //     path: '/detailitems',
            //     element: <DetailItem/>
            // }
            // {
            //     path:'/adminprofile',
            //     element: <AdminProfile />
            // }
        ],
    }
]);

export default router;
