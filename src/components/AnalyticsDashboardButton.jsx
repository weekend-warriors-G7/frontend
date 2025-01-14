import React from "react";
import { useNavigate } from "react-router-dom";

const AnalyticsDashboardButton = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (onClose) {
      onClose();
    }
    navigate("/analytics");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      Analytics Dashboard
    </button>
  );
};

export default AnalyticsDashboardButton;
