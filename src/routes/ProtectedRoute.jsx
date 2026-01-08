import { useEffect } from 'react';
import { authService } from '../services/auth.service';

const ProtectedRoute = ({ children, onAuthChange }) => {
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      onAuthChange(false);
    }
    
    const interval = setInterval(() => {
      if (!authService.isAuthenticated()) {
        onAuthChange(false);
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [onAuthChange]);
  
  if (!authService.isAuthenticated()) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
