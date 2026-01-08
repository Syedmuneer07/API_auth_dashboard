import { useState } from 'react';
import { authService } from './services/auth.service';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import './index.css'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  const handleAuthChange = (authStatus) => {
    setIsAuthenticated(authStatus);
  };
  
  return (
    <>
      {isAuthenticated ? (
        <ProtectedRoute onAuthChange={handleAuthChange}>
          <Dashboard onLogout={handleLogout} />
        </ProtectedRoute>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default App;
