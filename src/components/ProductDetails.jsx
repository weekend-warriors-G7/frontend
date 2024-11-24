import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Product from "../domain/Product";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import SimilarProductsCarousel from "./SimilarProductsCarousel";

const ProductDashboard = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product data based on the ID from the URL
    axiosInstance
      .get(`http://localhost:8080/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the product:", error);
        setError("Product not found or an error occurred");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleEditProduct = () => {
    navigate(`/update-product/${id}`);
  };

  return (
    <div className="flex items-center justify-center bg-bgColour">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mt-8 mb-8">
        <h2 className="text-2xl font-bold text-center text-black">
          {product.name}
        </h2>

        <div className="product-image">
          <img
            src={product.imageId}
            alt={`${product.name} main`}
            className="product-main-image"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-black">
          <p className="text-accentColour">{product.price}$</p>
        </h2>

        <p className="text-center">{product.description}</p>

        <div className="tags flex justify-around">
          <div className="left">
            <p className="text-center">
              Type{" "}
              <span className="text-accentColour font-bold">
                {product.clothingType}
              </span>
            </p>
            <p className="text-center">
              Size{" "}
              <span className="text-accentColour font-bold">
                {product.size}
              </span>
            </p>
          </div>

          <div className="right">
            <p className="text-center">
              Material{" "}
              <span className="text-accentColour font-bold">
                {product.material}
              </span>
            </p>
            <p className="text-center">
              Colour{" "}
              <span className="text-accentColour font-bold">
                {product.colour}
              </span>
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={handleEditProduct}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
        >
          Edit Product
        </button>
        
      </div>
    </div>
  );
};

// Define propTypes to ensure product is an instance of Product
ProductDashboard.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductDashboard;
