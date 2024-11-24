import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const SimilarProductsCarousel = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    // Fetch the list of similar products
    axiosInstance
      .get("http://localhost:8080/products/all")
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the product list:", error);
        setError("Could not load similar products");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading similar products...</p>;
  if (error) return <p>{error}</p>;

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      
      <div className="relative w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-black">
            Similar Products
        </h2>
        {/* Left Arrow */}
        <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-accentColour text-white w-9 h-9 rounded-full shadow-md hover:bg-linkColour z-10 flex items-center justify-center ml-2"
        >
            &#8249;
        </button>

        {/* Scrollable Product List */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-4 items-center scrollbar-hide w-full py-8"
        >
          {productList.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-64 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col justify-between"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="h-40 w-full flex items-center justify-center rounded-md mb-4">
                <img
                  src={product.imageId}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h4 className="text-lg font-bold text-black truncate">
                {product.name}
              </h4>
              <p className="text-accentColour font-bold">{product.price}$</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-accentColour text-white w-9 h-9 rounded-full shadow-md hover:bg-linkColour z-10 flex items-center justify-center mr-2"
        >
            &#8250;
        </button>
      </div>
    </div>
  );
};

export default SimilarProductsCarousel;
