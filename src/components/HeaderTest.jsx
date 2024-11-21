// src/components/HeaderTest.js
import React, { useContext } from "react";
import LogoutButton from "./LogoutButton";
import AddProductButton from "./AddProductButton";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import ProfileButton from "./ProfileButton";

const HeaderTest = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access auth state

  return (
    <header className="fixed top-0 left-0 w-full bg-elemColour text-white z-10">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-qbold text-xl">Handmade Shop</h1>
        <nav className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <AddProductButton />
              <ProfileButton />
              <LogoutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderTest;
