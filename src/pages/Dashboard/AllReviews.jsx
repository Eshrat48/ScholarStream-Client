import { useState, useEffect } from 'react';
import { get, deleteRequest } from '../../utils/apiClient';
import { FaTrash, FaStar } from 'react-icons/fa';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterRating, setFilterRating] = useState('All');

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

  const filteredReviews = filterRating === 'All'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating));

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="text-sm ml-2">({rating}/5)</span>
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Moderate Reviews</h1>
        <p className="text-gray-600 mb-4">Review and moderate all scholarship reviews</p>

        <div className="flex gap-2">
          <label className="label">
            <span className="label-text">Filter by Rating:</span>
          </label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option>All</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>
          <span className="badge badge-lg mt-2">{filteredReviews.length} reviews</span>
        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {filteredReviews.length === 0 ? (
        <div className="alert alert-info">
          <span>No reviews found.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review._id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{review.scholarshipName}</h3>
                        <p className="text-sm text-gray-600">{review.universityName}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      {renderStars(review.rating)}
                    </div>

                    <p className="text-gray-700 mb-3">{review.comment}</p>

                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Reviewer: {review.reviewerEmail}</span>
                      <span>Date: {new Date(review.reviewDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowDeleteConfirm(review._id)}
                    className="btn btn-sm btn-error"
                    title="Delete this review"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Review?</h3>
            <p className="py-4">Are you sure you want to delete this review? This action cannot be undone.</p>
            <div className="modal-action">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="btn btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="btn"
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
