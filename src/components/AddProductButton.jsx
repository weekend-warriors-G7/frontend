import React from "react";
import { useNavigate } from "react-router-dom";

const AddProductButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
    navigate("/products/add");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      Add Product
    </button>
  );
};

export default AddProductButton;
