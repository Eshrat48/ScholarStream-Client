import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
// Using same logo style as Navbar/Footer for consistency
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { get } from '../utils/apiClient';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { FaHome, FaBook, FaStar, FaUser, FaSignOutAlt, FaUsers, FaChartBar, FaPlus, FaBookOpen } from 'react-icons/fa';

const DashboardLayoutContent = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Student');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  const fetchUserRole = async () => {
    if (!user?.email) return;
    
    try {
      const response = await get(`/users/${user.email}`);
      setUserRole(response.data?.role || 'Student');
      setUserProfile(response.data || null);
    } catch (err) {
      console.error('Failed to fetch user role');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <div className="w-full navbar bg-white border-b border-gray-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">Dashboard</div>
        </div>

        {/* Main Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-white text-gray-800 border-r border-gray-200">
          {/* Logo & User Info */}
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="badge w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <FaBookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">ScholarStream</span>
            </Link>

            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring-1 ring-gray-200 overflow-hidden">
                  {user?.photoURL || userProfile?.photoURL ? (
                    <img src={user?.photoURL || userProfile?.photoURL} alt="Profile" />
                  ) : (
                    <div className="bg-blue-600 text-white w-full h-full flex items-center justify-center">
                      <span className="text-xl">{user?.displayName?.charAt(0) || 'U'}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-sm text-gray-600">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <FaHome /> Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <FaUser /> My Profile
              </NavLink>
            </li>

            {/* Student Menu */}
            {userRole === 'Student' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/my-applications"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaBook /> My Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaStar /> My Reviews
                  </NavLink>
                </li>
              </>
            )}

            {/* Moderator Menu */}
            {userRole === 'Moderator' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaBook /> Manage Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaStar /> All Reviews
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Menu */}
            {userRole === 'Admin' && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaPlus /> Add Scholarship
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-scholarships"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaBook /> Manage Scholarships
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`
                    }
                  >
                    <FaChartBar /> Analytics
                  </NavLink>
                </li>
              </>
            )}

            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

const DashboardLayout = () => {
  return (
    <AuthProvider>
      <DashboardLayoutContent />
    </AuthProvider>
  );
};

export default DashboardLayout;
