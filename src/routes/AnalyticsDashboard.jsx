import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubscriptionContext } from "../context/SubscriptionContext"; // Import SubscriptionContext
import TopSearchedKeywords from "../components/TopSearchedKeywords";
import TopOrderedProducts from "../components/TopOrderedProducts";

const AnalyticsDashboard = () => {
  const { isSubscribed, loading } = useContext(SubscriptionContext); // Access subscription state
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isSubscribed) {
      navigate("/products"); // Redirect to the subscription page if not subscribed
    }
  }, [loading, isSubscribed, navigate]);

  // Render a loading spinner or placeholder while checking subscription status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking subscription status...</p>
      </div>
    );
  }

  // Render the analytics dashboard if subscribed
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Analytics Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <TopSearchedKeywords />
        <TopOrderedProducts />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
