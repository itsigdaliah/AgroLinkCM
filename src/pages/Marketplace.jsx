import React, { useState } from 'react';
import axios from 'axios';

function Marketplace() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomatoes', price: 50, description: 'Fresh organic tomatoes' },
    { id: 2, name: 'Corn', price: 150, description: 'Sweet corn' },
    { id: 3, name: 'Wheat', price: 200, description: 'High-quality wheat' },
    { id: 4, name: 'Carrots', price: 50, description: 'Crunchy carrots' },
    { id: 5, name: 'Potatoes', price: 125, description: 'Organic potatoes' },
    { id: 6, name: 'Lettuce', price: 25, description: 'Fresh lettuce' },
    { id: 7, name: 'Onions', price: 50, description: 'Red onions' },
    { id: 8, name: 'Peppers', price: 25, description: 'Green peppers' },
    { id: 9, name: 'Cucumbers', price: 100, description: 'Crisp cucumbers' },
    { id: 10, name: 'Apples', price: 200, description: 'Juicy apples' },
  ]);

  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
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
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', price: '', description: '' });
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
        alert(`Payment successful through ${service}:
          Total Amount: ${totalAmount} CFA
          Fee (2%): ${fee} CFA
          Amount to Farmer: ${farmerAmount} CFA`);
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

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (CFA)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Add Product
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="mt-2 text-gray-600">{product.price} CFA</p>
              <p className="mt-2 text-gray-600">{product.description}</p>
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  required
                />
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
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
