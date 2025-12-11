import { useState, useEffect } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const response = await get('/scholarships?limit=100');
      setScholarships(response.scholarships || []);
      setError('');
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError('Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (scholarship) => {
    setEditingId(scholarship._id);
    setEditData({ ...scholarship });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: field.includes('Fees') || field === 'universityWorldRank' 
        ? parseFloat(value) 
        : value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      await patch(`/scholarships/${editingId}`, editData);
      setScholarships(prev =>
        prev.map(s => s._id === editingId ? editData : s)
      );
      setEditingId(null);
      setEditData(null);
      alert('Scholarship updated successfully!');
    } catch (err) {
      console.error('Error updating scholarship:', err);
      alert('Failed to update scholarship');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`/scholarships/${id}`);
      setScholarships(prev => prev.filter(s => s._id !== id));
      setShowDeleteConfirm(null);
      alert('Scholarship deleted successfully!');
    } catch (err) {
      console.error('Error deleting scholarship:', err);
      alert('Failed to delete scholarship');
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
        <h1 className="text-3xl font-bold mb-2">Manage Scholarships</h1>
        <p className="text-gray-600">Edit or delete existing scholarships</p>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {scholarships.length === 0 ? (
        <div className="alert alert-info">
          <span>No scholarships found. Create one from the Add Scholarship page.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th>Scholarship Name</th>
                <th>University</th>
                <th>Category</th>
                <th>Degree</th>
                <th>Application Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map(scholarship => (
                <tr key={scholarship._id}>
                  <td>
                    {editingId === scholarship._id ? (
                      <input
                        type="text"
                        value={editData.scholarshipName}
                        onChange={(e) => handleEditChange('scholarshipName', e.target.value)}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      scholarship.scholarshipName
                    )}
                  </td>
                  <td>
                    {editingId === scholarship._id ? (
                      <input
                        type="text"
                        value={editData.universityName}
                        onChange={(e) => handleEditChange('universityName', e.target.value)}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      scholarship.universityName
                    )}
                  </td>
                  <td>
                    {editingId === scholarship._id ? (
                      <input
                        type="text"
                        value={editData.scholarshipCategory}
                        onChange={(e) => handleEditChange('scholarshipCategory', e.target.value)}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      scholarship.scholarshipCategory
                    )}
                  </td>
                  <td>
                    {editingId === scholarship._id ? (
                      <input
                        type="text"
                        value={editData.degree}
                        onChange={(e) => handleEditChange('degree', e.target.value)}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      scholarship.degree
                    )}
                  </td>
                  <td>
                    {editingId === scholarship._id ? (
                      <input
                        type="number"
                        value={editData.applicationFees}
                        onChange={(e) => handleEditChange('applicationFees', e.target.value)}
                        className="input input-bordered input-sm w-full"
                      />
                    ) : (
                      `$${scholarship.applicationFees}`
                    )}
                  </td>
                  <td>
                    {editingId === scholarship._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="btn btn-sm btn-success"
                        >
                          <FaCheckCircle /> Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-sm btn-ghost"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(scholarship)}
                          className="btn btn-sm btn-info"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(scholarship._id)}
                          className="btn btn-sm btn-error"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Scholarship?</h3>
            <p className="py-4">Are you sure you want to delete this scholarship? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="btn btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn"
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

export default ManageScholarships;
