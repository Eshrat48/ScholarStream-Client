import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error;

  useEffect(() => {
    // Redirect to home if no error data
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <FaTimesCircle className="text-4xl text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Payment Failed
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            We're sorry, but we were unable to process your payment. Your application has been saved. Please review the details below and try again later, your dashboard.
          </p>

          {/* Error Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">Error Details:</span>
              <span className="text-sm font-medium text-gray-900">
                {error?.scholarshipName || 'Unknown Scholarship'}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">Error Type:</span>
              <span className="text-sm font-medium text-red-600">
                {error?.message || 'Your credit card declined by the bank.'}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
          >
            Return to Dashboard
          </button>

          {/* Additional Links */}
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <button
              onClick={() => navigate('/scholarships')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Browse scholarships
            </button>
            {' '}or contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
