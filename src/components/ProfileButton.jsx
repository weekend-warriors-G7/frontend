// src/components/LogoutButton.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ProfileButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null;
  }

  const handleNavigate = () => {
    navigate("/profile");
  };

  return (
    <div>
      <button
        onClick={handleNavigate}
        className="w-full px-4 py-2 font-qregular text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none focus:ring-linkColour"
      >
        Profile
      </button>
    </div>
  );
};

export default ProfileButton;
