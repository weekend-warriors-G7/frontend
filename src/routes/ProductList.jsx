import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const ProductList = () => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axiosInstance.get('http://localhost:8080/products/all')
            .then(response => {
                setProductList(response.data);
            })
            .catch(error => {
                console.error("Error fetching the product list:", error);
            });
    }, []);

    return (
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
    );
};

export default ProductList;
