import { Link } from 'react-router-dom';
import { FaLeaf, FaUsers, FaMobile, FaChartLine } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl mb-8">
              {t('home.hero.subtitle')}
            </p>
            <div className="space-x-4">
              <Link
                to="/signup"
                className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100"
              >
                {t('home.hero.getStarted')}
              </Link>
              <Link
                to="/marketplace"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-light"
              >
                {t('home.hero.exploreMarket')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.features.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaLeaf />}
              title={t('home.features.directMarket.title')}
              description={t('home.features.directMarket.description')}
            />
            <FeatureCard
              icon={<FaUsers />}
              title={t('home.features.expertAdvisory.title')}
              description={t('home.features.expertAdvisory.description')}
            />
            <FeatureCard
              icon={<FaMobile />}
              title={t('home.features.mobilePayments.title')}
              description={t('home.features.mobilePayments.description')}
            />
            <FeatureCard
              icon={<FaChartLine />}
              title={t('home.features.marketInsights.title')}
              description={t('home.features.marketInsights.description')}
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