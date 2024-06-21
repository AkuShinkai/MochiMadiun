import React, { useState, useEffect } from 'react';
import { HiCheck, HiOutlineX } from "react-icons/hi";
import Searchbar from '../component/Searchbar';
import axiosClient from '../axios-client';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function InternshipQueue() {
    const TABLE_HEAD = ["no", "institution", "Major", "start date", "end date", "status", "action"];
    const [applications, setApplications] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch data from API
        axiosClient.get('/submissions')
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error(error);
                setErrors(error);
            });
    }, []);

    const handleAccept = (id) => {
        // Update status locally
        const updatedApplications = applications.map(app => {
            if (app.id === id) {
                return { ...app, status: "accepted" };
            }
            return app;
        });
        setApplications(updatedApplications);

        // Send update request to API
        axiosClient.put(`/submissions/${id}`, { status: "accepted" }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Status updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleReject = (id) => {
        // Update status locally
        const updatedApplications = applications.map(app => {
            if (app.id === id) {
                return { ...app, status: "rejected" };
            }
            return app;
        });
        setApplications(updatedApplications);

        // Send update request to API
        axiosClient.put(`/submissions/${id}`, { status: "rejected" }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Status updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    return (
        <div className='overflow-x-auto'>
            <h5 className="mx-5 text-xl text-left text-gray-500 font-bold tracking-wide">Internship Submission List</h5>
            <div className='max-sm m-5 rounded-xl shadow-md mb-6 bg-white'>
                <div className="pl-5 pt-5">
                    <Searchbar />
                </div>
                <div className="overflow-x-auto bg-transparent m-4 p-4">
                    <table className='w-full text-center'>
                        <thead>
                            <tr className='border border-solid border-l-1 border-r-1'>
                                {TABLE_HEAD.map((head) => (
                                    <td className='text-sm text-gray-400 border tracking-wide p-3 font-bold uppercase' key={head}>
                                        {head}
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(({ id, major, start_date, status, end_date, institution }, index) => {
                                const isLast = index === applications.length - 1;
                                const rows = isLast ? "p-4 text-left border capitalize" : "p-4 border border-r border-blue-gray-50 text-left";
                                return (
                                    <tr key={id} className='border-t text-gray-500 text-sm'>
                                        <td className={`${rows} text-center`}>{index + 1}</td>
                                        <td className={rows}>{institution}</td>
                                        <td className={rows}>{major}</td>
                                        <td className={rows}>{start_date}</td>
                                        <td className={rows}>{end_date}</td>
                                        <td className={`${rows} text-center justify-center capitalize`}>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === "pending" ? "bg-yellow-100 text-yellow-800" : (status === "accepted" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className={`${rows} text-center font-bold`}>
                                            <div className="inline-flex gap-3">
                                                <Link to={`/detailsubmission/${id}`} className="underline text-blue-900">Detail</Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default InternshipQueue;
