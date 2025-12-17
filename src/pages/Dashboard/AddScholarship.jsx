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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.scholarshipName.trim()) newErrors.scholarshipName = 'Scholarship name is required';
    if (!formData.universityName.trim()) newErrors.universityName = 'University name is required';
    if (!formData.universityImage.trim()) newErrors.universityImage = 'University image URL is required';
    else if (!formData.universityImage.match(/^https?:\/\/.+/)) newErrors.universityImage = 'Please enter a valid URL';
    if (!formData.universityCountry.trim()) newErrors.universityCountry = 'University country is required';
    if (!formData.universityCity.trim()) newErrors.universityCity = 'University city is required';
    if (!formData.universityWorldRank) newErrors.universityWorldRank = 'University world rank is required';
    else if (isNaN(formData.universityWorldRank) || formData.universityWorldRank < 1) newErrors.universityWorldRank = 'Please enter a valid rank';
    if (!formData.subjectCategory.trim()) newErrors.subjectCategory = 'Subject category is required';
    if (!formData.tuitionFees) newErrors.tuitionFees = 'Tuition fees is required';
    else if (isNaN(formData.tuitionFees) || formData.tuitionFees < 0) newErrors.tuitionFees = 'Please enter a valid amount';
    if (!formData.applicationFees) newErrors.applicationFees = 'Application fees is required';
    else if (isNaN(formData.applicationFees) || formData.applicationFees < 0) newErrors.applicationFees = 'Please enter a valid amount';
    if (!formData.serviceCharge) newErrors.serviceCharge = 'Service charge is required';
    else if (isNaN(formData.serviceCharge) || formData.serviceCharge < 0) newErrors.serviceCharge = 'Please enter a valid amount';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    else {
      const deadline = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadline < today) newErrors.applicationDeadline = 'Deadline must be in the future';
    }
    if (!formData.scholarshipDescription.trim()) newErrors.scholarshipDescription = 'Scholarship description is required';
    else if (formData.scholarshipDescription.trim().length < 50) newErrors.scholarshipDescription = 'Description must be at least 50 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
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
      handleReset();
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
    <div className="max-w-5xl mx-auto min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 p-6">
      <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Scholarship</h1>
            <p className="text-sm text-blue-600 font-medium mt-1">Fill in the fields to publish a new scholarship on the platform</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
            disabled={loading}
          >
            Reset Form
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Scholarship & University Details */}
          <div className="border border-gray-200 rounded-lg bg-gray-50/60 p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Scholarship & University Details</h2>
              <span className="text-xs text-gray-500">* Required fields</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Name *</label>
                <input
                  type="text"
                  name="scholarshipName"
                  value={formData.scholarshipName}
                  onChange={handleChange}
                  placeholder="Future Leaders Grant"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.scholarshipName ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.scholarshipName && <p className="text-xs text-red-600 mt-1">{errors.scholarshipName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Category *</label>
                <select
                  name="scholarshipCategory"
                  value={formData.scholarshipCategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.values(SCHOLARSHIP_CATEGORY).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">University / Provider *</label>
                <input
                  type="text"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  placeholder="University of Oxford"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.universityName ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.universityName && <p className="text-xs text-red-600 mt-1">{errors.universityName}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="universityCountry"
                    value={formData.universityCountry}
                    onChange={handleChange}
                    placeholder="USA"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.universityCountry ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.universityCountry && <p className="text-xs text-red-600 mt-1">{errors.universityCountry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="universityCity"
                    value={formData.universityCity}
                    onChange={handleChange}
                    placeholder="Boston"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.universityCity ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.universityCity && <p className="text-xs text-red-600 mt-1">{errors.universityCity}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Major *</label>
                <input
                  type="text"
                  name="subjectCategory"
                  value={formData.subjectCategory}
                  onChange={handleChange}
                  placeholder="Engineering, Business, Medicine"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.subjectCategory ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.subjectCategory && <p className="text-xs text-red-600 mt-1">{errors.subjectCategory}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University Rank *</label>
                  <input
                    type="number"
                    name="universityWorldRank"
                    value={formData.universityWorldRank}
                    onChange={handleChange}
                    placeholder="1"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.universityWorldRank ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.universityWorldRank && <p className="text-xs text-red-600 mt-1">{errors.universityWorldRank}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University Image *</label>
                  <input
                    type="url"
                    name="universityImage"
                    value={formData.universityImage}
                    onChange={handleChange}
                    placeholder="https://example.com/banner.jpg"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.universityImage ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.universityImage && <p className="text-xs text-red-600 mt-1">{errors.universityImage}</p>}
                  <p className="text-[11px] text-gray-500 mt-1">JPEG/PNG, 1200x400 recommended.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Funding */}
          <div className="border border-gray-200 rounded-lg bg-white p-4 md:p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Academic & Funding Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Degree *</label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {Object.values(DEGREE_TYPES).map(degree => (
                    <option key={degree} value={degree}>{degree}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Fees *</label>
                <input
                  type="number"
                  name="tuitionFees"
                  value={formData.tuitionFees}
                  onChange={handleChange}
                  placeholder="20000"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.tuitionFees ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.tuitionFees && <p className="text-xs text-red-600 mt-1">{errors.tuitionFees}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Charge *</label>
                <input
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                  placeholder="50"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.serviceCharge ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.serviceCharge && <p className="text-xs text-red-600 mt-1">{errors.serviceCharge}</p>}
              </div>
            </div>
          </div>

          {/* Financial & Deadline */}
          <div className="border border-gray-200 rounded-lg bg-white p-4 md:p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Financial & Deadline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Fee *</label>
                <input
                  type="number"
                  name="applicationFees"
                  value={formData.applicationFees}
                  onChange={handleChange}
                  placeholder="100"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.applicationFees ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.applicationFees && <p className="text-xs text-red-600 mt-1">{errors.applicationFees}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline *</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.applicationDeadline ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.applicationDeadline && <p className="text-xs text-red-600 mt-1">{errors.applicationDeadline}</p>}
              </div>
            </div>
          </div>

          {/* Meta & Description */}
          <div className="border border-gray-200 rounded-lg bg-white p-4 md:p-5 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Meta Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  disabled
                  value={formData.publishDate || ''}
                  onChange={() => {}}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application End Date</label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.applicationDeadline ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Description *</label>
              <textarea
                name="scholarshipDescription"
                value={formData.scholarshipDescription}
                onChange={handleChange}
                rows="5"
                placeholder="Briefly describe the scholarship, eligibility, and benefits."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.scholarshipDescription ? 'border-red-400' : 'border-gray-300'}`}
              ></textarea>
              {errors.scholarshipDescription && <p className="text-xs text-red-600 mt-1">{errors.scholarshipDescription}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={loading}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Scholarship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
