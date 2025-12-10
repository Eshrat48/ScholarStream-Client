import { useLocation, Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <FaExclamationCircle className="text-6xl text-error" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>

          {error && (
            <div className="alert alert-error mb-6 text-left">
              <span>{error}</span>
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Your payment could not be processed. Please check your card details and try again.
          </p>

          <div className="space-y-3">
            <Link to="/dashboard" className="btn btn-primary w-full">
              Return to Dashboard
            </Link>
            <Link to="/scholarships" className="btn btn-outline w-full">
              Browse Scholarships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
