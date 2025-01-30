import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
              {/* Default English routes */}
              <Route path="/" element={<Navigate to="/en" />} />
              <Route path="/en" element={<Home />} />
              <Route path="/en/login" element={<Login />} />
              <Route path="/en/signup" element={<Signup />} />
              <Route
                path="/en/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/en/marketplace" element={<Marketplace />} />
              <Route path="/en/advisory" element={<Advisory />} />
              <Route path="/en/delivery" element={<Delivery />} />

              {/* French routes */}
              <Route path="/fr" element={<Home />} />
              <Route path="/fr/login" element={<Login />} />
              <Route path="/fr/signup" element={<Signup />} />
              <Route
                path="/fr/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/fr/contact" element={<Contact />} />
              <Route path="/fr/marketplace" element={<Marketplace />} />
              <Route path="/fr/advisory" element={<Advisory />} />
              <Route path="/fr/delivery" element={<Delivery />} />

              {/* Legacy routes for backward compatibility */}
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
