import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import AppElement from './AppElement.jsx';
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
    // {
    //     path: '/',
    //     element: <AppAdmin />,
    //     children: [
    //         {
    //             path: '/admin',
    //             element: <AdminDashboard />
    //         },
    //         // {
    //         //     path: '/internshipqueue',
    //         //     element: <InternshipQueue />
    //         // },
    //         // {
    //         //     path: '/datalogbook',
    //         //     element: <DataLogbook />
    //         // },
    //         // {
    //         //     path: '/detailsubmission/:id', // Tambahkan parameter ID ke rute
    //         //     element: <DetailSubmission />
    //         // },
    //         // {
    //         //     path: '/projectintern',
    //         //     element: <ProjectIntern />
    //         // },
    //         // {
    //         //     path: '/attend',
    //         //     element: <Attend />
    //         // },
    //         // {
    //         //     path: "*",
    //         //     element: <NotFound />
    //         // }
    //     ]
    // }
]);

export default router;
