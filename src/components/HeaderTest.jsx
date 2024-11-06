import React from "react";
//import {Link} from 'react-router-dom';
import LogoutButton from "./LogoutButton";

const HeaderTest = () => {
    return(
        <header className="fixed top-0 left-0 w-full bg-elemColour text-white z-10">
            <div className="flex items-center justify-between p-4">
                <h1 className="font-qbold text-xl">Handmade Shop </h1>
                <nav>
                    <LogoutButton />
                </nav>
            </div>
        </header>
    );
};

export default HeaderTest;