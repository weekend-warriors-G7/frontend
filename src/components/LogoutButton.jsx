import React from "react";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authenticationToken');
        localStorage.removeItem('authenticationTokenExpiryDate');
        navigate('/login');
    };

    return(
        <div>
            <button onClick={handleLogout}
                className="w-full px-4 py-2 font-qregular text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none focus:ring-linkColour"
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutButton;
