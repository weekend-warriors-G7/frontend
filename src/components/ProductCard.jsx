import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-bold">{product.name}</h2>
      <img
        src={product.imageId}
        alt={`${product.name}`}
        className="h-48 w-full object-cover"
      />
      <p className="text-lg text-accentColour">{product.price}$</p>
    </Link>
  );
};

export default ProductCard;
