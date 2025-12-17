/**
 * Client-side validation utilities
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Min 6 chars, at least one uppercase, one special char (matching UI requirements)
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUppercase && hasSpecialChar;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validatePhotoURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getPasswordError = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain a special character';
  return '';
};

export const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Photo URL is optional, only validate if provided
  if (formData.photoURL && formData.photoURL.trim() !== '' && !validatePhotoURL(formData.photoURL)) {
    errors.photoURL = 'Please enter a valid photo URL';
  }

  const passwordError = getPasswordError(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
