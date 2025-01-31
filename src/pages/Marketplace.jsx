import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import productsData from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { productTranslations } from '../data/translations';

function Marketplace() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState(() => {
    const translatedProducts = productTranslations[i18n.language].products.map(translatedProduct => {
      const baseProduct = productsData.find(p => p.id === translatedProduct.id);
      return {
        ...baseProduct,
        name: translatedProduct.name,
        description: translatedProduct.description,
        category: translatedProduct.category,
        unit: translatedProduct.unit
      };
    });
    return translatedProducts;
  });
  const {user} = useAuth()
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
  const { cart, addToCart, setCart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    console.log("added to card")
    console.log("user here: ", user)
    addToCart(product);
    toast.success(t('marketplace.addedToCart', { name: product.name }));
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
          <h1 className="text-4xl font-bold text-gray-900">{t('marketplace.title')}</h1>
          <p className="mt-4 text-lg text-gray-600">{t('marketplace.subtitle')}</p>
        </div>

        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaPlus className="mr-2" />
            {t('marketplace.addProduct')}
          </button>
        </div>

        <AddProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          formData={formData}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>


      </div>
    </div>
  );
}

export default Marketplace;
