import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./contexts/ContextProvider";
import Navbar from "./component/Navbar";
import AuthNav from "./component/AuthNav";



function AppAuth() {
    const { token } = useStateContext()
    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="">
            <AuthNav />
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default AppAuth;
