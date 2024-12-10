import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate, Navigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Add React Icons
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import AddProductButton from "./AddProductButton"; // Import AddProductButton
import UserProductsButton from "./UserProductsButton"
import LogoutButton from "./LogoutButton"; // Import LogoutButton
import { fetchUserRole } from "../utils/user";
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
    if(isAuthenticated)
      getUserRole();
  }, [role]);

   // Redirect to login if not authenticated
 

  return (
    <header className="fixed top-0 left-0 w-full bg-elemColour text-white z-10 p-4 flex justify-between items-center">
      <h1
        className="font-qbold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Handmade Shop
      </h1>
      {isAuthenticated && (
          <>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for products..."
          className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-black focus:outline-none focus:ring focus:ring-accentColour"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update local input value
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
        <FaSearch className="absolute left-3 text-gray-400" />
      </div>
      <nav className="flex items-center space-x-4">
        
           {role ==="ADMIN" && (
              <button
                className="bg-accentColour text-white px-4 py-2 rounded hover:bg-accentColourHover transition"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            )}
            <AddProductButton />
            <UserProductsButton />
            <LogoutButton />
          
        
      </nav>
      </>
      )}
    </header>
  );
};

export default Header;
