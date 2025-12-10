import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../utils/apiClient';
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaGraduationCap } from 'react-icons/fa';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedDegree) params.append('degree', selectedDegree);
      if (sortBy) {
        if (sortBy === 'fees_asc') params.append('sortBy', 'applicationFees');
        if (sortBy === 'fees_desc') {
          params.append('sortBy', 'applicationFees');
          params.append('order', 'desc');
        }
        if (sortBy === 'newest') params.append('sortBy', 'postDate');
      }

      const response = await get(`/scholarships?${params.toString()}`);
      
      setScholarships(response.data || []);
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages || 1);
      }
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
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Scholarships
          </h1>
          <p className="text-gray-600 text-lg">
            Explore thousands of scholarship opportunities worldwide
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Bar */}
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search by scholarship name, university, or degree..."
                    className="input input-bordered w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <FaSearch className="mr-2" />
                    Search
                  </button>
                </div>
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Category</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Categories</option>
                    <option value="Merit-based">Merit-based</option>
                    <option value="Need-based">Need-based</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Research">Research</option>
                    <option value="International">International</option>
                  </select>
                </div>

                {/* Degree Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Degree</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedDegree}
                    onChange={(e) => {
                      setSelectedDegree(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Degrees</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                {/* Sort By */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Sort By</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="fees_asc">Lowest Fees First</option>
                    <option value="fees_desc">Highest Fees First</option>
                  </select>
                </div>

                {/* Reset Button */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text opacity-0">Reset</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-outline w-full"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {/* Scholarships Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <figure className="h-48 overflow-hidden">
                    <img
                      src={scholarship.universityImage || 'https://via.placeholder.com/400x300'}
                      alt={scholarship.universityName}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">
                      {scholarship.scholarshipName}
                    </h2>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaGraduationCap className="text-primary" />
                        <span>{scholarship.universityName}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-primary" />
                        <span>{scholarship.universityCity}, {scholarship.universityCountry}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaDollarSign className="text-primary" />
                        <span>Application Fee: ${scholarship.applicationFees}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <span className="badge badge-primary badge-sm">
                        {scholarship.scholarshipCategory}
                      </span>
                      <span className="badge badge-secondary badge-sm">
                        {scholarship.degree}
                      </span>
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/scholarships/${scholarship._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {scholarships.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No scholarships found</p>
                <button onClick={handleReset} className="btn btn-primary mt-4">
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {scholarships.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
