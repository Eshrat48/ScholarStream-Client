import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaDollarSign, FaEye } from 'react-icons/fa';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await get('/applications/my-applications');
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
    const badges = {
      pending: 'badge-warning',
      processing: 'badge-info',
      completed: 'badge-success',
      rejected: 'badge-error',
    };
    return badges[status] || 'badge-ghost';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <Link to="/scholarships" className="btn btn-primary">
          Apply for Scholarships
        </Link>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-4">You haven't applied to any scholarships yet</p>
          <Link to="/scholarships" className="btn btn-primary">
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>University</th>
                <th>Subject</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div>
                      <div className="font-bold">{app.universityName}</div>
                      <div className="text-sm text-gray-600">{app.scholarshipCategory}</div>
                    </div>
                  </td>
                  <td>{app.subjectCategory || 'N/A'}</td>
                  <td>${app.applicationFees}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(app.applicationStatus)}`}>
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td>
                    <div className="max-w-xs truncate">
                      {app.feedback || 'No feedback yet'}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="btn btn-ghost btn-xs"
                        title="View Details"
                      >
                        <FaEye />
                      </button>

                      {app.applicationStatus === 'pending' && (
                        <>
                          {app.paymentStatus === 'unpaid' && (
                            <Link
                              to={`/checkout/${app.scholarshipId}`}
                              className="btn btn-primary btn-xs"
                              title="Pay"
                            >
                              <FaDollarSign />
                            </Link>
                          )}
                          
                          <button
                            onClick={() => handleDelete(app._id)}
                            className="btn btn-error btn-xs"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      {selectedApp && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Application Details</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">University</p>
                <p className="font-semibold">{selectedApp.universityName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scholarship Category</p>
                <p className="font-semibold">{selectedApp.scholarshipCategory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Application Date</p>
                <p>{new Date(selectedApp.applicationDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`badge ${getStatusBadge(selectedApp.applicationStatus)}`}>
                  {selectedApp.applicationStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Feedback</p>
                <p>{selectedApp.feedback || 'No feedback provided yet'}</p>
              </div>
            </div>

            <div className="modal-action">
              <button onClick={() => setSelectedApp(null)} className="btn">Close</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedApp(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
