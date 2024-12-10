import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../axiosInstance";

function UserProducts() {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axiosInstance.get(`http://localhost:8080/products/user`)
      .then((response) => {
        const { Approved, Pending, Rejected } = response.data;
        setApprovedProducts(Approved || []);
        setPendingProducts(Pending || []);
        setRejectedProducts(Rejected || []);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="spinner border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My Products
      </h1>

      <div className="space-y-8">
        <ProductCategory title="Approved Products" products={approvedProducts} />
        <ProductCategory title="Pending Products" products={pendingProducts} />
        <ProductCategory title="Rejected Products" products={rejectedProducts} />
      </div>
    </div>
  );
}

function ProductCategory({ title, products }) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    );
  }
  

export default UserProducts;
