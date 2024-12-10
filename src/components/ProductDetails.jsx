import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Product from "../domain/Product";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { fetchUserRole } from "../utils/user";
import axiosInstance from "../axiosInstance";
import Spinner from "../components/Spinner";
const ProductDashboard = ({ product, id }) => {
  const navigate = useNavigate();
  const [userRole, setRole] = useState("");
  const { isAuthenticated } = useContext(AuthContext); // Access auth state
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const fetchedRole = await fetchUserRole();
        setRole(fetchedRole);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setRole("Unknown");
      }
    };
    if (isAuthenticated)
      getUserRole();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "USER" && product.status === "PENDING") {
    return <Navigate to="/products" replace />
  }

  const handleStatusUpdate = async (status) => {
    try {
      setLoading(true)
      const formDataToSend = new FormData();

      formDataToSend.append(
        "product",
        JSON.stringify({
          name: product.name,
          price: product.price,
          description: product.description,
          size: product.size,
          clothingType: product.clothingType,
          material: product.material,
          colour: product.colour,
          status: status
        })
      );

      const response = await axiosInstance.put(
        `/products/${id}/update`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Failed to update product");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }



  const handleEditProduct = () => {
    navigate(`/update-product/${id}`);
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (

        <>
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

              {product.status === "APROVED" ? (
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
                >
                  Add to cart
                </button>
              ) : (userRole === "ADMIN" && (
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate("APROVED")}
                    className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate("REJECTED")}
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Reject
                  </button>
                </div>
              )
              )}

              <button
                type="button"
                onClick={handleEditProduct}
                className="w-full px-4 py-2 mt-4 font-bold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
              >
                Edit Product
              </button>

            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Define propTypes to ensure product is an instance of Product
ProductDashboard.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductDashboard;
