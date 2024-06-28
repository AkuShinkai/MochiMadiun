import React, { useEffect, useState } from 'react';
import profil from '../assets/android.png';
import { useStateContext } from '../contexts/ContextProvider';
import { HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

function AdminProfile() {
    const { user, setUser } = useStateContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({
        name: "",
        birth_date: "",
        profile_picture: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axiosClient.get("/profile");
            const data = response.data;
            console.log("Fetched Profile Data:", data);
            setProfileData(data);
            setUser(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        navigate('/editprofile');
    };

    const renderProfileField = (label, value) => (
        <div className="bg-primaryColor p-3 rounded-md">
            <label className="block uppercase font-bold text-left text-gray-300 mb-1 text-sm">
                {label}
            </label>
            <p className='text-left text-white tracking-wider text-lg'>{value || '-'}</p>
        </div>
    );

    return (
        <section id='profile' className='container'>
            <div className='max-w-3xl mx-auto rounded-xl flex flex-col shadow-md mb-6 mt-4 p-5 bg-primaryColorLight'>

                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-300"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center my-3">
                            <img src={profileData.profile_picture ? profileData.profile_picture : profil} alt="Profile" className='object-cover object-center w-32 h-32 rounded-full ring-2 ring-orange-300 p-1' />
                        </div>

                        <div className="my-1">
                            <div className='text-left text-white tracking-wide uppercase font-bold mb-3'>Personal Information</div>
                            <div className="space-y-4">
                                {renderProfileField("Full Name", profileData.name)}
                                {renderProfileField("Email Address", profileData.email)}
                                {renderProfileField("Phone Number", profileData.phone)}
                                {renderProfileField("Date of Birth", profileData.birth_date)}
                                {renderProfileField("Gender", profileData.gender)}
                                {renderProfileField("Home Address", profileData.address)}
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-center my-5">
                    <button
                        onClick={handleClick}
                        className="inline-flex items-center bg-[#FF9843] text-md px-3 py-2 rounded-full text-white hover:bg-orange-600">
                        <HiOutlinePencil className="mr-2" />
                        <span>Change</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AdminProfile;
