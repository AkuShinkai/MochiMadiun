import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../axios-client';
import profil from '../assets/android.png';

function EditProfil() {

    const [isLoading, setIsLoading] = useState(true);

    const [profileData, setProfileData] = useState({
        name: "",
        birth_date: "",
        profile_picture: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        roles:""
    });

    const [notification, setNotification] = useState('');
    const [image, setImage] = useState(null);
    const img = useRef();

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await axiosClient.get("/profile");
            const data = response.data;
            setProfileData(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching profile data:", error);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
            setProfileData((prevState) => ({
                ...prevState,
                profile_picture: reader.result,
            }));
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.put("/profile", profileData);
            console.log("Profile data updated successfully:", response.data);
            setNotification('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile data:", error);
            setNotification('Error updating profile data. Please try again.');
        }
    };

    return (
        <section id='editprofile' className='container'>
            <div className='max-w-3xl mx-auto rounded-xl flex flex-col shadow-md mb-6 mt-4 p-5 bg-primaryColorLight'>

                {notification && (
                    <div className="m-4 p-4 bg-green-100 text-green-700 rounded">
                        {notification}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col items-center gap-5 my-3">
                            <img
                                src={profileData.profile_picture ? profileData.profile_picture : profil}
                                alt="Profile"
                                className='object-cover object-center w-32 h-32 rounded-full ring-2 mb-5 ring-orange-300 p-1'
                            />
                            <input ref={img}
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleImageChange} />
                            <button onClick={() => img.current.click()}
                                className="inline-flex items-center px-4 py-1 text-md bg-white text-black rounded-full border-2 hover:bg-green-400 cursor-pointer hover:text-white">
                                <span className="text-base leading-normal">Change Photo</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className='text-left text-white tracking-wide uppercase font-bold mb-3'>Personal Information</div>
                            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                                <div className="w-full">
                                    <label className="block uppercase font-semibold text-gray-200 mb-1 text-sm" htmlFor="profil-fullname">
                                        Full Name
                                    </label>
                                    <input className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        type="text"
                                        placeholder="Full Name"
                                        id="profil-fullname"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        maxLength={90}
                                        disabled
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-gray-200 font-bold mb-1 uppercase text-sm" htmlFor="profil-datebirth">
                                        Date of Birth
                                    </label>
                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        type="date"
                                        id="profil-datebirth"
                                        name="birth_date"
                                        value={profileData.birth_date}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                                <div className="w-full">
                                    <label className="block uppercase font-bold text-gray-200 mb-1 text-sm" htmlFor="profil-gender">
                                        Gender
                                    </label>
                                    <select
                                        id="profil-gender"
                                        className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        onChange={handleChange}
                                        value={profileData.gender}
                                        name="gender"
                                    >
                                        <option value="">Choose Gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase font-bold text-gray-200 mb-1 text-sm" htmlFor="profil-email">
                                        Email Address
                                    </label>
                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        type="email"
                                        id="profil-email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                                <div className="w-full">
                                    <label className="block uppercase font-bold text-gray-200 mb-1 text-sm" htmlFor="profil-phonenumber">
                                        Phone Number
                                    </label>
                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        id="profil-phonenumber"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleChange}
                                        maxLength={20}
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block uppercase font-bold text-gray-200 mb-1 text-sm" htmlFor="profil-address">
                                        Home Address
                                    </label>
                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-[#FF9843]"
                                        id="profil-address"
                                        name="address"
                                        value={profileData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between space-x-4">
                                <button
                                    onClick={() => window.history.back()}
                                    className="inline-flex items-center bg-red-500 text-md px-3 py-1 rounded text-white hover:bg-red-600">
                                    <span>Cancel</span>
                                </button>
                                <button
                                    className="inline-flex items-center bg-green-500 text-md px-3 py-1 rounded text-white hover:bg-green-600"
                                    type='submit'>
                                    <span>Save</span>
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

export default EditProfil;
