import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../utils/apiClient';
import { FaSearch, FaBell } from 'react-icons/fa';

const StudentDashboard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await get('/scholarships?limit=3');
      setScholarships(response.data || []);
    } catch (err) {
      console.error('Failed to fetch scholarships');
    } finally {
      setLoading(false);
    }
  };

  const filters = ['All', 'Recommended', 'Merit-based', 'Need-based', 'Full-ride'];

  const getBadgeColor = (badge) => {
    if (badge === 'New') return 'bg-green-100 text-green-700';
    if (badge === 'Popular') return 'bg-yellow-100 text-yellow-700';
    return 'bg-blue-100 text-blue-700';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Dashboard / <span className="text-gray-900 font-medium">Scholarships</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Find Your Next Opportunity</h1>
            <p className="text-gray-600">Explore thousands of scholarships tailored to your profile and aspirations.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar (full width) */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for scholarships by name or keyword"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Scholarships Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Scholarship Card 1 - Innovators in STEM */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Innovators in STEM Scholarship</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                New
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              For students pursuing a degree in Science, Technology, Engineering, or Math.
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">$10,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Due: Dec 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-gray-600">Tech Foundation</p>
              <Link
                to="/scholarships/1"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Scholarship Card 2 - Future Artists Grant */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Future Artists Grant</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              Supporting young artists in visual and performing arts. Portfolio required.
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">$5,000</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Due: Jan 31, 2025</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-gray-600">Creative Council</p>
              <Link
                to="/scholarships/2"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Scholarship Card 3 - Community Leader Award */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Community Leader Award</h3>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                Popular
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              Recognizing students with outstanding community service and leadership skills.
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-blue-600">$2,500</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Due: Nov 20, 2024</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-gray-600">Civic Duty Org</p>
              <Link
                to="/scholarships/3"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
