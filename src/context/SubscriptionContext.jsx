import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../axiosInstance'; // Import your axios instance for API calls
import { AuthContext } from './AuthContext'; // Use AuthContext to check authentication

// Create the SubscriptionContext with default values
export const SubscriptionContext = createContext({
  isSubscribed: false,
  setIsSubscribed: () => {},
  loading: true,
});

// Create a provider component
export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext); // Access authentication status

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!isAuthenticated) {
        setIsSubscribed(false);
        setLoading(false);
        return;
      }

      try {
        // Fetch subscription status from the backend
        const response = await axiosInstance.get('/payments/verify-subscription'); // Replace with your API endpoint
        setIsSubscribed(response.data.status === 'active'); // Assume 'status' returns 'active' for active subscriptions
      } catch (error) {
        console.error('Failed to fetch subscription status:', error);
        setIsSubscribed(false); // Default to false on error
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [isAuthenticated]); // Re-fetch subscription status if authentication changes

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setIsSubscribed, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
