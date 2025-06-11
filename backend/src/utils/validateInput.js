
export const validateEmail = (email) => {
  // Basic email regex for demonstration
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Password must be at least 8 characters long
  return password.length >= 8;
};

export const validateString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};