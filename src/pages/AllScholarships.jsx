import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../utils/apiClient';
import { FaSearch, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { SCHOLARSHIP_CATEGORY, DEGREE_TYPES } from '../utils/constants';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchScholarships();
  }, [searchTerm, selectedCategory, selectedDegree, sortBy, currentPage]);

  const fetchScholarships = async () => {
    setLoading(true);
    setError('');

    try {
      // Build query params
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (sortBy) params.append('sortBy', sortBy);

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDegree) params.append('degree', selectedDegree);

      const response = await get(`/scholarships?${params.toString()}`);
      
      setScholarships(response.scholarships || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Failed to load scholarships');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchScholarships();
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDegree('');
    setSortBy('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header with Sort */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Scholarships</h1>
            <p className="text-gray-600">Find your perfect scholarship opportunity</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered select-sm bg-white text-gray-700"
            >
              <option value="">Default</option>
              <option value="postDate">Deadline</option>
              <option value="applicationFees">Application Fee</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">Filter Scholarships</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    className="input input-bordered w-full pl-10 bg-gray-50 text-gray-800 placeholder-gray-400 focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-gray-800">Scholarship Category</h3>
                  <span className="text-xs text-gray-500">▼</span>
                </div>
                <div className="space-y-2.5">
                  <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="radio radio-sm radio-primary"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium">All Categories</span>
                  </label>
                  {Object.values(SCHOLARSHIP_CATEGORY).map(cat => (
                    <label key={cat} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="radio radio-sm radio-primary"
                      />
                      <span className="ml-3 text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Degree Filter */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm text-gray-800">Degree Type</h3>
                  <span className="text-xs text-gray-500">▼</span>
                </div>
                <div className="space-y-2.5">
                  <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    <input
                      type="radio"
                      name="degree"
                      value=""
                      checked={selectedDegree === ''}
                      onChange={(e) => setSelectedDegree(e.target.value)}
                      className="radio radio-sm radio-primary"
                    />
                    <span className="ml-3 text-sm text-gray-700 font-medium">All Degrees</span>
                  </label>
                  {Object.values(DEGREE_TYPES).map(degree => (
                    <label key={degree} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <input
                        type="radio"
                        name="degree"
                        value={degree}
                        checked={selectedDegree === degree}
                        onChange={(e) => setSelectedDegree(e.target.value)}
                        className="radio radio-sm radio-primary"
                      />
                      <span className="ml-3 text-sm text-gray-700">{degree}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="btn btn-primary btn-sm w-full shadow-md hover:shadow-lg transition-shadow"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-outline btn-sm w-full hover:bg-gray-100 text-gray-700"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Scholarships Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-gray-600 mt-4">Loading scholarships...</p>
              </div>
            ) : error ? (
              <div className="alert alert-error shadow-lg">
                <span className="text-white">{error}</span>
              </div>
            ) : scholarships.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-2xl font-semibold text-gray-800 mb-2">No scholarships found</p>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button onClick={handleReset} className="btn btn-primary shadow-md">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarships.map(scholarship => (
                    <div key={scholarship._id} className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary overflow-hidden group flex flex-col h-full">
                      {/* Scholarship Image */}
                      <figure className="h-48 overflow-hidden flex-shrink-0">
                        <img
                          src={scholarship.universityImage || 'https://via.placeholder.com/400x300'}
                          alt={scholarship.universityName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </figure>

                      <div className="card-body p-5 flex flex-col flex-grow">
                        {/* University & Scholarship Name */}
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{scholarship.universityName}</h3>
                        <h2 className="text-lg font-bold text-gray-800 leading-tight mb-3 line-clamp-2">{scholarship.scholarshipName}</h2>

                        {/* Category Badges */}
                        <div className="flex gap-2 mb-3">
                          <span className="badge badge-primary badge-sm text-white font-medium">{scholarship.scholarshipCategory}</span>
                          <span className="badge badge-secondary badge-sm text-white font-medium">{scholarship.degree}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mr-2 text-primary flex-shrink-0" />
                          <span className="font-medium">{scholarship.universityCity}, {scholarship.universityCountry}</span>
                        </div>

                        {/* Application Fee */}
                        <div className="flex items-center text-sm text-gray-600 mb-4 mt-auto pt-3 border-t border-gray-200">
                          <FaDollarSign className="mr-2 text-green-600 flex-shrink-0" />
                          <span className="font-medium">
                            {scholarship.applicationFees === 0 ? (
                              <span className="text-green-600 font-semibold">No Fee</span>
                            ) : (
                              <span>${scholarship.applicationFees}</span>
                            )}
                          </span>
                        </div>

                        {/* View Details Button */}
                        <Link
                          to={`/scholarships/${scholarship._id}`}
                          className="btn btn-primary btn-sm w-full shadow-md hover:shadow-lg transition-shadow mt-2"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-10">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="btn btn-sm btn-outline text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      ← Previous
                    </button>
                    
                    <div className="join shadow-md">
                      {[...Array(Math.min(10, totalPages))].map((_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`join-item btn btn-sm ${
                              currentPage === page 
                                ? 'btn-primary text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="btn btn-sm btn-outline text-gray-700 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
