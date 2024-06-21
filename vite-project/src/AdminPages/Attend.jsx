import React, { useEffect, useState } from 'react';
import { HiCheck, HiOutlineX } from "react-icons/hi";
import Searchbar from '../component/Searchbar';
import axiosClient from '../axios-client';

function Attend() {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axiosClient.get('/attendance/all');
            setAttendanceData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const TABLE_HEAD = ["No", "Nama", "Tanggal", "Pukul", "Keterangan", "Status", "Action"];

    const Label = ({ keterangan }) => {
        let colorClasses;

        switch (keterangan) {
            case 'sakit':
                colorClasses = 'bg-red-100 text-red-800';
                break;
            case 'izin':
                colorClasses = 'bg-yellow-100 text-yellow-800';
                break;
            case 'hadir':
                colorClasses = 'bg-green-100 text-green-800';
                break;
            default:
                colorClasses = 'bg-gray-100 text-gray-800';
        }

        return (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                {keterangan}
            </span>
        );
    };

    return (
        <div className='overflow-x-auto'>
            <h5 className="mx-5 text-xl text-left text-gray-500 font-bold tracking-wide">Daftar Kehadiran</h5>
            <div className='max-sm m-5 rounded-xl shadow-md mb-6 bg-white'>
                <div className="pl-5 pt-5">
                    <Searchbar />
                </div>

                <div className="overflow-x-auto bg-transparent m-4 p-4">
                    <table className='w-full text-left '>
                        <thead>
                            <tr className='border border-solid border-l-0 border-r-0'>
                                {TABLE_HEAD.map((head) => (
                                    <th className='text-sm uppercase border text-center text-gray-400 tracking-wide p-3' key={head}>
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((data, index) => (
                                <tr key={data.id} className='border capitalize text-gray-500 text-sm'>
                                    <td className="p-4 border text-center">{index + 1}</td>
                                    <td className="p-4 border">{data.user_profile.name}</td>
                                    <td className="p-4 border text-center">{new Date(data.datetime).toLocaleDateString()}</td>
                                    <td className="p-4 border text-center">{new Date(data.datetime).toLocaleTimeString()}</td>
                                    <td className="p-4 border text-center font-bold">
                                        <Label keterangan={data.detail} />
                                    </td>
                                    <td className="p-4 border text-center">{data.status}</td>
                                    <td className="p-4 border text-center">
                                        <div className="inline-flex gap-2">
                                            <button>
                                                <HiCheck className="text-green-600" />
                                            </button>
                                            <button>
                                                <HiOutlineX className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Attend;
