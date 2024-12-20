import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaMobile, FaChartLine } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting Farmers to Success
            </h1>
            <p className="text-xl mb-8">
              Join Cameroon's leading agricultural marketplace and advisory platform
            </p>
            <div className="space-x-4">
              <Link
                to="/signup"
                className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                to="/marketplace"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-light"
              >
                Explore Market
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgroLink CM?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLeaf />}
              title="Direct Market Access"
              description="Connect directly with buyers and get better prices for your produce"
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Expert Advisory"
              description="Get real-time farming advice from agricultural experts"
            />
            <FeatureCard
              icon={<FaMobile />}
              title="Mobile Payments"
              description="Secure and easy payments with MTN and Orange Money"
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Market Insights"
              description="Access real-time market prices and trends"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-primary text-4xl mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;