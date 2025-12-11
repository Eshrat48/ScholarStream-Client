import { useState, useEffect } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { USER_ROLES } from '../../utils/constants';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await get('/users');
      setUsers(response.users || []);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await patch(`/users/${userId}/role`, { role: newRole });
      setUsers(prev =>
        prev.map(u => u._id === userId ? { ...u, role: newRole } : u)
      );
      setEditingId(null);
      alert('Role updated successfully!');
    } catch (err) {
      console.error('Error updating role:', err);
      alert('Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteRequest(`/users/${userId}`);
      setUsers(prev => prev.filter(u => u._id !== userId));
      setShowDeleteConfirm(null);
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = roleFilter === 'All'
    ? users
    : users.filter(u => u.role === roleFilter);

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
        <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
        <p className="text-gray-600 mb-4">View, manage roles, and delete users</p>

        <div className="flex gap-2 mb-4">
          <label className="label">
            <span className="label-text">Filter by Role:</span>
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-bordered"
          >
            <option>All</option>
            {Object.values(USER_ROLES).map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <span className="badge badge-lg mt-2">{filteredUsers.length} users</span>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {filteredUsers.length === 0 ? (
        <div className="alert alert-info">
          <span>No users found.</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th>Email</th>
                <th>Display Name</th>
                <th>Role</th>
                <th>Account Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td className="font-medium">{user.email}</td>
                  <td>{user.displayName || 'N/A'}</td>
                  <td>
                    {editingId === user._id ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="select select-bordered select-sm"
                      >
                        {Object.values(USER_ROLES).map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`badge ${
                        user.role === 'Admin' ? 'badge-error' :
                        user.role === 'Moderator' ? 'badge-warning' :
                        'badge-primary'
                      }`}>
                        {user.role || 'Student'}
                      </span>
                    )}
                  </td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    {editingId === user._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRoleChange(user._id, editRole)}
                          className="btn btn-sm btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="btn btn-sm btn-ghost"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(user._id);
                            setEditRole(user.role || 'Student');
                          }}
                          className="btn btn-sm btn-info"
                        >
                          <FaEdit /> Change Role
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(user._id)}
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
            <h3 className="font-bold text-lg">Delete User?</h3>
            <p className="py-4">Are you sure you want to delete this user? This action cannot be undone.</p>
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

export default ManageUsers;
