import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-lg text-red-500 transform -rotate-12 inline-block">${product.price}</p>
    </div>
  );
};

export default ProductCard;
