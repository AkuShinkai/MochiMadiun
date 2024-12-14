import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from '../axios-client';

const StateContext = createContext({
    user: null,
    token: null,
    roles: null,
    setUser: () => {},
    setToken: () => {},
    setRoles: () => {},
});

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 menit dalam milidetik
// INACTIVITY_LIMIT = 30 detik dalam milidetik
// const INACTIVITY_LIMIT = 30 * 1000;

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'User',
        email: '',
        profile_picture: '',
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [roles, setRoles] = useState(localStorage.getItem('USER_ROLES'));

    let inactivityTimer = null;

    // Fungsi untuk menghapus token dan roles jika pengguna tidak aktif
    const removeAuthData = () => {
        console.log('Removing auth data...');
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_ROLES');
        _setToken(null);
        setRoles(null);
        // Redirect ke halaman login atau halaman lain jika diinginkan
        window.location.href = '/login'; // Pengalihan ke halaman login
    };

    // Fungsi untuk mereset timer ketidakaktifan
    const resetInactivityTimer = () => {
        // console.log('Resetting inactivity timer...');
        if (inactivityTimer) {
            clearTimeout(inactivityTimer); // Hapus timer sebelumnya
        }
        inactivityTimer = setTimeout(() => {
            // console.log('Inactivity limit reached. Removing auth data...');
            removeAuthData(); // Hapus data jika tidak ada aktivitas
        }, INACTIVITY_LIMIT);
    };

    // Tambahkan event listeners untuk mendeteksi aktivitas pengguna
    useEffect(() => {
        // Deteksi aktivitas pengguna
        const events = ['click', 'mousemove', 'keydown', 'scroll'];

        const handleUserActivity = () => {
            console.log('User activity detected.');
            resetInactivityTimer(); // Reset timer jika ada aktivitas
        };

        events.forEach(event => window.addEventListener(event, handleUserActivity));

        // Bersihkan event listeners saat komponen dibersihkan
        return () => {
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
            if (inactivityTimer) {
                clearTimeout(inactivityTimer);
            }
        };
    }, []);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            // console.log('Setting token in localStorage:', token);
            localStorage.setItem('ACCESS_TOKEN', token);
            resetInactivityTimer(); // Reset timer saat token diset
        } else {
            // console.log('Removing token from localStorage');
            localStorage.removeItem('ACCESS_TOKEN');
            removeAuthData(); // Hapus data jika token dihapus
        }
    };

    const updateUser = (newUser, userRoles) => {
        setUser(newUser);
        setRoles(userRoles);
        if (userRoles) {
            // console.log('Setting roles in localStorage:', userRoles);
            localStorage.setItem('USER_ROLES', userRoles);
        }
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            roles,
            setUser: updateUser,
            setToken,
            setRoles,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
