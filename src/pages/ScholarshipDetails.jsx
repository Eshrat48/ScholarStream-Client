import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get } from '../utils/apiClient';
import { useAuth } from '../hooks/useAuth';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaGraduationCap, FaStar } from 'react-icons/fa';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchScholarshipDetails();
  }, [id]);

  const fetchScholarshipDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await get(`/scholarships/${id}`);
      setScholarship(response.data);

      // Fetch reviews
      try {
        const reviewsResponse = await get(`/reviews/${id}`);
        setReviews(reviewsResponse.data || []);
      } catch (err) {
        // Reviews might not exist yet
      }
    } catch (err) {
      setError(err.message || 'Failed to load scholarship details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

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

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <Link to="/scholarships" className="btn btn-ghost mb-6">
          ← Back to Scholarships
        </Link>

        {/* Hero Section */}
        <div className="card bg-base-100 shadow-xl mb-8 overflow-hidden">
          <figure className="h-96 overflow-hidden">
            <img
              src={scholarship.universityImage || 'https://via.placeholder.com/800x400'}
              alt={scholarship.universityName}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-4xl">{scholarship.scholarshipName}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 text-lg">
                <FaGraduationCap className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">University</p>
                  <p className="font-semibold">{scholarship.universityName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <FaMapMarkerAlt className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{scholarship.universityCity}, {scholarship.universityCountry}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <FaDollarSign className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Application Fee</p>
                  <p className="font-semibold">${scholarship.applicationFees}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-lg">
                <FaCalendarAlt className="text-primary text-2xl" />
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-semibold">{new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <span className="badge badge-primary badge-lg">{scholarship.scholarshipCategory}</span>
              <span className="badge badge-secondary badge-lg">{scholarship.degree}</span>
              <span className="badge badge-accent badge-lg">{scholarship.subjectCategory}</span>
            </div>
          </div>
        </div>

        {/* Details & Apply Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">About This Scholarship</h2>
                <p className="text-gray-700 leading-relaxed">
                  {scholarship.scholarshipDescription || 'No description available'}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Scholarship Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Degree Level:</span>
                    <span>{scholarship.degree}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Tuition Fees:</span>
                    <span>${scholarship.tuitionFees || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Service Charge:</span>
                    <span>${scholarship.serviceCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Posted On:</span>
                    <span>{new Date(scholarship.postDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Student Reviews</h2>
                
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.ratingPoint ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.reviewComment}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-1">Application Fee</p>
                    <p className="text-3xl font-bold text-primary">${scholarship.applicationFees}</p>
                  </div>

                  <button
                    onClick={handleApply}
                    className="btn btn-primary btn-block mb-4"
                  >
                    Apply for Scholarship
                  </button>

                  <div className="divider my-2"></div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">Total Coverage:</span> ${scholarship.tuitionFees || 'Varies'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Deadline:</span> {new Date(scholarship.applicationDeadline).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Category:</span> {scholarship.scholarshipCategory}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
