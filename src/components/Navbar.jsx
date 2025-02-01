import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaGlobe } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartPanel from './CartPanel';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    const currentPath = window.location.pathname;
    
    i18n.changeLanguage(newLang).then(() => {
      if (currentPath === '/') {
        navigate(`/${newLang}`);
        return;
      }
      
      const pathSegments = currentPath.split('/');
      const currentLang = pathSegments[1] === 'en' || pathSegments[1] === 'fr' ? pathSegments[1] : null;
      const routePath = currentLang ? pathSegments.slice(2).join('/') : pathSegments.slice(1).join('/');
      
      const newPath = routePath ? `/${newLang}/${routePath}` : `/${newLang}`;
      navigate(newPath);
    });
  };

  const cartItemCount = cart?.length || 0;

  return (
    <nav className="bg-primary-dark text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${i18n.language}`} className="text-xl font-bold">
            {t('common.brand')}
          </Link>
          
          {/* Mobile cart and menu buttons */}
          <div className="md:hidden flex items-center space-x-6">
            <Link to={user ? `/${i18n.language}/dashboard` : `/${i18n.language}/login`} className="hover:text-gray-300">
              <FaUser size={20} />
            </Link>
            <button onClick={toggleLanguage} className="hover:text-gray-300">
              <FaGlobe size={20} /> <span>{i18n.language === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-gray-300">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="hover:text-gray-300">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to={`/${i18n.language}`} className="hover:text-gray-300">{t('nav.home')}</Link>
            <Link to={`/${i18n.language}/marketplace`} className="hover:text-gray-300">{t('nav.marketplace')}</Link>
            <Link to={`/${i18n.language}/advisory`} className="hover:text-gray-300">{t('nav.advisory')}</Link>
            {user && <Link to={`/${i18n.language}/dashboard`} className="hover:text-gray-300">Dashboard</Link>}
          </div>
          
          {/* Cart and Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="hover:text-gray-300">
              <FaGlobe size={20} /> <span>{i18n.language === 'en' ? 'FR' : 'EN'}</span>
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-gray-300">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {user ? (
              <>
                <Link to={`/${i18n.language}/dashboard`} className="hover:text-gray-300 flex items-center space-x-2">
                  <FaUser /> <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-100">
                  Logout
                </button>
              </>
            ) : (
              <Link to={`/${i18n.language}/login`} className="hover:text-gray-300 flex items-center space-x-2">
                <FaUser /> <span>{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 flex flex-col space-y-4">
            <Link to={`/${i18n.language}`} className="hover:text-gray-300">{t('nav.home')}</Link>
            <Link to={`/${i18n.language}/marketplace`} className="hover:text-gray-300">{t('nav.marketplace')}</Link>
            <Link to={`/${i18n.language}/advisory`} className="hover:text-gray-300">{t('nav.advisory')}</Link>
          </div>
        )}
        
        {/* Cart panel */}
        <CartPanel isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>
    </nav>
  );
}

export default Navbar;
