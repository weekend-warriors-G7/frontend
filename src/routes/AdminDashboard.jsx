import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import { fetchUserRole } from "../utils/user";
const AdminDashboard = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("http://localhost:8080/products", {
          params: { status: "PENDING" }, // Pass filters and search query
        });
        setProductList(response.data);
        console.log(response.data)
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const checkUserRole = async () => {
        const fetchedRole = await fetchUserRole();
      
        if (fetchedRole !== "ADMIN") {
            
          navigate("/"); // Redirect to an unauthorized page or home page
        } else {
          fetchProducts();
        }
      };

      checkUserRole();
  }, [navigate]); // Re-fetch when search query or filters change

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-bgColour flex-col">
      <div className="product-list flex items-center justify-center min-h-screen bg-bgColour flex-col">
        {error && <div className="text-red-500">{error}</div>}

        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner />
          </div>
        ) : (
          <>
            
            <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
        </div>
    </div>
  );
};

export default AdminDashboard;
