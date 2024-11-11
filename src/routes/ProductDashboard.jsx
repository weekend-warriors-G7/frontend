import React from 'react';
import PropTypes from 'prop-types';
import Product from '../domain/Product';

const ProductDashboard = ({ product }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-bgColour">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-black">{product.name}</h2>
                {/* <img src={product.thumbnail} alt={`${product.name} thumbnail`} className="product-thumbnail" /> */}
                <div className="product-image">
                    <img src={product.image} alt={`${product.name} main`} className="product-main-image" />
                </div>
                <h2 className="text-2xl font-bold text-center text-black "><p className="text-accentColour">{product.price}$</p></h2>
                <p className="text-center">{product.description}</p>
                
                <div className="tags flex justify-around">
                    <div className="left">
                        <p className="text-center">Type <span className="text-accentColour font-bold">{product.clothingType}</span></p>
                        <p className="text-center">Size <span className="text-accentColour font-bold">{product.size}</span></p>
                    </div>

                    <div className="right">
                        <p className="text-center">Material <span className="text-accentColour font-bold">{product.material}</span></p>
                        <p className="text-center">Colour <span className="text-accentColour font-bold">{product.colour}</span></p>
                    </div>
                </div>
                
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
