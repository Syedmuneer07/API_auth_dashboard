import { useEffect, useState } from 'react';
import { LogOut, Mail } from 'lucide-react';
import { apiService } from '../services/api.service';
import { authService } from '../services/auth.service';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { ERROR_MESSAGES } from '../utils/constants';

const Dashboard = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiService.fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message || ERROR_MESSAGES.FETCH_FAILED);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-blue-100 mt-1">Manage your users</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loader message="Fetching users..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setPage(page)} />
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No users found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Previous
                </button>
                <div className="px-6 py-3 bg-gray-100 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Page {page} of {totalPages}
                  </span>
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
