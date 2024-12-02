import React from 'react';

const TimeBar = ({ position, duration, videoWidthPercentage }) => {
  const timeMarkers = Array.from(
    { length: 11 }, // Divides into 10 sections
    (_, i) => ((duration / 10) * i).toFixed(1) // Dynamically calculate markers
  );

  return (
    <div
      className="relative h-8 mt-2 bg-gray-800 rounded overflow-hidden"
      style={{
        width: `${videoWidthPercentage}%`, // Width dynamically matches the video
        margin: '0 auto',
      }}
    >
      {/* Playhead Indicator */}
      <div
        className="absolute h-full w-[2px] bg-red-500 z-50 cursor-pointer transition-all ease-out"
        style={{ left: `${position}%` }}
      />
    
      {/* Time Markers */}
      <div className="flex justify-between text-xs font-semibold text-gray-200">
        {timeMarkers.map((time, index) => (
          <span key={index} className="flex-grow text-center">
            {formatTime(time)}
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper function to format time
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default TimeBar;
