import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
    navigate("/subscription");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      Subscribe
    </button>
  );
};

export default SubscriptionButton;
