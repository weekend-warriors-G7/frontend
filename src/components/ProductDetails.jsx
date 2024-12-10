import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Product from "../domain/Product";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Spinner from "./Spinner";

const ProductDashboard = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

  const handleEditProduct = () => {
    navigate(`/update-product/${id}`);
  };

  const handleDeleteProduct = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8080/products/${id}/delete`);
      alert("Product deleted successfully.");
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product. Please try again.");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

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
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete Product
        </button>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-black text-center">
                Are you sure you want to delete this product?
              </p>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                >
                  No
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define propTypes to ensure product is an instance of Product
ProductDashboard.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductDashboard;
