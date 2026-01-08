export const API_BASE_URL = 'https://reqres.in/api';

export const TOKEN_KEY = 'auth_token';
export const TOKEN_EXPIRY_KEY = 'token_expiry';
export const TOKEN_EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please try again.',
  FETCH_FAILED: 'Failed to fetch data. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  FILL_ALL_FIELDS: 'Please fill in all fields.',
};
