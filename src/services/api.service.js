import { API_BASE_URL } from '../utils/constants';
import { authService } from './auth.service';

export const apiService = {
  fetch: async (endpoint, options = {}) => {
    const token = authService.getToken();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (response.status === 401) {
      authService.logout();
      window.location.reload();
      throw new Error('Session expired. Please login again.');
    }
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    return await response.json();
  },
  
  fetchUsers: async (page = 1) => {
    return await apiService.fetch(`/users?page=${page}`);
  }
};

