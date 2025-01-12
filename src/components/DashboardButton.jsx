import React from "react";

const DashBoardButton = ({ navigate, onClose }) => {
  return (
    <button
      onClick={() => {
        onClose();
        navigate("/dashboard");
      }}
      className="w-full px-4 py-2 text-left bg-accentColour rounded hover:bg-accentColourHover"
    >
      Dashboard
    </button>
  );
};

export default DashBoardButton;
