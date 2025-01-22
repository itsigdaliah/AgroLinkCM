import { useState } from 'react';
import { FaBox, FaChartLine, FaComments, FaBell, FaCog } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
              <p className="text-gray-600 capitalize">{user.role}</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary">
                <FaBell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary">
                <FaCog size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Listings"
            value="12"
            icon={<FaBox />}
            trend="+2 this week"
          />
          <StatCard
            title="Total Sales"
            value="$1,234"
            icon={<FaChartLine />}
            trend="+15% vs last month"
          />
          <StatCard
            title="Advisory Sessions"
            value="5"
            icon={<FaComments />}
            trend="3 pending"
          />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <nav className="flex">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'listings'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('listings')}
              >
                Listings
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'advisory'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('advisory')}
              >
                Advisory
              </button>
            </nav>
          </div>
          <div className="p-6">
            {/* Content will change based on activeTab */}
            <p className="text-gray-600">Dashboard content for {activeTab} tab</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-600">{trend}</p>
    </div>
  );
}

export default Dashboard;