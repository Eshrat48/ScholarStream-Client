import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { get, post } from '../utils/apiClient';
import { useAuth } from '../hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const CheckoutForm = ({ scholarship, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const paymentResponse = await post('/payments/create-payment-intent', {
        amount: scholarship.applicationFees + scholarship.serviceCharge,
        scholarshipId: scholarship._id,
      });

      const clientSecret = paymentResponse.data.clientSecret;

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent?.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-300 rounded-lg" />
      
      {error && <div className="alert alert-error"><span>{error}</span></div>}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary w-full"
      >
        {loading ? <span className="loading loading-spinner"></span> : 'Pay Now'}
      </button>
    </form>
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
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        paymentStatus: 'paid',
      });

      navigate('/payment-success', { state: { scholarship } });
    } catch (err) {
      navigate('/payment-failed', { state: { error: err.message } });
    }
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

  const totalAmount = scholarship.applicationFees + scholarship.serviceCharge;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scholarship Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg sticky top-20">
              <div className="card-body">
                <h2 className="card-title text-lg">{scholarship.scholarshipName}</h2>
                <p className="text-sm text-gray-600">{scholarship.universityName}</p>

                <div className="divider"></div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Application Fee:</span>
                    <span className="font-semibold">${scholarship.applicationFees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge:</span>
                    <span className="font-semibold">${scholarship.serviceCharge}</span>
                  </div>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">${totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title mb-6">Payment Details</h2>

                {/* User Info */}
                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ''}
                    className="input input-bordered"
                    disabled
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="input input-bordered"
                    disabled
                  />
                </div>

                <div className="divider"></div>

                {/* Stripe Payment */}
                <Elements stripe={stripePromise}>
                  <CheckoutForm scholarship={scholarship} onSuccess={handlePaymentSuccess} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
