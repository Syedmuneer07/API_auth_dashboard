import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-gray-800"></div>
      <Loader2 className="w-12 h-12 animate-spin text-gray-400 absolute top-0 left-0" />
    </div>
    <p className="text-gray-400 text-sm font-medium mt-4">{message}</p>
  </div>
);

export default Loader;
