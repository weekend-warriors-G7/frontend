import React from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/subscription");
  };

  return (
    <button
      onClick={handleNavigate}
      className="w-full px-4 py-2 font-qregular text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none focus:ring-linkColour"
    >
      Subscription
    </button>
  );
};

export default SubscriptionButton;
