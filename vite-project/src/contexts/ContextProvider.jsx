import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    roles: null,
    setUser: () => { },
    setToken: () => { },
    setRoles: () => { },
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'User',
        email: ''
    });
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [roles, setRoles] = useState(localStorage.getItem('USER_ROLES'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            console.log("Setting token in localStorage:", token);
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            console.log("Removing token from localStorage");
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const updateUser = (newUser, userRoles) => {
        console.log("Updating user context:", newUser);
        console.log("Updating roles context:", userRoles);
        setUser(newUser);
        setRoles(userRoles);
        if (userRoles) {
            console.log("Setting roles in localStorage:", userRoles);
            localStorage.setItem('USER_ROLES', userRoles);
        } else {
            console.log("Removing roles from localStorage");
            localStorage.removeItem('USER_ROLES');
        }
    }

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
    )
}

export const useStateContext = () => useContext(StateContext);
