import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { get, patch, post } from '../../utils/apiClient';
import { FaEdit, FaCheck, FaTimes, FaUpload, FaInfoCircle } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModeratorEditing, setIsModeratorEditing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [editData, setEditData] = useState({
    dateOfBirth: '',
    gender: '',
    nationality: '',
    phoneNumber: '',
    mailingAddress: '',
    institution: '',
    major: '',
    currentYear: '',
    expectedGraduation: '',
    gpa: ''
  });
  const [moderatorEditData, setModeratorEditData] = useState({
    name: '',
    phoneNumber: '',
    assignedCategories: []
  });
  const [moderatorErrors, setModeratorErrors] = useState({});

  useEffect(() => {
    fetchUserProfile();
    // Check if this is a new user from registration
    if (location.state?.newUser) {
      setShowWelcome(true);
      setIsEditing(true); // Automatically open edit mode for new users
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      const response = await get(`/users/${user.email}`);
      const data = response.data || {};
      setUserData(data);
      setEditData({
        dateOfBirth: data.dateOfBirth || '',
        gender: data.gender || '',
        nationality: data.nationality || '',
        phoneNumber: data.phoneNumber || '',
        mailingAddress: data.mailingAddress || '',
        institution: data.institution || '',
        major: data.major || '',
        currentYear: data.currentYear || '',
        expectedGraduation: data.expectedGraduation || '',
        gpa: data.gpa || ''
      });
      setModeratorEditData({
        name: data.name || user?.displayName || '',
        phoneNumber: data.phoneNumber || '',
        assignedCategories: Array.isArray(data.assignedCategories) ? data.assignedCategories : []
      });
    } catch (err) {
      console.error('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleModeratorEditToggle = () => {
    setIsModeratorEditing(prev => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    if (userData) {
      setEditData({
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
        nationality: userData.nationality || '',
        phoneNumber: userData.phoneNumber || '',
        mailingAddress: userData.mailingAddress || '',
        institution: userData.institution || '',
        major: userData.major || '',
        currentYear: userData.currentYear || '',
        expectedGraduation: userData.expectedGraduation || '',
        gpa: userData.gpa || ''
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await patch(`/users/${userData._id}`, editData);
      await fetchUserProfile();
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile. Please try again.');
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleModeratorSave = async () => {
    // Basic validation
    const errors = {};
    if (!moderatorEditData.name?.trim()) {
      errors.name = 'Name is required';
    }
    const phone = moderatorEditData.phoneNumber?.trim();
    if (phone && !/^\+?[0-9\-()\s]{7,}$/.test(phone)) {
      errors.phoneNumber = 'Invalid phone format';
    }
    setModeratorErrors(errors);
    if (Object.keys(errors).length) return;

    setSaving(true);
    try {
      const payload = {
        name: moderatorEditData.name,
        phoneNumber: moderatorEditData.phoneNumber,
        assignedCategories: moderatorEditData.assignedCategories
      };
      await patch(`/users/${userData._id}`, payload);
      await fetchUserProfile();
      setIsModeratorEditing(false);
      alert('Moderator profile updated successfully!');
    } catch (err) {
      alert('Failed to update moderator profile. Please try again.');
      console.error('Moderator update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const isModerator = (userData?.role || '').toLowerCase() === 'moderator';

  // Moderator layout (simplified info view)
  if (isModerator) {
    const name = userData?.name || user?.displayName || 'John Doe';
    const email = user?.email || 'moderator@email@scholarstream.com';
    const phone = userData?.phoneNumber || '(555) 123-4567';
    const memberSince = userData?.memberSince || 'January 15, 2022';
    const categories = (userData?.assignedCategories && userData.assignedCategories.length)
      ? userData.assignedCategories.join(', ')
      : 'Science, Arts & Humanities';
    const lastLogin = userData?.lastLogin || 'Today, 10:45 AM';

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          </div>
          {isModeratorEditing ? (
            <div className="flex gap-3">
              <button
                onClick={() => setIsModeratorEditing(false)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={handleModeratorSave}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FaCheck /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleModeratorEditToggle}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
            {/* Avatar Card */}
            <div className="col-span-1">
              <div className="border border-gray-200 rounded-xl p-6 text-center">
                <img
                  src={user?.photoURL || userData?.photoURL || 'https://ui-avatars.com/api/?name=John+Doe&size=200'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                {isModeratorEditing ? (
                  <input
                    type="text"
                    value={moderatorEditData.name}
                    onChange={(e) => setModeratorEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                )}
                {isModeratorEditing && moderatorErrors.name && (
                  <p className="mt-2 text-xs text-red-600">{moderatorErrors.name}</p>
                )}
                <p className="text-sm text-gray-600 mt-1">Senior Reviewer</p>
                <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">Moderator</span>
              </div>
            </div>

            {/* Details Card */}
            <div className="col-span-1 md:col-span-2">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-gray-500">Email Address</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{email}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Phone Number</div>
                    {isModeratorEditing ? (
                      <input
                        type="tel"
                        value={moderatorEditData.phoneNumber}
                        onChange={(e) => setModeratorEditData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder="(555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900 mt-1">{phone}</div>
                    )}
                    {isModeratorEditing && moderatorErrors.phoneNumber && (
                      <p className="mt-2 text-xs text-red-600">{moderatorErrors.phoneNumber}</p>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Member Since</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{memberSince}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Assigned Categories</div>
                    {isModeratorEditing ? (
                      <ModeratorCategoriesEditor
                        value={moderatorEditData.assignedCategories}
                        onChange={(cats) => setModeratorEditData(prev => ({ ...prev, assignedCategories: cats }))}
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900 mt-1">{categories}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Last Login</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">{lastLogin}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Role</div>
                    <div className="text-sm font-medium text-gray-900 mt-1">Moderator</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student layout (existing detailed editable view)
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Welcome Banner for New Users */}
      {showWelcome && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <FaInfoCircle className="text-blue-600 text-xl mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Welcome to ScholarStream!</h3>
            <p className="text-blue-700 text-sm mb-3">
              {location.state?.message || 'Please complete your profile information to help us match you with the best scholarship opportunities.'}
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <FaCheck /> {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user?.photoURL || userData?.photoURL || 'https://ui-avatars.com/api/?name=John+Doe&size=200'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.name || user?.displayName || 'User Name'}
              </h2>
              <p className="text-gray-600 mt-1">
                Student ID: {userData?.studentId || 'Not assigned yet'}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-blue-600 mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={editData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.dateOfBirth || editData.dateOfBirth || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender/Pronouns</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select...</option>
                  <option value="He/Him">He/Him</option>
                  <option value="She/Her">She/Her</option>
                  <option value="They/Them">They/Them</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-800 font-medium">{userData?.gender || editData.gender || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nationality</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nationality"
                  value={editData.nationality}
                  onChange={handleChange}
                  placeholder="e.g., Citizen, International"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.nationality || editData.nationality || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-blue-600 mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                <div className="flex items-center gap-2">
                  <p className="text-gray-800 font-medium">{user?.email || 'email@example.com'}</p>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    Verified
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editData.phoneNumber}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{userData?.phoneNumber || editData.phoneNumber || 'Not provided'}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Mailing Address</label>
              {isEditing ? (
                <textarea
                  name="mailingAddress"
                  value={editData.mailingAddress}
                  onChange={handleChange}
                  placeholder="123 University Ave, City, ST 12345, USA"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.mailingAddress || editData.mailingAddress || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-blue-600 mb-6">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Institution</label>
              {isEditing ? (
                <input
                  type="text"
                  name="institution"
                  value={editData.institution}
                  onChange={handleChange}
                  placeholder="State University"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.institution || editData.institution || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Major</label>
              {isEditing ? (
                <input
                  type="text"
                  name="major"
                  value={editData.major}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.major || editData.major || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Current Year</label>
              {isEditing ? (
                <select
                  name="currentYear"
                  value={editData.currentYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select Year...</option>
                  <option value="Freshman (Year 1)">Freshman (Year 1)</option>
                  <option value="Sophomore (Year 2)">Sophomore (Year 2)</option>
                  <option value="Junior (Year 3)">Junior (Year 3)</option>
                  <option value="Senior (Year 4)">Senior (Year 4)</option>
                  <option value="Graduate">Graduate</option>
                </select>
              ) : (
                <p className="text-gray-800 font-medium">{userData?.currentYear || editData.currentYear || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Expected Graduation</label>
              {isEditing ? (
                <input
                  type="text"
                  name="expectedGraduation"
                  value={editData.expectedGraduation}
                  onChange={handleChange}
                  placeholder="May 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.expectedGraduation || editData.expectedGraduation || 'Not provided'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">GPA</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gpa"
                  value={editData.gpa}
                  onChange={handleChange}
                  placeholder="3.8 / 4.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              ) : (
                <p className="text-gray-800 font-medium">{userData?.gpa || editData.gpa || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

// Simple categories editor component for moderators
function ModeratorCategoriesEditor({ value, onChange }) {
  const [input, setInput] = useState('');

  const addCategory = () => {
    const v = input.trim();
    if (!v) return;
    const next = Array.from(new Set([...(value || []), v]));
    onChange(next);
    setInput('');
  };

  const removeCategory = (cat) => {
    const next = (value || []).filter(c => c !== cat);
    onChange(next);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {(value || []).map(cat => (
          <span key={cat} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            {cat}
            <button type="button" onClick={() => removeCategory(cat)} className="text-blue-700 hover:text-blue-900">
              <FaTimes />
            </button>
          </span>
        ))}
        {(value || []).length === 0 && (
          <span className="text-xs text-gray-500">No categories assigned</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add category (e.g., STEM)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <button type="button" onClick={addCategory} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>
  );
}
