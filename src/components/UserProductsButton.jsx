import React from "react";
import { useNavigate } from "react-router-dom";

const UserProductsButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
    navigate("/myproducts/");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      My Products
    </button>
  );
};

export default UserProductsButton;
