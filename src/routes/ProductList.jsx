import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import FilterProductsButton from '../components/FilterProductsButton';
import FilterProductMenu from '../components/FilterProductsMenu';
import ActiveFilters from "../components/ActiveFilters";

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const endpoint = Object.keys(filters).length === 0
                ? '/products/all'
                : '/products';

            axiosInstance.get(`http://localhost:8080${endpoint}`, { params: filters })
                .then(response => setProductList(response.data))
                .catch(error => console.error("Error fetching the product list:", error));
        };

        fetchProducts();
    }, [filters]);

    /*
    // original useEffect
        useEffect(() => {
            axiosInstance.get('http://localhost:8080/products/all')
                .then(response => {
                    setProductList(response.data);
                })
                .catch(error => {
                    console.error("Error fetching the product list:", error);
                });
        }, []);*/

    const handleApplyFilters = (appliedFilters) => {
        setFilters(appliedFilters);
        setShowFilter(false);
    };

    const handleClearFilters = () => {
        setFilters({});
        setShowFilter(false);
    };


    return (
        <div className="p-4">

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
            <ActiveFilters filters={filters} />

            <div className="flex items-center justify-center min-h-screen bg-bgColour">
                <div className="w-full max-w-5xl p-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {productList.map((product) => (
                        <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow justify-between"
                        >
                            <h2 className="text-2xl font-bold text-center text-black">{product.name}</h2>
                            <div className="product-image h-48 overflow-hidden items-center">
                                <img src={product.imageId} alt={`${product.name} main`} className="h-full" />
                            </div>
                            <h2 className="text-2xl font-bold text-center text-black">
                                <p className="text-accentColour">{product.price}$</p>
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ProductList;
