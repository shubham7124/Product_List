import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Component/AuthContext';

const Layout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    logout(); // Use context to logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product App</h1>
          <div>
            <Link to="/" className="mr-4">Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/products" className="mr-4">Products</Link>
                <button onClick={handleLogout} className="mr-4">Logout</button>
              </>
            ) : (
              <>
                <Link to="/products" className="mr-4">Products</Link>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto flex-grow p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Product App
      </footer>
    </div>
  );
};

export default Layout;
