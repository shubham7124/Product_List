import React from 'react';
import ProductList from '../Component/Product/ProductList';

const ProductListing = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <ProductList />
    </div>
  );
};

export default ProductListing;
