import React from "react";
import axiosInstance from "../axiosInstance";

const SubscriptionButton = ({ onClose }) => {


  const handleNavigate = async () => {
    if (onClose) {
      onClose();
    }

      try {
        const response = await axiosInstance.post(
          `/checkout/subscribe`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
  
        const data = await response.data;
        if (data.url) {
          window.location.href=data.url; // Redirect to Stripe Checkout
        }
      } catch (error) {
        console.error("Error redirecting to Stripe Checkout", error);
      }
   
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
