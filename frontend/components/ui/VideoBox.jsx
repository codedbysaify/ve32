'use client';

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import MainTimeline from '../timeline/MainTimeline';


function VideoBox() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playheadPosition, setPlayheadPosition] = useState(0);

  // Get currentVideo from Redux store
  const mediaUrls = useSelector((state) => state.currentVideo);
  const srcURL=useSelector((state)=>state.editedVideo)
  const currentMediaUrl =
    mediaUrls.length > 0 && (mediaUrls[0].type !== 'text' || mediaUrls[0].type !== 'subtitles')
      ? mediaUrls[0]
      : null;

  // Video control functions
  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const rewindVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const forwardVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    const position = (currentTime / duration) * 100; // Percentage
    setPlayheadPosition(position);
  };

  return (
    <div
      className="h-[320px] bg-transparent fixed right-0 top-0 border border-b-0 border-gray-300 p-4 shadow-lg z-10"
      style={{ width: 'calc(100% - 466px)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {currentMediaUrl ? currentMediaUrl.title : 'Untitled Media'}
        </h2>
        <button className="px-3 py-1 text-white bg-blue-500 rounded-2xl hover:bg-blue-600 focus:outline-none transition-all duration-300">
          Export
        </button>
      </div>

      <div className="flex justify-center items-center w-full h-[230px] bg-transparent">
        <div className="relative w-[150px] h-full border overflow-hidden shadow-sm flex justify-center items-center">
          {currentMediaUrl ? (
            currentMediaUrl.type.startsWith('video/') ? (
              <video
                ref={videoRef}
                src={srcURL}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => setDuration(videoRef.current.duration)}
                className="w-full h-auto object-contain"
              >
                Your browser does not support the video tag.
              </video>
            ) : currentMediaUrl.type.startsWith('image/') ? (
              <img
                src={currentMediaUrl.url}
                alt={currentMediaUrl.title || 'Uploaded Media'}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full h-full bg-black border border-white/20 rounded-sm flex items-center justify-center">
                <span className="text-white/50 text-sm">No media selected</span>
              </div>
            )
          ) : (
            <div className="w-full h-full bg-black border border-white/20 rounded-sm flex items-center justify-center">
              <span className="text-white/50 text-sm">No media selected</span>
            </div>
          )}
        </div>
      </div>

      <MainTimeline
        videoRef={videoRef}
        isPlaying={isPlaying}
        onPlay={playVideo}
        onPause={pauseVideo}
        onRewind={rewindVideo}
        onForward={forwardVideo}
        Duration={duration}
        playheadPosition={playheadPosition}
        videoBoxWidth={150} // Pass video box width
      />
    </div>
  );
}

export default VideoBox;

//!Video Source has been set to shotstack edited video