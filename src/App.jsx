import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Marketplace from './pages/Marketplace';
import Advisory from './pages/Advisory';
import Delivery from './pages/Delivery';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/advisory" element={<Advisory />} />
               <Route path="/delivery" element={<Delivery />} />
            </Routes>
          </div>
          <Footer />
          <Toaster position="top-center" />
        </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
