import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import productsData from '../data/products';

function Marketplace() {
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    unit: '',
    stock: '',
    image: ''
  });
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      seller: {
        id: 1, // This should come from authenticated user
        name: 'John Doe',
        rating: 4.5
      }
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      price: '',
      description: '',
      category: '',
      unit: '',
      stock: '',
      image: ''
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleAddToCart = (product) => {
    const cartItem = { ...product, quantity: parseInt(quantity) };
    setCart([...cart, cartItem]);
  };

  const handleCheckout = async (service) => {
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const fee = totalAmount * 0.02;
    const farmerAmount = totalAmount - fee;

    try {
      let response;
      if (service === 'MTN Mobile Money') {
        response = await axios.post('https://api.mtn.com/v1/payments', {
          amount: totalAmount,
          currency: 'CFA',
          externalId: '123456',
          payer: {
            partyIdType: 'MSISDN',
            partyId: '256774290781'
          },
          payerMessage: 'Payment for agricultural products',
          payeeNote: 'Payment received'
        }, {
          headers: {
            'X-Reference-Id': 'your-reference-id',
            'X-Target-Environment': 'sandbox',
            'Ocp-Apim-Subscription-Key': 'your-subscription-key'
          }
        });
      } else if (service === 'Orange Money') {
        response = await axios.post('https://api.orange.com/v1/payments', {
          amount: totalAmount,
          currency: 'CFA',
          externalId: '123456',
          payer: {
            partyIdType: 'MSISDN',
            partyId: '256774290781'
          },
          payerMessage: 'Payment for agricultural products',
          payeeNote: 'Payment received'
        }, {
          headers: {
            'Authorization': 'Bearer your-access-token',
            'X-Reference-Id': 'your-reference-id',
            'X-Target-Environment': 'sandbox'
          }
        });
      }

      if (response.status === 200) {
        alert(`Payment successful through ${service}:\n          Total Amount: ${totalAmount} CFA\n          Fee (2%): ${fee} CFA\n          Amount to Farmer: ${farmerAmount} CFA`);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }

    // Clear cart after checkout
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-4 text-lg text-gray-600">Browse and purchase agricultural products</p>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaPlus className="mr-2" />
            Add Product
          </button>
        </div>

        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
          {cart.length === 0 ? (
            <p className="mt-4 text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="mt-4">
              {cart.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="mt-2 text-gray-600">{item.price} CFA x {item.quantity}</p>
                  <p className="mt-2 text-gray-600">Total: {item.price * item.quantity} CFA</p>
                </div>
              ))}
              <div className="mt-6">
                <button
                  onClick={() => handleCheckout('MTN Mobile Money')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-4"
                >
                  Checkout with MTN Mobile Money
                </button>
                <button
                  onClick={() => handleCheckout('Orange Money')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Checkout with Orange Money
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
