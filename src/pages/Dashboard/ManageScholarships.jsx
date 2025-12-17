import { useState, useEffect } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { FaEdit, FaTrash, FaCheckCircle, FaPlus, FaSearch } from 'react-icons/fa';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const filtered = scholarships
    .filter(s => !search || s.scholarshipName?.toLowerCase().includes(search.toLowerCase()) || s.universityName?.toLowerCase().includes(search.toLowerCase()))
    .filter(s => statusFilter === 'All' || (statusFilter === 'Open' ? !s.isClosed : s.isClosed));

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30 p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Scholarships</h1>
          <p className="text-sm text-gray-600 mt-1">Search, filter, edit, and remove scholarships</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 shadow-md shadow-blue-200 transition-all">
          <FaPlus /> Add New Scholarship
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
        <div className="relative flex-1 min-w-[220px] max-w-xl">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, provider, etc."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-blue-50 text-blue-800 border border-blue-200 rounded-lg px-4 py-3 text-sm">
          No scholarships found. Create one from the Add Scholarship page.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Scholarship Name</th>
                <th className="px-4 py-3">University</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">Application Fee</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((scholarship) => {
                const isEditingRow = editingId === scholarship._id;
                const deadline = scholarship.applicationDeadline || scholarship.deadline;
                const isClosed = scholarship.isClosed || false;
                return (
                  <tr key={scholarship._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {isEditingRow ? (
                        <input
                          type="text"
                          value={editData.scholarshipName}
                          onChange={(e) => handleEditChange('scholarshipName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        scholarship.scholarshipName
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isEditingRow ? (
                        <input
                          type="text"
                          value={editData.universityName}
                          onChange={(e) => handleEditChange('universityName', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        scholarship.universityName
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isEditingRow ? (
                        <input
                          type="text"
                          value={editData.scholarshipCategory}
                          onChange={(e) => handleEditChange('scholarshipCategory', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        scholarship.scholarshipCategory
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isEditingRow ? (
                        <input
                          type="text"
                          value={editData.degree}
                          onChange={(e) => handleEditChange('degree', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        scholarship.degree
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {isEditingRow ? (
                        <input
                          type="number"
                          value={editData.applicationFees}
                          onChange={(e) => handleEditChange('applicationFees', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        `$${scholarship.applicationFees}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{deadline || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isClosed ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                        {isClosed ? 'Closed' : 'Open'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isEditingRow ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded hover:bg-green-700"
                          >
                            <FaCheckCircle /> Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(scholarship)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded hover:bg-blue-100"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(scholarship._id)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded hover:bg-red-100"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs text-gray-500 border-t">Showing {filtered.length} scholarships</div>
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
