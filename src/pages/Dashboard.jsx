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
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-900 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your users</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <Loader message="Fetching users..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => setPage(page)} />
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {users.map(user => (
                <div 
                  key={user.id} 
                  className="bg-[#171717] border border-gray-800 rounded-lg p-8 hover:border-gray-700 hover:bg-[#1a1a1a] transition-all duration-200 group"
                >
                  <div className="flex items-start gap-6">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="w-20 h-20 rounded-full ring-2 ring-gray-800 group-hover:ring-gray-700 transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-xl mb-2">
                        {user.first_name} {user.last_name}
                      </h3>
                      <p className="text-gray-400 text-sm flex items-center gap-2 mt-3">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">User ID: {user.id}</span>
                      </div>
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
                  className="px-5 py-2.5 bg-[#171717] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium text-sm disabled:hover:bg-[#171717]"
                >
                  Previous
                </button>
                <div className="px-5 py-2.5 bg-[#171717] border border-gray-800 rounded-lg">
                  <span className="text-gray-300 font-medium text-sm">
                    Page <span className="text-white">{page}</span> of <span className="text-white">{totalPages}</span>
                  </span>
                </div>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 bg-[#171717] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 hover:text-white rounded-lg transition-all duration-200 font-medium text-sm disabled:hover:bg-[#171717]"
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
