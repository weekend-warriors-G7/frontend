import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const TopOrderedProducts = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axiosInstance.get("/orders/top");
        const top10Products = response.data.slice(0, 10);
        setTopProducts(top10Products);
      } catch (e) {
        console.error(`Error fetching top ordered products: ${e}`);
        setError("Failed to fetch top ordered products.");
      }
    };

    fetchTopProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top 10 Most Ordered Products</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="grid grid-cols-1 gap-4">
        {topProducts.map((item, index) => (
          <li
            key={index}
            className="flex flex-col p-4 bg-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleProductClick(item.product.id)}
          >
            <h3 className="font-bold text-lg text-accentColour">{item.product.name}</h3>
            <p className="text-sm text-gray-600">Orders: {item.orderCount}</p>
            <p className="text-sm text-gray-600">
              Price: ${item.product.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopOrderedProducts;
