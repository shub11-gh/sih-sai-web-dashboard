import React from 'react';

const Rating = ({ value, maxValue = 5 }) => {
  const normalizedValue = (value / maxValue) * 100;

  let barColor;
  if (normalizedValue >= 80) {
    barColor = 'bg-green-500';
  } else if (normalizedValue >= 50) {
    barColor = 'bg-yellow-500';
  } else {
    barColor = 'bg-red-500';
  }

  return (
    <div className="w-full bg-dark-600 rounded-full h-2.5">
      <div className={`h-2.5 rounded-full ${barColor}`} style={{ width: `${normalizedValue}%` }}></div>
    </div>
  );
};

export default Rating;