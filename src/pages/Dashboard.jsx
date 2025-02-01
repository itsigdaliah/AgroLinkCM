import { useAuth } from '../context/AuthContext';
import FarmerDashboard from '../components/dashboard/FarmerDashboard';
import BuyerDashboard from '../components/dashboard/BuyerDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';

function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  return renderDashboard();
}

export default Dashboard;