import { useState, useEffect, useMemo } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { USER_ROLES } from '../../utils/constants';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [roleFilter, setRoleFilter] = useState('All');
  const [query, setQuery] = useState('');

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

  const filteredUsers = useMemo(() => {
    const byRole = roleFilter === 'All' ? users : users.filter(u => (u.role || 'Student') === roleFilter);
    const q = query.trim().toLowerCase();
    if (!q) return byRole;
    return byRole.filter(u => (
      (u.displayName || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q)
    ));
  }, [users, roleFilter, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <p className="text-sm text-gray-500">Search, filter, edit roles, and remove users</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FaPlus />
          Add New User
        </button>
      </div>

      <div className="bg-white border rounded-xl p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1">
            <div className="input input-bordered w-full flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-gray-500"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option>All</option>
              {Object.values(USER_ROLES).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 border">{filteredUsers.length} users</span>
          </div>
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
        <div className="overflow-x-auto bg-white border rounded-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=0D8ABC&color=fff`} alt={user.displayName || user.email} />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.displayName || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-gray-700">{user.email}</td>
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
                      <span className={`px-2 py-1 text-xs rounded ${
                        (user.role || 'Student') === 'Admin' ? 'bg-red-100 text-red-700' :
                        (user.role || 'Student') === 'Moderator' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role || 'Student'}
                      </span>
                    )}
                  </td>
                  <td className="text-sm text-gray-700">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td className="text-right">
                    {editingId === user._id ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRoleChange(user._id, editRole)}
                          className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-xs rounded border"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingId(user._id);
                            setEditRole(user.role || 'Student');
                          }}
                          className="p-2 rounded border hover:bg-gray-50"
                          title="Edit role"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(user._id)}
                          className="p-2 rounded border hover:bg-gray-50 text-red-600"
                          title="Delete user"
                        >
                          <FaTrash />
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
