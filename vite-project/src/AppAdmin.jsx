// import './App.css';
// import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// import SidebarAdmin from './component/SidebarAdmin';
// import HeaderAdmin from './component/HeaderAdmin';
// // import { useEffect } from 'react';
// // import { useStateContext } from './contexts/ContextProvider';

// function AppAdmin() {
//     // const { token, roles } = useStateContext();
//     // const navigate = useNavigate();

//     // useEffect(() => {
//     //     // console.log("AppAdmin - roles:", roles);
//     //     if (roles !== 'mentor') {
//     //         navigate('/');
//     //     }
//     // }, [roles, navigate]);

//     // if (!token) {
//     //     // console.log("No token found, redirecting to /welcome");
//     //     return <Navigate to="/welcome" />;
//     // }

//     return (
//         <div className="bg-neutral-100 h-screen w-screen max-w-screen-lg overflow-hidden flex flex-row">
//             <SidebarAdmin />
//             <div className="flex flex-col flex-1">
//                 <HeaderAdmin />
//                 <div className="flex-1 p-2 min-h-0 overflow-auto">
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AppAdmin;
