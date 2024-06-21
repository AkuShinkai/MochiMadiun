import { useEffect, useRef, useState } from 'react';
import { HiPencil } from "react-icons/hi2";
import Searchbar from '../component/Searchbar';
import axiosClient from '../axios-client';

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Active",
        value: "Active",
    },
    {
        label: "Inactive",
        value: "Inactive",
    },
];

function DataIntern() {
    const [data, setData] = useState([]); // State to store fetched data
    const [activeTab, setActiveTab] = useState(TABS[0].value);
    const img = useRef();
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Fetch data when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch data from backend API using axiosClient
            const response = await axiosClient.get('/dataintern');
            // Set fetched data to state
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getStatus = (start_date, end_date) => {
        const now = new Date();
        const start = new Date(start_date);
        const end = new Date(end_date);
        return (now >= start && now <= end) ? 'Active' : 'Inactive';
    };

    const filteredData = data.filter(({ start_date, end_date }) => {
        const status = getStatus(start_date, end_date);
        if (activeTab === 'all') return true;
        return status === activeTab;
    });

    return (
        <div className='overflow-x-auto'>
            <h5 className="mx-5 text-xl text-left text-gray-500 font-bold tracking-wide">Data Intern</h5>
            <div className='max-sm m-5 rounded-xl shadow-md mb-6 mt-4 bg-white'>
                <div className="flex items-center pt-5 justify-between mx-5">
                    <div value="all" className="flex bg-none p-1 rounded-full border border-[#FF9843]">
                        {TABS.map(({ label, value }) => (
                        <button
                            key={value} value={value}
                            className={`px-4 text-sm text-gray-500 py-2 rounded-full cursor-pointer ${activeTab === value ? 'bg-orange-400 text-white' : ''}`}
                            onClick={() => setActiveTab(value)}
                        >
                            {label}
                        </button>
                        ))}
                    </div>
                    <Searchbar/>
                </div>
                <div className=" overflow-x-auto bg-transparent m-4 p-4">
                    <table className='w-full text-left'>
                        <thead >
                            <tr className='border  border-solid border-l-0 border-r-0'>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>No</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Photo</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Name</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Education</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Position</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Mulai</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Akhir</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'>Status</th>
                                <th className='text-sm text-gray-400 tracking-wide uppercase p-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(({ profile_picture, name, institution, position, start_date, end_date }, index) => {
                                const status = getStatus(start_date, end_date);
                                return (
                                    <tr key={index + 1} className='border-t text-gray-500 text-sm'>
                                        <td className='p-4'>{index + 1}</td>
                                        <td className='p-4'>
                                            <img
                                                src={image ? image : profile_picture}
                                                alt={profile_picture}
                                                className="h-10 w-10 rounded-full bg-transparent bg-cover"/>
                                        </td>
                                        <td className='p-4'>{name}</td>
                                        <td className='p-4'>{institution}</td>
                                        <td className='p-4'>{position}</td>
                                        <td className='p-4'>{start_date}</td>
                                        <td className='p-4'>{end_date}</td>
                                        <td className='p-4'>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className='p-4'>
                                            <div className="inline-flex gap-2">
                                                <button>
                                                    <HiPencil className="text-gray-600"/>
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

export default DataIntern;
