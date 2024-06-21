import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const AddMentor = () => {
    const [mentor, setMentor] = useState({ name: '', position: '', status: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentor({ ...mentor, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await fetch('/api/add-mentor', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(mentor)
        //     });
        //     if (response.ok) {
        //         alert('Mentor added successfully!');
        //         navigate('/admin-dashboard');
        //     } else {
        //         alert('Failed to add mentor.');
        //     }
        // } catch (error) {
        //     console.error('Error adding mentor:', error);
        // }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='p-6 m-2 ms-5 bg-white rounded-xl shadow-md'>
            <div className='flex justify-start mb-4'>
                <button
                    onClick={handleBackClick}
                    className="inline-flex items-center bg-blue-400 text-md px-3 py-1 rounded text-white hover:bg-blue-700"
                >
                    <HiOutlineChevronLeft className="mr-2" />
                    <span>Back</span>
                </button>
            </div>
            <h2 className='text-2xl font-bold mb-4 '>Add New Mentor</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={mentor.name}
                        onChange={handleChange}
                        className='mt-1 p-2 w-full border rounded-lg'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Position</label>
                    <input
                        type='text'
                        name='position'
                        value={mentor.position}
                        onChange={handleChange}
                        className='mt-1 p-2 w-full border rounded-lg'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Status</label>
                    <input
                        type='text'
                        name='status'
                        value={mentor.status}
                        onChange={handleChange}
                        className='mt-1 p-2 w-full border rounded-lg'
                        required
                    />
                </div>
                <button type='submit' className='bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-700'>
                    Add Mentor
                </button>
            </form>
        </div>
    );
};

export default AddMentor;
