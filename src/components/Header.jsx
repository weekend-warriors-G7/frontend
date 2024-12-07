import React, { useContext, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import AddProductButton from "./AddProductButton";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access auth state
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate based on authentication state
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]); // Re-run if authentication state or navigate changes

  return (
    <header role="banner" className="fixed top-0 left-0 w-full bg-elemColour text-white z-10">
      <div className="flex items-center justify-between p-4">
        <h1 className="font-qbold text-xl cursor-pointer">Handmade Shop</h1>
        <nav role="navigation" className="flex items-center space-x-4 md:space-x-6">
          {isAuthenticated ? (
            <>
              <AddProductButton />
              <LogoutButton />
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:underline"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
