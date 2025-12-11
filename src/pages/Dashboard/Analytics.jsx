import { useState, useEffect } from 'react';
import { get } from '../../utils/apiClient';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaBook, FaDollarSign, FaClipboardList } from 'react-icons/fa';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [universityData, setUniversityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      try {
        const statsResponse = await get('/analytics/stats');
        setStats(statsResponse);
      } catch (err) {
        console.warn('Stats endpoint not available:', err);
      }

      // Fetch applications by university
      try {
        const universityResponse = await get('/analytics/applications-by-university');
        if (universityResponse.data) {
          setUniversityData(universityResponse.data);
        }
      } catch (err) {
        console.warn('University analytics not available:', err);
      }

      // Fetch applications by category
      try {
        const categoryResponse = await get('/analytics/applications-by-category');
        if (categoryResponse.data) {
          setCategoryData(categoryResponse.data);
        }
      } catch (err) {
        console.warn('Category analytics not available:', err);
      }

      setError('');
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Platform statistics and insights</p>
      </div>

      {error && (
        <div className="alert alert-warning mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <h2 className="text-3xl font-bold">{stats.totalUsers || 0}</h2>
                </div>
                <FaUsers className="text-4xl text-blue-500 opacity-20" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Scholarships</p>
                  <h2 className="text-3xl font-bold">{stats.totalScholarships || 0}</h2>
                </div>
                <FaBook className="text-4xl text-green-500 opacity-20" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Applications</p>
                  <h2 className="text-3xl font-bold">{stats.totalApplications || 0}</h2>
                </div>
                <FaClipboardList className="text-4xl text-purple-500 opacity-20" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Fees Collected</p>
                  <h2 className="text-3xl font-bold">${(stats.totalFeesCollected || 0).toFixed(2)}</h2>
                </div>
                <FaDollarSign className="text-4xl text-green-600 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Applications by University */}
        {universityData.length > 0 && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Applications by University</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={universityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="universityName" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Applications by Category */}
        {categoryData.length > 0 && (
          <div className="card bg-base-100 shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Applications by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="count"
                  nameKey="scholarshipCategory"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Empty State */}
      {!stats && universityData.length === 0 && categoryData.length === 0 && (
        <div className="alert alert-info">
          <span>No analytics data available yet. Users need to apply for scholarships to generate analytics.</span>
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchAnalyticsData}
          className="btn btn-primary"
        >
          Refresh Analytics
        </button>
      </div>
    </div>
  );
};

export default Analytics;
