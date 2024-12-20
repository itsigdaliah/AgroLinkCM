import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">AgroLink CM</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/marketplace" className="hover:text-gray-300">Marketplace</Link>
            <Link to="/advisory" className="hover:text-gray-300">Advisory</Link>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 hover:bg-primary-light rounded-md">Home</Link>
              <Link to="/marketplace" className="block px-3 py-2 hover:bg-primary-light rounded-md">Marketplace</Link>
              <Link to="/advisory" className="block px-3 py-2 hover:bg-primary-light rounded-md">Advisory</Link>
              <Link to="/login" className="block px-3 py-2 hover:bg-primary-light rounded-md">Login</Link>
              <Link to="/signup" className="block px-3 py-2 bg-white text-primary rounded-md">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;