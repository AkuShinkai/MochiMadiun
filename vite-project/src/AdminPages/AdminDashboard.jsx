import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdPeople } from "react-icons/io";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        allMentor: 0,
        allIntern: 0
    });
    const [activeBox, setActiveBox] = useState(null);
    const [mentorDetails, setMentorDetails] = useState([]);
    const [internDetails, setInternDetails] = useState([]);
    const navigate = useNavigate();

    const handleBoxClick = (boxId) => {
        setActiveBox(boxId);
    };

    const handleAddMentorClick = () => {
        navigate('/AddMentor');
    };

    const handleEditMentor = (mentorId) => {
        navigate(`/edit-mentor/${mentorId}`);
    };



    const handleEditIntern = (internId) => {
        navigate(`/edit-intern/${internId}`);
    };


    const boxStyle = (boxId) => (
        `flex items-center p-4 rounded-lg shadow-inner w-1/3 cursor-pointer ${activeBox === boxId ? 'bg-blue-200' : 'bg-gray-100'}`
    );

    return (
        <div className='p-6 m-2 ms-5 bg-white rounded-xl shadow-md overflow-auto'>
            <div className='font-bold text-left'>
                <h1 className='text-3xl text-orange-400 mb-6'>WELCOME ADMIN</h1>
            </div>
            <div className='flex justify-between space-x-4'>
                <div onClick={() => handleBoxClick(1)} className={boxStyle(1)}>
                    <div className='bg-orange-300 p-3 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className='w-6 h-6'>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M9 6h6m2 6H7m2 6h6" />
                        </svg>
                    </div>
                    <div className='ml-4'>
                        <p className='text-xl'>{dashboardData.allMentor}</p>
                        <p className='text-gray-600'>All Mentor</p>
                    </div>
                </div>
                <div onClick={() => handleBoxClick(2)} className={boxStyle(2)}>
                    <div className='bg-orange-300 p-3 rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" className='w-6 h-6'>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A7.975 7.975 0 0112 15a7.975 7.975 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6-5a2 2 0 100-4 2 2 0 000 4zm-2 2v5.586a1 1 0 01-.293.707L15 19l-1.293-1.293a1 1 0 00-.707-.293H6a1 1 0 00-.707.293L4 19l-1.707-1.707A1 1 0 012 16.586V11h-.293a1 1 0 01-.707-.293L0 9l2-2h.293a1 1 0 01.707-.293H4a1 1 0 00.707-.293L6 5.414 7.293 6.707A1 1 0 018 7h8a1 1 0 00.707-.293L18 5.414 19.293 6.707A1 1 0 0020 7h1.586a1 1 0 01.707.293L23 9l-2 2h-.293a1 1 0 01-.707.293H20v5.586a1 1 0 01-.293.707L18 19l-1.293-1.293a1 1 0 00-.707-.293H15z" />
                        </svg>
                    </div>
                    <div className='ml-4'>
                        <p className='text-xl'>{dashboardData.allIntern}</p>
                        <p className='text-gray-600'>All Internship</p>
                    </div>
                </div>
            </div>
            {activeBox === 1 && (
                <div className='mt-6 p-4 bg-gray-100 rounded-lg shadow-md'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-2xl font-bold'>All Mentor Details</h2>
                        <button onClick={handleAddMentorClick} className='bg-orange-400 hover:bg-orange-700 text-white p-2 rounded-lg'>
                            Add Mentor
                        </button>
                    </div>
                    <table className='w-full text-left'>
                        <thead>
                            <tr>
                                <th className='border px-4 py-2'>ID</th>
                                <th className='border px-4 py-2'>Name</th>
                                <th className='border px-4 py-2'>Position</th>
                                <th className='border px-4 py-2'>Status</th>
                                <th className='border px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentorDetails.map((mentor) => (
                                <tr key={mentor.id}>
                                    <td className='border px-4 py-2'>{mentor.id}</td>
                                    <td className='border px-4 py-2'>{mentor.name}</td>
                                    <td className='border px-4 py-2'>{mentor.position}</td>
                                    <td className='border px-4 py-2'>{mentor.status}</td>
                                    <td className='border px-4 py-2'>
                                        <button onClick={() => handleEditMentor(mentor.id)} className='text-blue-500 mr-2'>Edit</button>
                                        <button onClick={() => handleDeleteMentor(mentor.id)} className='text-red-500'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {activeBox === 2 && (
                <div className='mt-6 p-4 bg-gray-100 rounded-lg shadow-md'>
                    <h2 className='text-2xl font-bold mb-2'>All Internship Details</h2>
                    <table className='w-full text-left'>
                        <thead>
                            <tr>
                                <th className='border px-4 py-2'>ID</th>
                                <th className='border px-4 py-2'>Name</th>
                                <th className='border px-4 py-2'>School From</th>
                                <th className='border px-4 py-2'>Status</th>
                                <th className='border px-4 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {internDetails.map((intern) => (
                                <tr key={intern.id}>
                                    <td className='border px-4 py-2'>{intern.id}</td>
                                    <td className='border px-4 py-2'>{intern.name}</td>
                                    <td className='border px-4 py-2'>{intern.asal}</td>
                                    <td className='border px-4 py-2'>{intern.status}</td>
                                    <td className='border px-4 py-2'>
                                        <button onClick={() => handleEditIntern(intern.id)} className='text-blue-500 mr-2'>Edit</button>
                                        <button onClick={() => handleDeleteIntern(intern.id)} className='text-red-500'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
