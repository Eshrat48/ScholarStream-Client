import { useAuth } from '../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt="Profile" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold">{user?.displayName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Type</p>
              <span className="badge badge-primary">Student</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p>{new Date(user?.metadata?.creationTime).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
