import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./routes/authentify/RegisterForm";
import LoginForm from "./routes/authentify/LoginForm";
import Header from "./components/Header";
import ProductPage from "./routes/ProductPage";
import ProductList from "./routes/ProductList";
import AddProductForm from "./routes/AddProductForm";
import PaymentSuccessPage from "./routes/PaymentSuccessPage";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext"; // Import SearchProvider
import { FilterProvider } from "./context/FilterContext";
import UpdateProductForm from "./routes/UpdateProductForm";
import AdminDashboard from "./routes/AdminDashboard";
import UserProducts from "./components/UserProducts";
import UserOrders from "./components/UserOrders";
import AnalyticsDashboard from "./routes/AnalyticsDashboard";
import SubscriptionPage from "./routes/SubscriptionPage";
import { SubscriptionProvider } from "./context/SubscriptionContext";

// Function to check if the user is authenticated
function isAuthenticated() {
  // Replace this with your actual authentication logic
  return localStorage.getItem("accessToken") !== null;
}

// Component to handle redirection from the root path
function HomeRedirect() {
  if (isAuthenticated()) {
    return <Navigate to="/products" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

function App() {
  return (
    <AuthProvider>
    <SubscriptionProvider>
      <SearchProvider>
        <FilterProvider>
          <BrowserRouter>
            <Header />
            <div className="mt-24">
              <Routes>
                {/* Redirect from root path */}
                <Route path="/" element={<HomeRedirect />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="products/add" element={<AddProductForm />} />
                <Route path="products/:id" element={<ProductPage />} />
                <Route path="products" element={<ProductList />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="myproducts" element={<UserProducts />} />
                <Route path="myorders" element={<UserOrders />} />
                <Route
                  path="/update-product/:id"
                  element={<UpdateProductForm />}
                />
                <Route path="/success/" element={<PaymentSuccessPage />} />
                <Route path="/subscription-success/" element={<SubscriptionPage />} />
                <Route
                  path="/analytics-dashboard"
                  element={<AnalyticsDashboard />}
                />
                {/* <Route path="profile" element={<ProfileDashboard />} /> */}
              </Routes>
            </div>
          </BrowserRouter>
        </FilterProvider>
      </SearchProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;
