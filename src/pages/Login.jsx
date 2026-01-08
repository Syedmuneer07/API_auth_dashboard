import { useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import { authService } from '../services/auth.service';
import { ERROR_MESSAGES } from '../utils/constants';
import ErrorMessage from '../components/ErrorMessage';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError(ERROR_MESSAGES.FILL_ALL_FIELDS);
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.login(formData.email, formData.password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.LOGIN_FAILED);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-[#171717] border border-gray-800 rounded-xl w-full max-w-md p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] border border-gray-800 rounded-xl mb-5">
            <User className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSubmit(e)}
              placeholder="Enter your Email Address"
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSubmit(e)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            />
          </div>
          
          {error && <ErrorMessage message={error} />}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 disabled:bg-gray-800 disabled:opacity-50 text-black hover:text-black disabled:text-gray-400 font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="mt-8 p-4 bg-[#1a1a1a] border border-gray-800 rounded-lg">
          <p className="text-sm text-gray-300 font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400">Email: <span className="text-gray-300">eve@demo.com</span></p>
            <p className="text-xs text-gray-400">Password: <span className="text-gray-300">cityslicka</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;
