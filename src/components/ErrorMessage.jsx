import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-[#1a1a1a] border border-red-900/50 rounded-lg p-5 flex items-start gap-4">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center">
        <AlertCircle className="w-4 h-4 text-red-400" />
      </div>
    </div>
    <div className="flex-1">
      <h3 className="text-red-400 font-semibold text-sm mb-1">Error</h3>
      <p className="text-gray-300 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] hover:bg-[#1a1a1a] border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  </div>
);

export default ErrorMessage;
