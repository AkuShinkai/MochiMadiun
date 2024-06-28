import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import AppElement from './AppElement.jsx';
import AppAdmin from './AppAdmin.jsx';
import AppAuth from './AppAuth.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AppTokenOnly from './AppUserOnly.jsx';
import Profile from './pages/Profile.jsx';
import EditProfil from './pages/EditProfile.jsx';
import AppUserOnly from './AppUserOnly.jsx';
import Items from './pages/Items.jsx';
import AddItems from './AdminPages/AddItems.jsx';
import ItemList from './AdminPages/ItemList.jsx';
import DetailItem from './pages/DetailItem.jsx';
import OrderPage from './pages/OrderPage.jsx';


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
            {
                path: '/register',
                element: <Register />
            },
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
            {
                path: '/admin',
                element: <h2>Admin Home</h2>
            },
            {
                path: '/itemlist',
                element: <ItemList />
            },
            {
                path: '/additems',
                element: <AddItems />
            },
            // {
            //     path:'/adminprofile',
            //     element: <AdminProfile />
            // }
        ],
    },
    {
        path: '/',
        element: <AppUserOnly />,
        children: [
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/editprofile',
                element: <EditProfil />
            }
        ],
    },
]);

export default router;
