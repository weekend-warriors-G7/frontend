import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useSearch } from "../context/SearchContext";
import {useFilters} from "../context/FilterContext";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import FilterProductsButton from "../components/FilterProductsButton"; // Assuming you have this component
import FilterProductMenu from "../components/FilterProductsMenu"; // Assuming you have this component
import ActiveFilters from "../components/ActiveFilters"; // Assuming you have this component
import SortProductsMenu from "../components/SortProductsMenu";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [originalProductList, setOriginalProductList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  //const [filters, setFilters] = useState({});
  const { filters, applyFilters, clearFilters } = useFilters();

  const { searchQuery } = useSearch(); // Access the search query from context
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/products",
          {
            params: { ...filters, searchQuery }, // Pass filters and search query
          }
        );
        if (response.data.length === 0) {
          setError("No products match your filters.");
        } else {
          setProductList(response.data);
          setOriginalProductList(response.data);
        }
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, filters]); // Re-fetch when search query or filters change

  // Handlers for sorting
  const handleSort = (order) => {
    const sorted = [...productList].sort((a, b) => {
      if (order === "low-to-high") {
        return a.price - b.price;
      } else if (order === "high-to-low") {
        return b.price - a.price;
      }
      return 0;
    });
    setProductList(sorted);
  };

  const handleClearSort = () => {
    setProductList([...originalProductList]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-bgColour flex-col">
      <div className="product-list flex items-center justify-center min-h-screen bg-bgColour flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="w-full mb-1">
              <div className="flex justify-between items-center">
                <FilterProductsButton
                  onToggleFilter={() => setShowFilter(!showFilter)}
                />
                <SortProductsMenu
                  onSort={handleSort}
                  onClearSort={handleClearSort}
                />
              </div>

              <div className="mt-4">
                {showFilter && (
                    <FilterProductMenu
                        onApplyFilters={(newFilters) => {
                          applyFilters(newFilters);
                          setShowFilter(false);
                        }}
                        onCancel={() => {
                          clearFilters();
                          setShowFilter(false);
                        }}
                    />
                )}
              </div>
              {Object.keys(filters).length > 0 && (
                <ActiveFilters filters={filters} />
              )}
            </div>
            {error ? (
                    <div className="bg-red-100 text-red-600 p-3 flex justify-center items-center rounded mb-4 min-w-full"> {error}
                    </div>
                ) : (
                    <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>)}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
