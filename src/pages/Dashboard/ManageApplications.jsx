import { useState, useEffect } from 'react';
import { get, patch } from '../../utils/apiClient';
import { FaSearch, FaEye, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Show All');
  const [paymentFilter, setPaymentFilter] = useState('Payment All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPaymentStatus, setNewPaymentStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await get('/applications');
      console.log('Applications response:', response); // Debug log
      setApplications(response.data || response.applications || []);
      setError('');
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Make sure you are logged in as a Moderator or Admin.');
    } finally {
      setLoading(false);
    }
  };

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      !searchQuery ||
      app.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.universityName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'Show All' || app.applicationStatus === statusFilter.toLowerCase();
    const matchesPayment = paymentFilter === 'Payment All' || app.paymentStatus === paymentFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleOpenFeedback = (app) => {
    setSelectedApp(app);
    setNewStatus(app.applicationStatus || 'pending');
    setNewPaymentStatus(app.paymentStatus || 'pending');
    setFeedbackText(app.feedback || '');
    setShowFeedbackModal(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedApp(null);
    setFeedbackText('');
    setNewStatus('');
    setNewPaymentStatus('');
  };

  const handleSaveFeedback = async () => {
    if (!selectedApp) return;

    setSaving(true);
    try {
      // Use role-specific endpoints; the generic update route only works for students with pending apps
      await Promise.all([
        patch(`/applications/${selectedApp._id}/status`, { applicationStatus: newStatus }),
        patch(`/applications/${selectedApp._id}/payment`, { paymentStatus: newPaymentStatus }),
        patch(`/applications/${selectedApp._id}/feedback`, { feedback: feedbackText })
      ]);

      const updates = {
        applicationStatus: newStatus,
        paymentStatus: newPaymentStatus,
        feedback: feedbackText
      };

      setApplications(prev =>
        prev.map(app =>
          app._id === selectedApp._id ? { ...app, ...updates } : app
        )
      );

      alert('Application updated successfully!');
      handleCloseFeedback();
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
      processing: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Processing' },
      pending: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Pending' },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' },
      approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Approved' }
    };
    const style = statusMap[status] || statusMap.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>{style.label}</span>;
  };

  const getPaymentBadge = (status) => {
    const statusMap = {
      paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid' },
      pending: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Pending' },
      failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Failed' },
      unpaid: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unpaid' }
    };
    const style = statusMap[status] || statusMap.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>{style.label}</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Applications</h1>
          <p className="text-sm text-gray-600 mt-1">Review, update status, and manage all scholarship applications</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-200 font-semibold flex items-center gap-2 transition-all">
          <FaDownload /> Export Data
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or university"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
          >
            <option>Show All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
          >
            <option>Payment All</option>
            <option>Payment Paid</option>
            <option>Payment Pending</option>
            <option>Payment Failed</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm font-semibold text-gray-700">
        Showing {filteredApplications.length} of {applications.length} applications
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Applicant Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">University</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Application Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Payment Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Feedback</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app, idx) => (
                  <tr key={app._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{app.applicantName || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{app.applicantEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{app.universityName}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.applicationStatus)}</td>
                    <td className="px-6 py-4">{getPaymentBadge(app.paymentStatus)}</td>
                    <td className="px-6 py-4">
                      {app.feedback ? (
                        <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                          View Feedback
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenFeedback(app)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Add Feedback"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-600">Showing 1-4 of 28 applications</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-8 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Add Feedback & Update Status</h2>

            <div className="space-y-6">
              {/* Applicant Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Applicant</p>
                <p className="font-semibold text-gray-900">{selectedApp.applicantName}</p>
                <p className="text-sm text-gray-600">{selectedApp.applicantEmail}</p>
              </div>

              {/* Application Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <select
                  value={newPaymentStatus}
                  onChange={(e) => setNewPaymentStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback/Notes</label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Add your feedback here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSaveFeedback}
                disabled={saving}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCloseFeedback}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
