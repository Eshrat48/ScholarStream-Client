import { useState, useEffect } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { useAuth } from '../../hooks/useAuth';
import { FaTrash, FaEdit, FaStar } from 'react-icons/fa';

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const endpoint = user?.email ? `/reviews/user/${encodeURIComponent(user.email)}` : '/reviews/my-reviews';
      const response = await get(endpoint);
      setReviews(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteRequest(`/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const handleEdit = (review) => {
    setEditingReview({
      ...review,
      ratingPoint: review.ratingPoint,
      reviewComment: review.reviewComment,
    });
  };

  const handleUpdate = async () => {
    try {
      await patch(`/reviews/${editingReview._id}`, {
        ratingPoint: editingReview.ratingPoint,
        reviewComment: editingReview.reviewComment,
      });
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      alert('Failed to update review');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Reviews</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border-2 border-gray-200 overflow-hidden">
        {/* Header description */}
        <div className="p-6 border-b border-gray-200">
          {error ? (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-2 text-sm">
              {error}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Manage and view all the scholarship reviews you have submitted.</p>
          )}
        </div>

        {reviews.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-600 text-lg">You haven't written any reviews yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="px-6 py-3 border-b border-gray-200">Scholarship Name</th>
                  <th className="px-6 py-3 border-b border-gray-200">University Name</th>
                  <th className="px-6 py-3 border-b border-gray-200">Review Date</th>
                  <th className="px-6 py-3 border-b border-gray-200">Rating</th>
                  <th className="px-6 py-3 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{review.scholarshipName}</div>
                      {review.reviewComment && (
                        <div className="text-sm text-gray-600 truncate max-w-md">{review.reviewComment}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{review.universityName}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < (review.ratingPoint || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-700">{Number(review.ratingPoint || 0).toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(review)}
                          className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="p-2 rounded-md text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Review</h3>
            
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="rating rating-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={editingReview.ratingPoint === star}
                    onChange={() => setEditingReview({ ...editingReview, ratingPoint: star })}
                  />
                ))}
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={editingReview.reviewComment}
                onChange={(e) => setEditingReview({ ...editingReview, reviewComment: e.target.value })}
              ></textarea>
            </div>

            <div className="modal-action">
              <button onClick={handleUpdate} className="btn btn-primary">
                Update
              </button>
              <button onClick={() => setEditingReview(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setEditingReview(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
