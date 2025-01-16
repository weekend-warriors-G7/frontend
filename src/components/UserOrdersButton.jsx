import React from "react";
import { useNavigate } from "react-router-dom";

const UserOrdersButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
    navigate("/myorders/");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      My Orders
    </button>
  );
};

export default UserOrdersButton;
