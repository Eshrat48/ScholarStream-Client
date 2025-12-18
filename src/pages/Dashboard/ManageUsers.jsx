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
      // The backend returns { success, count, data }
      setUsers((response && response.data) || []);
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Users</h1>
          <p className="text-sm text-gray-600 mt-1">Search, filter, and manage user roles</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                className="w-full pl-8 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer font-medium transition-all"
            >
              <option>All</option>
              {Object.values(USER_ROLES).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <div className="text-xs px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-semibold">{filteredUsers.length} users</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {filteredUsers.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
          <p className="text-blue-700 font-medium">No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <tr>
                <th className="text-gray-700 font-bold">User</th>
                <th className="text-gray-700 font-bold">Email</th>
                <th className="text-gray-700 font-bold">Role</th>
                <th className="text-gray-700 font-bold">Joined</th>
                <th className="text-right text-gray-700 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring ring-blue-200">
                          <img src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=3B82F6&color=fff`} alt={user.displayName || user.email} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{user.displayName || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-gray-700">{user.email}</td>
                  <td>
                    {editingId === user._id ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="px-3 py-2 bg-white border border-blue-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      >
                        {Object.values(USER_ROLES).map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-lg inline-block ${
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
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all shadow-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
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
                          className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all font-bold"
                          title="Edit role"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(user._id)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all font-bold"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Delete User?</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
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
