import React, { useEffect, useRef } from 'react';
import { FaTimes, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPanel({ isOpen, onClose }) {
  const panelRef = useRef();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = (service) => {
    const fee = totalAmount * 0.02;
    const farmerAmount = totalAmount - fee;

    alert(`Payment successful through ${service}:\n          Total Amount: ${totalAmount} CFA\n          Fee (2%): ${fee} CFA\n          Amount to Farmer: ${farmerAmount} CFA`);
    clearCart();
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      <div
        ref={panelRef}
        className={`fixed inset-y-0 right-0 w-4/5 sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">
              Shopping Cart ({cart.length} item{cart.length !== 1 ? 's' : ''})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <FaShoppingCart size={48} className="mb-4" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm mb-4">Add some products to get started</p>
                <Link to="/marketplace" className="btn-primary" onClick={onClose}>
                  Browse available products
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border rounded-lg p-2 shadow-sm"
                  >
                    <div className="flex space-x-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">
                            {item.name} ({item.price} CFA/kg)
                          </h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center border rounded-md w-fit px-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-gray-700 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-gray-700 border-x">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-gray-700 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                            <div className="text-primary text-sm">
                              Total: {item.price * item.quantity} CFA
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{totalAmount} CFA</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => handleCheckout('MTN Mobile Money')}
                  className="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Checkout with MTN Mobile Money
                </button>
                <button
                  onClick={() => handleCheckout('Orange Money')}
                  className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Checkout with Orange Money
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPanel;