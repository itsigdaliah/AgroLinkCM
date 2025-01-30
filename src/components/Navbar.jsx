import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartPanel from './CartPanel';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
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
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm font-medium hover:text-gray-300"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
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
            <Link to="/delivery" className="hover:text-gray-300">Delivery</Link>
          </div>

          {/* Cart and Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm font-medium hover:text-gray-300"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
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
            {user ? (
              <Link to="/dashboard" className="hover:text-gray-300">
                <div className="flex items-center space-x-2">
                  <FaUser />
                  <span>{user.name}</span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100">
                Login
              </Link>
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
                <Link 
                  to="/delivery" 
                  className="block px-3 py-2 hover:bg-primary-light rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Delivery
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

                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
      {isCartOpen && <CartPanel onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
}

export default Navbar;
