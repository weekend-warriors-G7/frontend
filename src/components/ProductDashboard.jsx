import React from 'react';
import PropTypes from 'prop-types';
import Product from './../domain';
import ProductTag from './../domain';

const ProductDisplay = ({ product }) => {
    return (
        <div className="product-display">
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ${product.price}</p>
            <img src={product.thumbnail} alt={`${product.name} thumbnail`} className="product-thumbnail" />
            <p><strong>Description:</strong> {product.description}</p>

            <div className="product-image">
                <h3>Image</h3>
                <img src={product.image} alt={`${product.name} main image`} className="product-main-image" />
            </div>

            <div className="product-tags">
                <h3>Tags</h3>
                <ul>
                    {product.tags.map((tag, index) => (
                        <li key={index}>
                            <strong>Size:</strong> {tag.size}, 
                            <strong> Type:</strong> {tag.clothingType}, 
                            <strong> Material:</strong> {tag.material}, 
                            <strong> Color:</strong> {tag.colour}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Define propTypes to ensure product is an instance of Product
ProductDisplay.propTypes = {
    product: PropTypes.instanceOf(Product).isRequired,
};

export default ProductDisplay;
