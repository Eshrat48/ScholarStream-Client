/**
 * Application constants
 */

export const USER_ROLES = {
  STUDENT: 'Student',
  MODERATOR: 'Moderator',
  ADMIN: 'Admin',
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

export const PAYMENT_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
};

export const SCHOLARSHIP_CATEGORY = {
  MERIT_BASED: 'Merit-based',
  NEED_BASED: 'Need-based',
  SPORTS: 'Sports',
  ARTS: 'Arts',
  RESEARCH: 'Research',
  INTERNATIONAL: 'International',
};

export const ROUTES = {
  HOME: '/',
  ALL_SCHOLARSHIPS: '/scholarships',
  SCHOLARSHIP_DETAILS: '/scholarships/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CHECKOUT: '/checkout/:scholarshipId',
  PAYMENT_SUCCESS: '/payment-success',
  PAYMENT_FAILED: '/payment-failed',
  NOT_FOUND: '*',
};

export const DEGREE_TYPES = {
  DIPLOMA: 'Diploma',
  BACHELOR: 'Bachelor',
  MASTERS: 'Masters',
};

export const FILTER_OPTIONS = {
  SORT_BY: [
    { label: 'Newest First', value: 'newest' },
    { label: 'Lowest Fees First', value: 'fees_asc' },
    { label: 'Highest Fees First', value: 'fees_desc' },
  ],
  DEGREE: Object.values(DEGREE_TYPES),
  CATEGORY: Object.values(SCHOLARSHIP_CATEGORY),
};

export const TOAST_MESSAGES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
