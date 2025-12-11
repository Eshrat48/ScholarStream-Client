import { useState, useEffect } from 'react';
import { get, patch } from '../../utils/apiClient';
import { APPLICATION_STATUS } from '../../utils/constants';
import { FaCheckCircle, FaTimesCircle, FaComments } from 'react-icons/fa';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await get('/applications');
      setApplications(response.applications || []);
      setError('');
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (application) => {
    setSelectedApp(application);
    setNewStatus(application.status || 'pending');
    setFeedbackText(application.feedback || '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApp(null);
    setFeedbackText('');
    setNewStatus('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;

    try {
      // Update status
      if (newStatus !== selectedApp.status) {
        await patch(`/applications/${selectedApp._id}/status`, { status: newStatus });
      }

      // Update feedback
      if (feedbackText.trim()) {
        await patch(`/applications/${selectedApp._id}/feedback`, { feedback: feedbackText });
      }

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app._id === selectedApp._id
            ? { ...app, status: newStatus, feedback: feedbackText }
            : app
        )
      );

      alert('Application updated successfully!');
      handleCloseModal();
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'processing':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'rejected':
        return 'badge-error';
      default:
        return 'badge-default';
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Manage Applications</h1>
        <p className="text-gray-600">Review and manage scholarship applications</p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="alert alert-info">
          <span>No applications found.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th>Applicant Email</th>
                <th>Scholarship</th>
                <th>University</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td className="font-medium">{app.applicantEmail}</td>
                  <td>{app.scholarshipName}</td>
                  <td>{app.universityName}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeColor(app.status)}`}>
                      {app.status || 'pending'}
                    </span>
                  </td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleOpenModal(app)}
                      className="btn btn-sm btn-primary"
                    >
                      <FaComments /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {showModal && selectedApp && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Review Application</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Applicant Email</p>
                <p className="font-semibold">{selectedApp.applicantEmail}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Scholarship</p>
                  <p className="font-semibold">{selectedApp.scholarshipName}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">University</p>
                  <p className="font-semibold">{selectedApp.universityName}</p>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Status</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="select select-bordered"
                >
                  {Object.values(APPLICATION_STATUS).map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Feedback/Notes</span>
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Add feedback or notes for the applicant..."
                  className="textarea textarea-bordered h-32"
                ></textarea>
              </div>
            </div>

            <div className="modal-action mt-6">
              <button
                onClick={handleUpdateStatus}
                className="btn btn-success"
              >
                <FaCheckCircle /> Update Application
              </button>
              <button
                onClick={handleCloseModal}
                className="btn btn-ghost"
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
