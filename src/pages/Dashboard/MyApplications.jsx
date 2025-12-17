import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaDollarSign, FaEye, FaSearch } from 'react-icons/fa';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await get(`/applications/user/${user?.email}`);
      setApplications(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await deleteRequest(`/applications/${id}`);
      fetchApplications();
    } catch (err) {
      alert('Failed to delete application');
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return statusStyles[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  const filters = ['All', 'Pending', 'Approved', 'Rejected', 'Completed'];

  const filteredApplications = applications.filter(app => {
    const matchesFilter = activeFilter === 'All' || app.applicationStatus?.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = app.universityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.subjectCategory?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">My Applications</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by university, status, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-900 placeholder:text-gray-400"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {filteredApplications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg mb-4">
            {searchQuery || activeFilter !== 'All' 
              ? 'No applications match your search or filter'
              : "You haven't applied to any scholarships yet"}
          </p>
          <Link
            to="/scholarships"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      University Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Application Fees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Feedback
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((app, index) => (
                    <tr key={app._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {app.universityName || 'Unknown University'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.universityAddress || app.universityCity || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {app.subjectCategory || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-medium">
                          ${app.applicationFees || '0'}
                        </div>
                        <div className="text-xs text-gray-500">
                          ({app.paymentStatus || 'Unpaid'})
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.applicationStatus)}`}>
                          {app.applicationStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs text-sm text-gray-600">
                          {app.feedback || 'No feedback yet'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {app.paymentStatus === 'unpaid' && (
                            <button
                              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                              title="Pay"
                            >
                              Pay
                            </button>
                          )}
                          
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowDetailsModal(true);
                            }}
                            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
                            title="View Details"
                          >
                            Details
                          </button>

                          {(app.applicationStatus === 'pending' || app.applicationStatus === 'Pending') && (
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded hover:bg-red-200 transition-colors"
                              title="Cancel Application"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {filteredApplications.length} of {applications.length} Entries
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                3
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Scholarship Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Scholarship Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Scholarship Name:</span>
                    <p className="font-medium text-gray-900">{selectedApp.scholarshipName || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">University:</span>
                    <p className="font-medium text-gray-900">{selectedApp.universityName || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <p className="font-medium text-gray-900">{selectedApp.scholarshipCategory || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Degree:</span>
                    <p className="font-medium text-gray-900">{selectedApp.degree || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Subject:</span>
                    <p className="font-medium text-gray-900">{selectedApp.subjectCategory || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Application Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Application Status:</span>
                    <p className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getStatusBadge(selectedApp.applicationStatus)}`}>
                      {selectedApp.applicationStatus || 'Pending'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Status:</span>
                    <p className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                      selectedApp.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedApp.paymentStatus || 'Unpaid'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Application Date:</span>
                    <p className="font-medium text-gray-900">
                      {selectedApp.applicationDate ? new Date(selectedApp.applicationDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Application Fee:</span>
                    <p className="font-medium text-gray-900">${selectedApp.applicationFees || 0}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Service Charge:</span>
                    <p className="font-medium text-gray-900">${selectedApp.serviceCharge || 0}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Paid:</span>
                    <p className="font-bold text-blue-600">
                      ${((selectedApp.applicationFees || 0) + (selectedApp.serviceCharge || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {selectedApp.feedback && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Feedback</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    {selectedApp.feedback}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
