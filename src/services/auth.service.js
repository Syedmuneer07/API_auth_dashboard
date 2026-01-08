import {
  API_BASE_URL,
  TOKEN_KEY,    
  TOKEN_EXPIRY_KEY,
  TOKEN_EXPIRY_DURATION
} from '../utils/constants';

export const authService = {
  login: async (email, password) => {
    // Mocked authentication for frontend demo
    if (email === 'eve@reqres.in' && password === 'cityslicka') {
      // Simulate successful login with a fake token
      const fakeToken = 'mocked-jwt-token-' + Date.now();
      const expiryTime = Date.now() + TOKEN_EXPIRY_DURATION;

      localStorage.setItem(TOKEN_KEY, fakeToken);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

      return fakeToken;
    } else {
      // Simulate failed login
      throw new Error('Invalid email or password');
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  getToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (token && expiry) {
      if (Date.now() > parseInt(expiry, 10)) {
        authService.logout();
        return null;
      }
      return token;
    }
    return null;
  },

  isAuthenticated: () => {
    return authService.getToken() !== null;
  },
};
