import { useState } from 'react';
import { FaBox, FaChartLine, FaComments, FaBell, FaCog, FaRobot, FaTimes } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import ChatBot from '../ChatBot';

const data = [
  { date: '2024-01', sales: 4000, yield: 2400 },
  { date: '2024-02', sales: 3000, yield: 1398 },
  { date: '2024-03', sales: 2000, yield: 9800 },
  { date: '2024-04', sales: 2780, yield: 3908 },
  { date: '2024-05', sales: 1890, yield: 4800 },
  { date: '2024-06', sales: 2390, yield: 3800 },
];

function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$12,345"
            icon={<FaChartLine />}
            trend="+15% vs last month"
            color="bg-green-500"
          />
          <StatCard
            title="Active Listings"
            value="8"
            icon={<FaBox />}
            trend="+2 this week"
            color="bg-blue-500"
          />
          <StatCard
            title="Crop Yield"
            value="2.5 tons"
            icon={<FaChartLine />}
            trend="+5% vs last season"
            color="bg-yellow-500"
          />
          <StatCard
            title="Advisory Sessions"
            value="3"
            icon={<FaComments />}
            trend="2 pending"
            color="bg-purple-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM')}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#2F5233" 
                    fill="#2F5233" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Crop Yield Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), 'MMM')}
                  />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="yield" 
                    stroke="#3A6B3F" 
                    fill="#3A6B3F" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary rounded-full p-2 text-white">
                    <FaBox />
                  </div>
                  <div>
                    <p className="font-medium">New order received</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <span className="text-primary font-medium">$234.00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot Button */}
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
        >
          <FaRobot size={24} />
        </button>

        {/* Chatbot Modal */}
        {showChatbot && (
          <div className="fixed bottom-18 right-8 w-96 bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">AgroLink Assistant</h3>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <ChatBot />
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">{trend}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default FarmerDashboard;