import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasAlerted, setHasAlerted] = useState(false);  // State to track if alert was shown
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Extract the session ID from the URL (Stripe redirects with this)
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          setErrorMessage('Session ID not found.');
          return;
        }

        // Call the backend to verify the payment status
        const response = await axiosInstance.get(`/payments/verify-session/${sessionId}`);

        if (response.data.status === 'success') {
          setPaymentStatus('Payment Successful!');
          if (!hasAlerted) {
            alert('Payment Successful!');  // Show success message
            setHasAlerted(true);  // Prevent further alerts
          }
          navigate('/products');  // Redirect to the products page after alert
        } else {
          setPaymentStatus('Payment Failed. Please try again.');
          if (!hasAlerted) {
            alert('Payment Failed. Please try again.');  // Show failure message
            setHasAlerted(true);  // Prevent further alerts
          }
          navigate('/products');  // Redirect to the products page after alert
        }
      } catch (error) {
        setErrorMessage('An error occurred while verifying the payment.');
        console.error(error);
        if (!hasAlerted) {
          alert('An error occurred while verifying the payment.');
          setHasAlerted(true);  // Prevent further alerts
        }
        navigate('/products');  // Redirect to the products page in case of error
      }
    };

    fetchPaymentStatus();
  }, [hasAlerted]);  // Add `hasAlerted` and `navigate` as dependencies

  return (
    <div>
  
    </div>
  );
};

export default PaymentSuccessPage;
