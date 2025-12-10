import { useState, useEffect } from 'react';
import { get, patch, deleteRequest } from '../../utils/apiClient';
import { FaTrash, FaEdit, FaStar } from 'react-icons/fa';

const MyReviews = () => {
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
      const response = await get('/reviews/my-reviews');
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
    <div>
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">You haven't written any reviews yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>University</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td className="font-semibold">{review.scholarshipName}</td>
                  <td>{review.universityName}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < review.ratingPoint ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="max-w-xs truncate">{review.reviewComment}</div>
                  </td>
                  <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="btn btn-ghost btn-xs"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-error btn-xs"
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
