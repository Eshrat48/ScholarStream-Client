import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../utils/apiClient';
import { SCHOLARSHIP_CATEGORY, DEGREE_TYPES } from '../../utils/constants';

const AddScholarship = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    scholarshipName: '',
    universityName: '',
    universityImage: '',
    universityCountry: '',
    universityCity: '',
    universityWorldRank: '',
    subjectCategory: '',
    scholarshipCategory: 'Merit-based',
    degree: 'Diploma',
    tuitionFees: '',
    applicationFees: '',
    serviceCharge: '',
    applicationDeadline: '',
    scholarshipDescription: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.scholarshipName.trim()) {
      newErrors.scholarshipName = 'Scholarship name is required';
    }

    if (!formData.universityName.trim()) {
      newErrors.universityName = 'University name is required';
    }

    if (!formData.universityImage.trim()) {
      newErrors.universityImage = 'University image URL is required';
    } else if (!formData.universityImage.match(/^https?:\/\/.+/)) {
      newErrors.universityImage = 'Please enter a valid URL';
    }

    if (!formData.universityCountry.trim()) {
      newErrors.universityCountry = 'University country is required';
    }

    if (!formData.universityCity.trim()) {
      newErrors.universityCity = 'University city is required';
    }

    if (!formData.universityWorldRank) {
      newErrors.universityWorldRank = 'University world rank is required';
    } else if (isNaN(formData.universityWorldRank) || formData.universityWorldRank < 1) {
      newErrors.universityWorldRank = 'Please enter a valid rank';
    }

    if (!formData.subjectCategory.trim()) {
      newErrors.subjectCategory = 'Subject category is required';
    }

    if (!formData.tuitionFees) {
      newErrors.tuitionFees = 'Tuition fees is required';
    } else if (isNaN(formData.tuitionFees) || formData.tuitionFees < 0) {
      newErrors.tuitionFees = 'Please enter a valid amount';
    }

    if (!formData.applicationFees) {
      newErrors.applicationFees = 'Application fees is required';
    } else if (isNaN(formData.applicationFees) || formData.applicationFees < 0) {
      newErrors.applicationFees = 'Please enter a valid amount';
    }

    if (!formData.serviceCharge) {
      newErrors.serviceCharge = 'Service charge is required';
    } else if (isNaN(formData.serviceCharge) || formData.serviceCharge < 0) {
      newErrors.serviceCharge = 'Please enter a valid amount';
    }

    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = 'Application deadline is required';
    } else {
      const deadline = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline < today) {
        newErrors.applicationDeadline = 'Deadline must be in the future';
      }
    }

    if (!formData.scholarshipDescription.trim()) {
      newErrors.scholarshipDescription = 'Scholarship description is required';
    } else if (formData.scholarshipDescription.trim().length < 50) {
      newErrors.scholarshipDescription = 'Description must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Convert numeric fields to numbers
      const scholarshipData = {
        ...formData,
        universityWorldRank: parseInt(formData.universityWorldRank),
        tuitionFees: parseFloat(formData.tuitionFees),
        applicationFees: parseFloat(formData.applicationFees),
        serviceCharge: parseFloat(formData.serviceCharge),
        applicationDeadline: new Date(formData.applicationDeadline).toISOString()
      };

      const response = await post('/scholarships', scholarshipData);
      console.log('Response:', response);
      alert('Scholarship added successfully!');
      // Reset form after successful submission
      handleReset();
      // Navigate to dashboard home or stay on page
      // navigate('/dashboard/my-profile');
    } catch (error) {
      console.error('Error adding scholarship:', error);
      alert(`Failed to add scholarship: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      scholarshipName: '',
      universityName: '',
      universityImage: '',
      universityCountry: '',
      universityCity: '',
      universityWorldRank: '',
      subjectCategory: '',
      scholarshipCategory: 'Merit-based',
      degree: 'Diploma',
      tuitionFees: '',
      applicationFees: '',
      serviceCharge: '',
      applicationDeadline: '',
      scholarshipDescription: ''
    });
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Add New Scholarship</h1>
        <p className="text-base-content/70 mb-6">Fill in the details to create a new scholarship</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scholarship Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Scholarship Information</h2>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Scholarship Name *</span>
              </label>
              <input
                type="text"
                name="scholarshipName"
                value={formData.scholarshipName}
                onChange={handleChange}
                placeholder="e.g., Merit-Based Full Scholarship"
                className={`input input-bordered w-full ${errors.scholarshipName ? 'input-error' : ''}`}
              />
              {errors.scholarshipName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.scholarshipName}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Scholarship Category *</span>
                </label>
                <select
                  name="scholarshipCategory"
                  value={formData.scholarshipCategory}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {Object.values(SCHOLARSHIP_CATEGORY).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Degree *</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  {Object.values(DEGREE_TYPES).map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject Category *</span>
              </label>
              <input
                type="text"
                name="subjectCategory"
                value={formData.subjectCategory}
                onChange={handleChange}
                placeholder="e.g., Engineering, Business, Medicine"
                className={`input input-bordered w-full ${errors.subjectCategory ? 'input-error' : ''}`}
              />
              {errors.subjectCategory && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.subjectCategory}</span>
                </label>
              )}
            </div>
          </div>

          {/* University Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">University Information</h2>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">University Name *</span>
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                placeholder="e.g., Harvard University"
                className={`input input-bordered w-full ${errors.universityName ? 'input-error' : ''}`}
              />
              {errors.universityName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.universityName}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">University Image URL *</span>
              </label>
              <input
                type="url"
                name="universityImage"
                value={formData.universityImage}
                onChange={handleChange}
                placeholder="https://example.com/university-image.jpg"
                className={`input input-bordered w-full ${errors.universityImage ? 'input-error' : ''}`}
              />
              {errors.universityImage && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.universityImage}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Country *</span>
                </label>
                <input
                  type="text"
                  name="universityCountry"
                  value={formData.universityCountry}
                  onChange={handleChange}
                  placeholder="e.g., USA"
                  className={`input input-bordered w-full ${errors.universityCountry ? 'input-error' : ''}`}
                />
                {errors.universityCountry && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.universityCountry}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">City *</span>
                </label>
                <input
                  type="text"
                  name="universityCity"
                  value={formData.universityCity}
                  onChange={handleChange}
                  placeholder="e.g., Cambridge"
                  className={`input input-bordered w-full ${errors.universityCity ? 'input-error' : ''}`}
                />
                {errors.universityCity && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.universityCity}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">World Rank *</span>
                </label>
                <input
                  type="number"
                  name="universityWorldRank"
                  value={formData.universityWorldRank}
                  onChange={handleChange}
                  placeholder="e.g., 1"
                  min="1"
                  className={`input input-bordered w-full ${errors.universityWorldRank ? 'input-error' : ''}`}
                />
                {errors.universityWorldRank && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.universityWorldRank}</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Financial Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tuition Fees ($) *</span>
                </label>
                <input
                  type="number"
                  name="tuitionFees"
                  value={formData.tuitionFees}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  min="0"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.tuitionFees ? 'input-error' : ''}`}
                />
                {errors.tuitionFees && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.tuitionFees}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Fees ($) *</span>
                </label>
                <input
                  type="number"
                  name="applicationFees"
                  value={formData.applicationFees}
                  onChange={handleChange}
                  placeholder="e.g., 100"
                  min="0"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.applicationFees ? 'input-error' : ''}`}
                />
                {errors.applicationFees && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.applicationFees}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Service Charge ($) *</span>
                </label>
                <input
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                  className={`input input-bordered w-full ${errors.serviceCharge ? 'input-error' : ''}`}
                />
                {errors.serviceCharge && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.serviceCharge}</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Additional Information</h2>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Application Deadline *</span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                className={`input input-bordered w-full ${errors.applicationDeadline ? 'input-error' : ''}`}
              />
              {errors.applicationDeadline && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.applicationDeadline}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Scholarship Description * (minimum 50 characters)</span>
              </label>
              <textarea
                name="scholarshipDescription"
                value={formData.scholarshipDescription}
                onChange={handleChange}
                placeholder="Provide a detailed description of the scholarship, eligibility criteria, benefits, and application process..."
                className={`textarea textarea-bordered w-full h-32 ${errors.scholarshipDescription ? 'textarea-error' : ''}`}
              ></textarea>
              <label className="label">
                <span className="label-text-alt">{formData.scholarshipDescription.length} characters</span>
                {errors.scholarshipDescription && (
                  <span className="label-text-alt text-error">{errors.scholarshipDescription}</span>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Adding...
                </>
              ) : (
                'Add Scholarship'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="btn btn-outline flex-1"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
