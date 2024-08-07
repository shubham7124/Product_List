import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader'; // Import the Loader component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(''); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 8;
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('authToken'); // Get token from localStorage

      if (!token) {
        navigate('/login'); // Redirect to login if token is not found
        return;
      }

      try {
        const response = await fetch('https://intern-task-api.bravo68web.workers.dev/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products:', response.statusText);
          if (response.status === 401) {
            localStorage.removeItem('authToken'); // Clear token if unauthorized
            navigate('/login'); // Redirect to login
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, [navigate]);

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4">
      {loading ? (
        <Loader /> // Show loader while fetching
      ) : (
        <>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found</p> // Message when no products match the search
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-300 rounded mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
