import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Add React Icons
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { fetchUserRole } from "../utils/user";
import BurgerMenu from "./BurgerMenu";
import logo from './../assets/logo.png';

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access auth state
  const { setSearchQuery } = useSearch(); // Access search context to update the query
  const [inputValue, setInputValue] = useState(""); // Local state for the input value
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue); // Update global search query
      navigate("/products"); // Navigate to the product list page
    }
  };

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const fetchedRole = await fetchUserRole();
        setRole(fetchedRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("Unknown");
      }
    };
    if (isAuthenticated) getUserRole();
  }, [role, isAuthenticated]);

  // Redirect to login if not authenticated

  return (
    <header className="h-[80px] px-20 fixed top-0 left-0 w-full bg-elemColour text-white z-10 p-4 flex justify-between items-center">
      <h1
        className="font-qbold text-2xl cursor-pointer flex items-center space-between w-1/3"
        onClick={() => navigate("/")}
      >
        Clothique
        <img src={logo} alt="" className="h-[60px] mx-2" />
      </h1>
      {isAuthenticated && (
        <>
          <div className="relative flex items-center w-1/3">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-lg px-10 py-2 text-black focus:outline-none focus:ring focus:ring-accentColour"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update local input value
              onKeyDown={handleKeyDown} // Handle Enter key press
            />
            <FaSearch className="absolute left-3 text-gray-400" />
          </div>
          <div className="w-1/3 flex justify-end">
            <nav className="flex items-center">
              <BurgerMenu role={role} navigate={navigate} />
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
