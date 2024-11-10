import React from 'react';
import PropTypes from 'prop-types';
import Product from '../domain/Product';
import ProductTag from '../domain/ProductTag';

const ProductDashboard = ({ product }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bgColour">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">{product.name}</h2>
                {/* <img src={product.thumbnail} alt={`${product.name} thumbnail`} className="product-thumbnail" /> */}
                <div className="product-image">
                    <img src={product.image} alt={`${product.name} main image`} className="product-main-image" />
                </div>
                <h2 className="text-2xl font-bold text-center text-black "><p className="text-accentColour">{product.price}$</p></h2>
                <p className="text-center">{product.description}</p>
                <button
                        type="submit"
                        className="w-full px-4 py-2 font-qbold text-white bg-accentColour rounded-md hover:bg-linkColour focus:outline-none"
                    >
                        Add to cart
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
