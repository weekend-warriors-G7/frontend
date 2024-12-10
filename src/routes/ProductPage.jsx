import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import SimilarProductsCarousel from "../components/SimilarProductsCarousel";
import axiosInstance from "../axiosInstance";
import Spinner from "../components/Spinner";
const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details
    axiosInstance
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Product not found or an error occurred.");
        setLoading(false);
      });
  }, [id]);

  return (
    
    <div>
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <Spinner />
            </div>
          ) : (
            <>
        <ProductDetails id={id} product={product} />
        {product.status === "APROVED" && <SimilarProductsCarousel />}
        
        </>
        )}
  
    </div>
  );
};

export default ProductPage;
