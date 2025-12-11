import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { get } from '../utils/apiClient';
import { useAuth } from '../hooks/useAuth';
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt, FaGraduationCap, FaStar } from 'react-icons/fa';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
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

      try {
        const reviewsResponse = await get(`/reviews/scholarship/${id}`);
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
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) / reviews.length
    : 0;

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: window.location.pathname } } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='alert alert-error max-w-md'>
          <span>{error || 'Scholarship not found'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10 px-4'>
      <div className='mx-auto max-w-6xl'>
        {/* Breadcrumbs */}
        <div className='flex items-center text-sm text-slate-500 gap-2 mb-6'>
          <Link to='/' className='hover:text-blue-600 font-medium'>Home</Link>
          <span>/</span>
          <Link to='/scholarships' className='hover:text-blue-600 font-medium'>Scholarships</Link>
          <span>/</span>
          <span className='text-slate-700 font-semibold truncate'>{scholarship.scholarshipName}</span>
        </div>

        {/* Hero */}
        <div className='bg-white shadow-xl rounded-3xl overflow-hidden border border-slate-100'>
          <div className='relative h-72 md:h-96 w-full'>
            <img
              src={scholarship.universityImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80'}
              alt={scholarship.universityName}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/35 to-transparent'></div>
            <div className='absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-3'>
              <div className='px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-slate-800 shadow-sm flex items-center gap-2'>
                <FaGraduationCap className='text-blue-600' />
                {scholarship.universityName}
              </div>
              <div className='px-3 py-1 bg-white/90 rounded-full text-sm font-semibold text-slate-800 shadow-sm flex items-center gap-2'>
                <FaMapMarkerAlt className='text-blue-600' />
                {scholarship.universityCity}, {scholarship.universityCountry}
              </div>
            </div>
          </div>

          <div className='p-6 md:p-8'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
              <div className='flex-1'>
                <h1 className='text-3xl md:text-4xl font-bold text-slate-900 leading-tight'>
                  {scholarship.scholarshipName}
                </h1>
                <p className='text-slate-700 mt-1 font-semibold'>{scholarship.universityName}</p>

                <div className='flex flex-wrap gap-2 mt-4'>
                  <span className='px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold'>{scholarship.scholarshipCategory}</span>
                  <span className='px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold'>{scholarship.degree}</span>
                  <span className='px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold'>{scholarship.subjectCategory}</span>
                </div>
              </div>

              <div className='bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-4 min-w-[220px]'>
                <div className='h-12 w-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg'>
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  <p className='text-sm text-slate-500'>Reviews & Ratings</p>
                  <p className='text-base font-semibold text-slate-800'>{reviews.length} review{reviews.length === 1 ? '' : 's'}</p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8'>
              <div className='lg:col-span-1'>
                <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm'>
                  <h3 className='text-lg font-semibold text-slate-900 mb-4'>Scholarship Details</h3>
                  <div className='space-y-3 text-sm text-slate-700'>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Location</span>
                      <span className='text-right'>{scholarship.universityCity}, {scholarship.universityCountry}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Application Fee</span>
                      <span>${scholarship.applicationFees}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Service Charge</span>
                      <span>${scholarship.serviceCharge}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Deadline</span>
                      <span>{new Date(scholarship.applicationDeadline).toLocaleDateString()}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Tuition (est.)</span>
                      <span>{scholarship.tuitionFees ? `$${scholarship.tuitionFees}` : 'Varies'}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-medium'>Posted</span>
                      <span>{new Date(scholarship.postDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='lg:col-span-2 space-y-6'>
                <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                  <h3 className='text-xl font-semibold text-slate-900 mb-3'>About this Scholarship</h3>
                  <p className='text-slate-700 leading-relaxed'>
                    {scholarship.scholarshipDescription || 'No description available for this scholarship yet.'}
                  </p>
                </div>

                <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                  <h3 className='text-xl font-semibold text-slate-900 mb-3'>Coverage & Benefits</h3>
                  <ul className='space-y-2 text-slate-700'>
                    <li className='flex gap-2'><span className='text-blue-600'>•</span>Full or partial tuition support (see tuition details above).</li>
                    <li className='flex gap-2'><span className='text-blue-600'>•</span>Access to university resources and research facilities.</li>
                    <li className='flex gap-2'><span className='text-blue-600'>•</span>Opportunities to collaborate with faculty on research initiatives.</li>
                    <li className='flex gap-2'><span className='text-blue-600'>•</span>Guidance for international students on visas and accommodation.</li>
                  </ul>
                </div>

                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
                  <div>
                    <p className='text-slate-600 text-sm'>Ready to proceed?</p>
                    <p className='text-slate-900 font-semibold'>Apply before {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                  </div>
                  <button onClick={handleApply} className='btn btn-primary px-6'>
                    Apply for Scholarship
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <p className='text-sm text-slate-500'>Reviews & Ratings</p>
                <p className='text-2xl font-bold text-slate-900'>{averageRating.toFixed(1)} / 5.0</p>
              </div>
              <div className='flex items-center gap-1 text-amber-400 text-lg'>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(averageRating) ? 'text-amber-400' : 'text-slate-300'} />
                ))}
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className='space-y-4'>
                {reviews.map((review) => (
                  <div key={review._id} className='rounded-xl border border-slate-200 p-4 bg-slate-50'>
                    <div className='flex items-center justify-between mb-1'>
                      <p className='font-semibold text-slate-900'>{review.userName}</p>
                      <div className='flex items-center gap-1 text-sm'>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.ratingPoint ? 'text-amber-400' : 'text-slate-300'} />
                        ))}
                      </div>
                    </div>
                    <p className='text-sm text-slate-600 mb-1'>{new Date(review.reviewDate).toLocaleDateString()}</p>
                    <p className='text-slate-800 leading-relaxed'>{review.reviewComment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-slate-600'>No reviews yet. Be the first to review!</p>
            )}
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit'>
            <h3 className='text-lg font-semibold text-slate-900 mb-3'>Quick Facts</h3>
            <div className='space-y-3 text-sm text-slate-700'>
              <div className='flex justify-between'><span className='font-medium'>Degree</span><span>{scholarship.degree}</span></div>
              <div className='flex justify-between'><span className='font-medium'>Category</span><span>{scholarship.scholarshipCategory}</span></div>
              <div className='flex justify-between'><span className='font-medium'>Subject</span><span>{scholarship.subjectCategory}</span></div>
              <div className='flex justify-between'><span className='font-medium'>Application Fee</span><span>${scholarship.applicationFees}</span></div>
              <div className='flex justify-between'><span className='font-medium'>Service Charge</span><span>${scholarship.serviceCharge}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
