// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('accessToken') !== null
  );

  useEffect(() => {
    // Optional: Listen for storage changes across tabs
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('accessToken') !== null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
