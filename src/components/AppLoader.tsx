import React, { useState, useEffect } from 'react';

const AppLoader: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lamaPurple"></div>
      </div>
      <p className="text-center text-lg font-semibold text-gray-500">
        Loading{dots}
        <span className="invisible">...</span>
      </p>
    </>
  );
};

export default AppLoader;