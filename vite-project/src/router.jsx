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
// import AppAdmin from './AppAdmin.jsx';
// import AdminDashboard from './AdminPages/AdminDashboard.jsx';

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
        path: '/admin',
        element: <AppAdmin />,
        children: [
            {
                path: '',
                element: <h2>Admin Home</h2>
            },
        ],
    },
]);

export default router;
