
import React from 'react';

const Spinner: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-aws-squid-ink">
      <div className="w-16 h-16 border-4 border-aws-orange border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="text-lg font-semibold animate-pulse">{text}</p>
    </div>
  );
};

export default Spinner;
