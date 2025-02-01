import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartPanel from './CartPanel';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

  const cartItemCount = cart?.length || 0;

  return (
    <nav className="bg-primary-dark text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">AgroLink CM</span>
          </Link>
          
          {/* Mobile cart and menu buttons */}
          <div className="md:hidden flex items-center space-x-6">
            {user ? (
              <Link to="/dashboard" className="hover:text-gray-300">
                <FaUser size={20} />
              </Link>
            ) : (
              <Link to="/login" className="hover:text-gray-300">
                <FaUser size={20} />
              </Link>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:text-gray-300 relative"
            >
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/marketplace" className="hover:text-gray-300">Marketplace</Link>
            <Link to="/advisory" className="hover:text-gray-300">Advisory</Link>
            {user && (<Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>)}
          </div>

          {/* Cart and Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="hover:text-gray-300">
                    <div className="flex items-center space-x-2">
                      <FaUser />
                      <span>{user.name}</span>
                    </div>
                  </Link>

                  <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-gray-300 relative"
                >
                  <FaShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                  
                  <button
                    onClick={handleLogout}
                    className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-gray-300 relative"
                >
                  <FaShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <Link to="/login" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="fixed left-0 right-0 top-16 z-40">
            <div className="absolute inset-0 min-h-screen bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
            <div className="relative bg-primary-dark bg-opacity-95">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  to="/" 
                  className="block px-3 py-2 hover:bg-primary-light rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/marketplace" 
                  className="block px-3 py-2 hover:bg-primary-light rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>
                <Link 
                  to="/advisory" 
                  className="block px-3 py-2 hover:bg-primary-light rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Advisory
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block px-3 py-2 hover:bg-primary-light rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <FaUser />
                        <span>{user.name}</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 bg-white text-primary rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}

export default Navbar;