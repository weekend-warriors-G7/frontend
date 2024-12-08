import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useSearch } from "../context/SearchContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import FilterProductsButton from "../components/FilterProductsButton"; // Assuming you have this component
import FilterProductMenu from "../components/FilterProductsMenu"; // Assuming you have this component
import ActiveFilters from "../components/ActiveFilters"; // Assuming you have this component

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});
  const { searchQuery } = useSearch(); // Access the search query from context
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("http://localhost:8080/products", {
          params: { ...filters, searchQuery }, // Pass filters and search query
        });
        setProductList(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, filters]); // Re-fetch when search query or filters change

  // Handlers for filters
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilter(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    setShowFilter(false);
  };

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}

      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Product List</h2>
            <FilterProductsButton onToggleFilter={() => setShowFilter(!showFilter)} />
          </div>

          {showFilter && (
            <FilterProductMenu
              onApplyFilters={handleApplyFilters}
              onCancel={handleClearFilters}
            />
          )}

          {Object.keys(filters).length > 0 && <ActiveFilters filters={filters} />}

          <div className="flex items-center justify-center min-h-screen bg-bgColour">
            <div className="w-full max-w-5xl p-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
