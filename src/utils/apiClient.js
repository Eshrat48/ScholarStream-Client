/**
 * API Client for ScholarStream
 * Handles all HTTP requests to backend server
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call failed: ${endpoint}`, error);
    throw error;
  }
};

// GET request
export const get = (endpoint, options = {}) =>
  apiCall(endpoint, { ...options, method: 'GET' });

// POST request
export const post = (endpoint, data, options = {}) =>
  apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });

// PATCH request
export const patch = (endpoint, data, options = {}) =>
  apiCall(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });

// DELETE request
export const deleteRequest = (endpoint, options = {}) =>
  apiCall(endpoint, { ...options, method: 'DELETE' });
