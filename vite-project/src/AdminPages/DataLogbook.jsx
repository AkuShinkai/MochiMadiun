import React, { useEffect, useState } from 'react';
import { HiCheck, HiOutlineX } from "react-icons/hi";
import Searchbar from '../component/Searchbar';
import axiosClient from '../axios-client';

function DataLogbook() {
    const [logbookData, setLogbookData] = useState([]);

    useEffect(() => {
        fetchLogbook();
    }, []);

    const fetchLogbook = async () => {
        try {
            const response = await axiosClient.get('/logbook/all');
            setLogbookData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching logbook:', error);
        }
    };

    const TABLE_HEAD = ["No", "Tanggal Aktivitas", "Nama", "Detail Aktivitas", "Status", ""];

    return (
        <div className='overflow-x-auto'>
            <h5 className="mx-5 text-xl text-left text-gray-500 font-bold tracking-wide">Daftar Logbook Intern</h5>
            <div className='max-sm m-5 rounded-xl shadow-md mb-6 bg-white'>
                <div className="pl-5 pt-5">
                    <Searchbar />
                </div>
                <div className="overflow-x-auto bg-transparent m-4 p-4">
                    <table className='w-full text-left'>
                        <thead>
                            <tr className='border border-solid border-l-0 border-r-0'>
                                {TABLE_HEAD.map((head) => (
                                    <th className='text-sm text-gray-400 tracking-wide p-3 font-bold uppercase text-center' key={head}>
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {logbookData.map(({ id, date, name, activity }, index) => {
                                const isLast = index === logbookData.length - 1;
                                const rows = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={id} className='border-t text-center text-gray-500 text-sm'>
                                        <td className={rows}>{index + 1}</td>
                                        <td className={rows}>{new Date(date).toLocaleDateString()}</td>
                                        <td className={rows}>{name}</td>
                                        <td className={rows}>{activity}</td>
                                        {/* <td className={rows}>Menunggu Verifikasi</td> */}
                                        <td className={rows}>
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
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DataLogbook;
