import React, { useEffect, useState } from 'react'
import { HiOutlineUser, HiOutlineLogout, HiMenu, HiX } from 'react-icons/hi'
import { Menu, Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { Fragment } from 'react'
import Logout from '../pages/Logout'
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '../assets/SiMagang.png'
import { ADMIN_SIDEBAR_LINKS, ADMIN_SIDEBAR_BOTTOM_LINKS } from '../lib/constants'
import axiosClient from '../axios-client'



const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#FF9843] hover:no-underline hover:text-white active:text-white active:bg-[#FF9843] rounded-full text-base';
const Header = ({ toggleSidebar }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [users, setUsers] = useState([]);

    const handleToggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };
    const placeholderImageUrl = 'data:image/jpeg;base64,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';

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const profileImageUrl = placeholderImageUrl;

    const fetchUser = async () => {
        try {
            const response = await axiosClient.get('/user');
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='w-full'>
            <div className="bg-white md:justify-end justify-between h-16 px-4 flex items-center border-b border-gray-200">
                <button className='flex md:hidden items-start' onClick={handleToggleSidebar} >
                    <HiMenu className='text-gray-400 me-4 cursor-pointer h-5 w-5' />
                </button>
                <div className="flex items-center gap-2 mr-2 md:mr-0">
                    <Popover className="relative">
                        {users.name && <p>{users.name}</p>} {/* Menampilkan nama pengguna jika ada */}
                    </Popover>

                    <Menu as="div" className="relative">
                        <div>
                            <Menu.Button className="ml-2 bg-transparent flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                                <span className="sr-only">Open user menu</span>
                                <div
                                    className="h-10 w-10 rounded-full ring-orange-300 ring bg-transparent bg-cover bg-no-repeat bg-center"
                                    style={{ backgroundImage: `url("${profileImageUrl}")` }}
                                >
                                    <span className="sr-only">Marc Backes</span>
                                </div>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm m-auto items-center shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {/* <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => navigate('/adminprofile')}
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'active:bg-gray-200 rounded-sm py-2 px-0 text-gray-700 cursor-pointer focus:bg-gray-200'
                                            )}
                                        ><HiOutlineUser className="inline-block mr-14" />
                                            Profile
                                        </div>
                                    )}
                                </Menu.Item> */}
                                {/* <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => navigate('/setting')}
                                            className={classNames(
                                                active && 'bg-gray-100',
                                                'active:bg-gray-200 rounded-sm py-2 px-0 text-gray-700 cursor-pointer focus:bg-gray-200'
                                            )}
                                        ><MdOutlineSettings className="inline-block mr-14" />
                                            Settings
                                        </div>
                                    )}
                                </Menu.Item> */}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            {sidebarOpen &&
                <div className="md:hidden  ">
                    <div className="fixed inset-0 bg-gray-500 opacity-25"  ></div>
                    <nav className="bg-gray-400 fixed top-0 left-0 bottom-0 flex flex-col w-3/6 max-w-sm py-6 px-6 border-r overflow-y-auto">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2  mr-auto leading-none">
                                {/* <img src={logo} alt="Your Icon"className='h-10  w-10' /> */}
                                <a href='/' className="text-black text-lg font-bold">Mochi Madiun</a>
                            </div>
                            <button onClick={handleCloseSidebar}>
                                <HiX className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-500" />
                            </button>
                        </div>
                        <div className="pt-7 pb-8 flex flex-1 flex-col gap-1">
                            {ADMIN_SIDEBAR_LINKS.map((link) => (
                                <SidebarLink key={link.key} link={link} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                            {ADMIN_SIDEBAR_BOTTOM_LINKS.map((link) => (
                                <SidebarLink key={link.key} link={link} />
                            ))}
                            <button className={classNames(linkClass, 'cursor-pointer text-red-500')}
                                onClick={() => {
                                    setShowModal(true);
                                }}>
                                <span className="text-xl" >
                                    <HiOutlineLogout />
                                </span>
                                Log Out
                            </button>
                            {showModal && <Logout setOpen={setShowModal} />}
                        </div>

                    </nav>

                </div>

            }

        </div>
    )
}
function SidebarLink({ link }) {
    const { pathname } = useLocation()

    return (
        <Link
            to={link.path}
            className={classNames(pathname === link.path ? 'bg-orange-300 text-white' : 'text-white', linkClass)}
        >
            <span className="text-xl">{link.icon}</span>
            {link.label}
        </Link>
    )
}
export default Header
