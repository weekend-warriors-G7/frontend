import React from "react";
import { useNavigate } from "react-router-dom";

const UserProductsButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/myproducts/");
  };
  return (
    <div>
      <button
        onClick={handleNavigate}
        className="w-full px-4 py-2 font-qregular text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none focus:ring-linkColour"
      >
        My Products
      </button>
    </div>
  );
};

export default UserProductsButton;
