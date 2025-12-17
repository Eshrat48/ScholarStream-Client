import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { get, post } from '../utils/apiClient';
import { useAuth } from '../hooks/useAuth';
import { FaLock, FaCreditCard } from 'react-icons/fa';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const CheckoutForm = ({ scholarship, onSuccess, onFail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('card');
  const [cardholderName, setCardholderName] = useState(user?.displayName || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      // Ensure fees are numbers with defaults
      const applicationFees = Number(scholarship.applicationFees) || 0;
      const serviceCharge = Number(scholarship.serviceCharge) || 0;
      const totalAmount = applicationFees + serviceCharge;
      
      console.log('Scholarship data:', {
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        calculatedTotal: totalAmount,
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName
      });

      if (totalAmount <= 0) {
        throw new Error('Invalid payment amount. Application fee and service charge must be greater than 0.');
      }

      console.log('Creating payment intent:', {
        amount: totalAmount,
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName
      });

      // Create payment intent
      const paymentResponse = await post('/payments/create-payment-intent', {
        amount: totalAmount,
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName
      });

      console.log('Payment intent response:', paymentResponse);

      const clientSecret = paymentResponse.clientSecret;

      if (!clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName || user?.displayName || 'Anonymous',
            email: user?.email,
          },
        },
      });

      console.log('Stripe confirmation result:', result);

      if (result.error) {
        console.error('Payment error:', result.error);
        setError(result.error.message);
        onFail(result.error.message);
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      console.error('Payment processing error:', err);
      setError(err.message || 'Payment processing failed');
      onFail(err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
        padding: '12px',
      },
      invalid: {
        color: '#ef4444',
      },
    },
  };

  const totalAmount = scholarship.applicationFees + scholarship.serviceCharge;

  return (
    <div>
      {/* Payment Method Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('card')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'card'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'google'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            disabled
          >
            Google Pay
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apple')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'apple'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            disabled
          >
            Apple Pay
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Card Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Pay Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            <>
              <FaCreditCard />
              Pay ${totalAmount.toFixed(2)}
            </>
          )}
        </button>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <FaLock className="text-gray-400" />
          <span>Payments are securely processed by Stripe</span>
        </div>
      </form>
    </div>
  );
};

const Checkout = () => {
  const { scholarshipId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchScholarship();
  }, [scholarshipId, isAuthenticated]);

  const fetchScholarship = async () => {
    try {
      const response = await get(`/scholarships/${scholarshipId}`);
      setScholarship(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load scholarship');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // Create application record
      await post('/applications', {
        scholarshipId,
        userId: user?.uid,
        userName: user?.displayName || 'Anonymous',
        userEmail: user?.email,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,
        subjectCategory: scholarship.subjectCategory,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        paymentStatus: 'paid',
        applicationStatus: 'pending',
      });

      navigate('/payment-success', { state: { scholarship } });
    } catch (err) {
      console.error('Failed to create application:', err);
      navigate('/payment-failed', { state: { error: err.message } });
    }
  };

  const handlePaymentFail = async (errorMessage) => {
    // Optionally save unpaid application
    navigate('/payment-failed', { 
      state: { scholarship, error: errorMessage } 
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-warning">
          <span>Please log in to proceed with payment</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error || 'Scholarship not found'}</span>
        </div>
      </div>
    );
  }

  const totalAmount = (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ScholarStream</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaLock className="text-sm" />
            <span className="text-sm font-medium">Secure Checkout</span>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-sm p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Application</span>
              <span>/</span>
              <span>Review</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Payment</span>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your payment to finalize your scholarship application.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Scholarship</div>
                    <div className="font-semibold text-gray-900">{scholarship.scholarshipName}</div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Application Fee</span>
                      <span className="font-semibold">${(scholarship.applicationFees || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Service Charge</span>
                      <span className="font-semibold">${(scholarship.serviceCharge || 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h2>

              <Elements stripe={stripePromise} key={user?.email || 'anon'}>
                <CheckoutForm 
                  scholarship={scholarship} 
                  onSuccess={handlePaymentSuccess}
                  onFail={handlePaymentFail}
                />
              </Elements>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>© 2024 ScholarStream. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-blue-600">Terms of Service</a>
                <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                <a href="#" className="hover:text-blue-600">Help</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
