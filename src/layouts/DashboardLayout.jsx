import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { get } from '../utils/apiClient';
import { FaHome, FaBook, FaStar, FaUser, FaSignOutAlt, FaUsers, FaChartBar, FaPlus } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRole();
  }, [user]);

  const fetchUserRole = async () => {
    if (!user?.email) return;
    
    try {
      const response = await get(`/users/${user.email}`);
      setUserRole(response.data?.role || 'Student');
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
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <div className="w-full navbar bg-base-300 lg:hidden">
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
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Logo & User Info */}
          <div className="mb-6">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FaBook className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold">ScholarStream</span>
            </Link>
            
            <div className="flex items-center gap-3 p-3 bg-base-300 rounded-lg">
              <div className="avatar placeholder">
                <div className="bg-primary text-white rounded-full w-12">
                  <span className="text-xl">{user?.displayName?.charAt(0) || 'U'}</span>
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
              <Link to="/" className="flex items-center gap-3">
                <FaHome /> Home
              </Link>
            </li>

            <li>
              <Link to="/dashboard/my-profile" className="flex items-center gap-3">
                <FaUser /> My Profile
              </Link>
            </li>

            {/* Student Menu */}
            {userRole === 'Student' && (
              <>
                <li>
                  <Link to="/dashboard/my-applications" className="flex items-center gap-3">
                    <FaBook /> My Applications
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-reviews" className="flex items-center gap-3">
                    <FaStar /> My Reviews
                  </Link>
                </li>
              </>
            )}

            {/* Moderator Menu */}
            {userRole === 'Moderator' && (
              <>
                <li>
                  <Link to="/dashboard/manage-applications" className="flex items-center gap-3">
                    <FaBook /> Manage Applications
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/all-reviews" className="flex items-center gap-3">
                    <FaStar /> All Reviews
                  </Link>
                </li>
              </>
            )}

            {/* Admin Menu */}
            {userRole === 'Admin' && (
              <>
                <li>
                  <Link to="/dashboard/add-scholarship" className="flex items-center gap-3">
                    <FaPlus /> Add Scholarship
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-scholarships" className="flex items-center gap-3">
                    <FaBook /> Manage Scholarships
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-users" className="flex items-center gap-3">
                    <FaUsers /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/analytics" className="flex items-center gap-3">
                    <FaChartBar /> Analytics
                  </Link>
                </li>
              </>
            )}

            <li className="mt-4">
              <button onClick={handleLogout} className="flex items-center gap-3 w-full text-error">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
