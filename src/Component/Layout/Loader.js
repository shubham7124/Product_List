import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
    </div>
  );
};

export default Loader;
