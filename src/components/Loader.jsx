import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
    <p className="text-gray-600 text-sm">{message}</p>
  </div>
);
//eve@demo.com' and password: 'cityslicka'.

export default Loader;
