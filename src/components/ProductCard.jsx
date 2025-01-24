import React from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

function ProductCard({ product, onAddToCart, quantity, onQuantityChange }) {
  const { name, price, description, image, category, unit, stock, seller } = product;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={image || '/images/products/placeholder.jpg'}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
          {category}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-base font-semibold text-primary">{price} CFA/{unit}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        <div className="mb-3">
          <span className="text-sm text-gray-500">Seller: {seller.name}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            Stock: {stock} {unit}s
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={quantity}
            onChange={onQuantityChange}
            className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[...Array(20)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={() => onAddToCart(product)}
            disabled={stock === 0}
            className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;