import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scholarship = location.state?.scholarship;

  useEffect(() => {
    // If no scholarship data, redirect to home
    if (!scholarship) {
      navigate('/');
    }
  }, [scholarship, navigate]);

  if (!scholarship) {
    return null;
  }

  const totalAmount = (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate a mock transaction ID
  const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Success Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Success Icon & Message */}
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
              <p className="text-gray-600 mb-8">
                Your application payment has been processed successfully.
              </p>
            </div>

            {/* Payment Details */}
            <div className="px-8 pb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Scholarship</div>
                    <div className="font-semibold text-gray-900">{scholarship.scholarshipName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">University</div>
                    <div className="font-semibold text-gray-900">{scholarship.universityName}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Amount Paid</div>
                    <div className="text-xl font-bold text-gray-900">${totalAmount.toFixed(2)} USD</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                    <div className="font-mono text-sm text-gray-900">{transactionId}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 mb-1">Date</div>
                  <div className="font-semibold text-gray-900">{currentDate}</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="px-8 pb-8">
              <Link
                to="/dashboard/my-applications"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Go to My Applications
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              A confirmation email has been sent to your registered email address.
            </p>
            <Link to="/scholarships" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Browse More Scholarships →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
