import { useState } from 'react';
import { FaBox, FaChartLine, FaComments, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.welcome', { name: user.name })}</h1>
              <p className="text-gray-600 capitalize">{t(`dashboard.roles.${user.role}`)}</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary" title={t('dashboard.notifications')}>
                <FaBell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary" title={t('dashboard.settings')}>
                <FaCog size={20} />
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt />
                <span>{t('dashboard.logout')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title={t('dashboard.stats.listings')}
            value="12"
            icon={<FaBox />}
            trend={t('dashboard.stats.listingsTrend', { count: 2 })}
          />
          <StatCard
            title={t('dashboard.stats.sales')}
            value="$1,234"
            icon={<FaChartLine />}
            trend={t('dashboard.stats.salesTrend', { percent: 15 })}
          />
          <StatCard
            title={t('dashboard.stats.advisory')}
            value="5"
            icon={<FaComments />}
            trend={t('dashboard.stats.advisoryTrend', { count: 3 })}
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
                {t('dashboard.tabs.overview')}
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'listings'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('listings')}
              >
                {t('dashboard.tabs.listings')}
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'advisory'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('advisory')}
              >
                {t('dashboard.tabs.advisory')}
              </button>
            </nav>
          </div>
          <div className="p-6">
            <p className="text-gray-600">{t('dashboard.content', { tab: t(`dashboard.tabs.${activeTab}`) })}</p>
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