import React from 'react';

const LoadingSpinner: React.FC = () => {
   return (
      <div className="flex justify-center items-center p-12">
         <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
            <div className="h-16 w-16 rounded-full border-4 border-gray-900 border-t-transparent animate-spin absolute top-0 left-0"></div>
         </div>
      </div>
   );
};

export default LoadingSpinner;
