import { useState, useEffect } from 'react';
import { get, deleteRequest } from '../../utils/apiClient';
import { FaTrash, FaStar, FaSearch } from 'react-icons/fa';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterRating, setFilterRating] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await get('/reviews');
      setReviews(response.reviews || []);
      setError('');
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteRequest(`/reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      setShowDeleteConfirm(null);
      alert('Review deleted successfully!');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      !searchQuery ||
      review.scholarshipName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.universityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.reviewerEmail?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = filterRating === 'All' || review.rating === parseInt(filterRating);

    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            className={star <= rating ? 'text-yellow-400 text-sm' : 'text-gray-300 text-sm'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Reviews</h1>
        <p className="text-gray-600 mt-1">Manage all student reviews for scholarships</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by keyword, student, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredReviews.length} of {reviews.length} reviews
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No reviews found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Scholarship</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">University</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Reviewer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Review Comment</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((review, idx) => (
                  <tr key={review._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{review.scholarshipName}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{review.universityName}</td>
                    <td className="px-6 py-4 text-gray-900">{review.reviewerEmail || 'Anonymous'}</td>
                    <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{review.comment}</td>
                    <td className="px-6 py-4 text-gray-900">{new Date(review.reviewDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                    <td className="px-6 py-4">{renderStars(review.rating)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setShowDeleteConfirm(review._id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm flex items-center gap-2 transition-colors"
                      >
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-sm w-full mx-4 p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Delete Review?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
