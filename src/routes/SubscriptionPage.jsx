import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
    
  const [hasAlerted, setHasAlerted] = useState(false);  // State to track if alert was shown
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Extract the session ID from the URL (Stripe redirects with this)
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          
          return;
        }

        // Call the backend to verify the payment status
        const response = await axiosInstance.get(`/payments/verify-subscription/${sessionId}`);

        if (response.data.status === 'active') {
         
          if (!hasAlerted) {
            alert('Subscription Successful!');  // Show success message
            setHasAlerted(true);  // Prevent further alerts
          }
          navigate('/products');  // Redirect to the products page after alert
        } else {
        
          if (!hasAlerted) {
            alert('Subscription Failed. Please try again.');  // Show failure message
            setHasAlerted(true);  // Prevent further alerts
          }
          navigate('/products');  // Redirect to the products page after alert
        }
      } catch (error) {
    
        console.error(error);
        if (!hasAlerted) {
          alert('An error occurred while verifying the payment.');
          setHasAlerted(true);  // Prevent further alerts
        }
        navigate('/products');  // Redirect to the products page in case of error
      }
    };

    fetchPaymentStatus();
  }, [hasAlerted,navigate]);  // Add `hasAlerted` and `navigate` as dependencies

  return (
    <div>
    </div>
  );
};

export default SubscriptionPage;
