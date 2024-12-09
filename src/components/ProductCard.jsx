import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-bold">{product.name}</h2>
      <div className="h-48 w-full flex items-center justify-center rounded mt-2 mb-2">
        <img
          src={product.imageId}
          alt={`${product.name}`}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="text-lg text-accentColour font-bold">{product.price}$</p>
    </Link>
  );
};


export default ProductCard;
