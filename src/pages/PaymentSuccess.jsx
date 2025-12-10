import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const location = useLocation();
  const scholarship = location.state?.scholarship;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
        <div className="card-body">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-success" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

          {scholarship && (
            <>
              <div className="text-left space-y-3 mb-6">
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">Scholarship</p>
                  <p className="font-semibold">{scholarship.scholarshipName}</p>
                </div>
                <div className="border-b pb-3">
                  <p className="text-sm text-gray-600">University</p>
                  <p className="font-semibold">{scholarship.universityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                  <p className="text-xl font-bold text-primary">
                    ${scholarship.applicationFees + scholarship.serviceCharge}
                  </p>
                </div>
              </div>
            </>
          )}

          <p className="text-gray-600 mb-6">
            Your application has been submitted successfully. You can track the status in your dashboard.
          </p>

          <div className="space-y-3">
            <Link to="/dashboard" className="btn btn-primary w-full">
              Go to My Applications
            </Link>
            <Link to="/scholarships" className="btn btn-outline w-full">
              Browse More Scholarships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
