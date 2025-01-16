import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../axiosInstance";
import Spinner from "./Spinner";

function UserOrders() {
  const [soldProducts, setSoldProducts] = useState([]);
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`http://localhost:8080/orders/seller`)
        .then((response) => {
            setSoldProducts(response.data);
            console.log(soldProducts);
            setError(null);
            })
        .catch((err) => {
            setError("Failed to load products.");
            console.error("Error fetching products:", err);
            })
        .finally(() => setIsLoading(false));

    axiosInstance.get(`http://localhost:8080/orders/buyer`)
    .then((response) => {
        setBoughtProducts(response.data);
        setError(null);
        })
    .catch((err) => {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
        })
    .finally(() => setIsLoading(false));
}, [soldProducts]);

  if (isLoading) {
    return (
      <Spinner />
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
        My Orders
      </h1>

      <div className="space-y-8">
        <ProductCategory title="Sold Products" products={soldProducts} />
        <ProductCategory title="Bought Products" products={boughtProducts} />
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
              <ProductCard key={product.product.id} product={product.product} />
            ))}
          </div>
        )}
      </div>
    );
  }
  

export default UserOrders;
