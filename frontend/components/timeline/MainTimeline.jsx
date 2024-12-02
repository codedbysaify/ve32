'use client';
import React, { useEffect, useState } from 'react';
import { FaBackward, FaPause, FaPlay, FaForward } from 'react-icons/fa';
import CurlBackButton from './CurlBackutton';
import CurlForwardButton from './CurlForwardButton';
import SplitButton from './SplitButton';
import DeleteButton from './DeleteButton';
import VideoProgressBar from './VideoProgressBar';
import TextOverlayTrack from './TextOverlayTrack';
import AudioOverlayTrack from './AudioOverlayTrack';
import SplitLine from './SplitLine';
import { useSelector } from 'react-redux';
import ImageBar from './ImageBar';
import SubtitlesBar from './SubtitlesBar';
import TimeBar from './timeBar';
import ZoomInOut from './ZoomInOut';
import { useDispatch } from 'react-redux';
import { addToCurrentVideo } from '../statemanagement/slices/currentObjects';
import useFetchOnStateChange from "../hooks/useFetchOnStateChange"

const MainTimeline = ({ videoRef, isPlaying, onPlay, onPause, onRewind, onForward, Duration, playheadPosition }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  const duration = Duration;
  const currentState = useSelector((state) => state.currentVideo);
  useFetchOnStateChange();
  useEffect(() => {
    const videoElement = videoRef?.current;
    let animationFrameId;

    const updateCurrentTime = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
        animationFrameId = requestAnimationFrame(updateCurrentTime);
      }
    };

    if (isPlaying && videoElement) {
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, videoRef]);

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1) * 1000);
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
  };

  const totalTimelineLength = currentState.reduce((sum, item) => sum + (item.duration || 0), 0);
  const videoWidthPercentage = (duration / totalTimelineLength) * 100 || 100;

  //drag functionality starts
  const dispatch = useDispatch();

  // const handleDrop = (event) => {
  //   event.preventDefault();
  
  //   const audioData = JSON.parse(event.dataTransfer.getData('audioData'));
  
  //   // Get the mouse position or timeline position
  //   const mousePosition = event.clientY; // You can adjust this calculation based on your timeline
  
  //   // Create the new item object with the position
  //   const newItem = {
  //     url: audioData.url,
  //     title: audioData.title || "Dragged Audio",
  //     type: "audio/", // Assuming the type is "audio"
  //     position: mousePosition, // Set position here
  //   };
  
  //   // Dispatch to Redux
  //   dispatch(addToCurrentVideo(newItem));
  // };
  
  // const handleDragOver = (event) => {
  //   event.preventDefault();
  //   // Optionally, you can adjust styles to show where the item will be dropped.
  // };
  
//drag functionality ends
const drophandler=(e)=>{

  e.preventDefault(); // Allow the drop
  const {url,title,type} =JSON.parse(e.dataTransfer.getData('application/json'));
  console.log(title)
    const payload={
    url,
    title,
    type
  }
  dispatch(addToCurrentVideo(payload))
   
}

  return (
    <div
      className="fixed bottom-0 left-[96px] bg-[#252528] border-t border-gray-100 shadow-lg p-4 flex flex-col justify-between"
      style={{
        width: 'calc(100% - 96px)',
        height: 'calc(100vh - 320px)',
      }
    }
    onDrop={(e) => drophandler(e)}  // Use onDrop instead of onDragOver
    onDragOver={(e) => e.preventDefault()}  // Required to allow the drop
      >
      {/* Top Controls Row */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-3">
          <CurlBackButton />
          <CurlForwardButton />
          <SplitButton />
          <DeleteButton />
        </div>

        <div className="flex space-x-3 items-center">
          <button onClick={onRewind} className="hover:text-gray-500">
            <FaBackward />
          </button>
          <button onClick={isPlaying ? onPause : onPlay} className="text-2xl hover:text-gray-500">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={onForward} className="hover:text-gray-500">
            <FaForward />
          </button>
          <span className="flex space-x-1">
            <span className="text-gray-300 text-sm">{formatTime(currentTime)}</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-gray-300 text-sm">{formatTime(duration)}</span>
          </span>
        </div>

        <div><ZoomInOut /></div>
      </div>

      {/* TimeBar */}
      <TimeBar
        position={playheadPosition}
        duration={duration}
        videoWidthPercentage={videoWidthPercentage}
      />

      {/* Second Row (Timeline Content) */}

      {/* drop the the dragabble items inside the below div  */}
      <div className=" w-full h-[190px] bg-gray-600 rounded-lg relative overflow-y-auto"
      // onDrop={handleDrop}
      // onDragOver={handleDragOver}
      >                            
        <SplitLine position={playheadPosition} />
        
        
        {currentState.map((item, index) => {
          let itemStyle = {};
          if (item.position) {
            // Adjust the style based on the position (e.g., top position)
            itemStyle = { top: item.position + 'px' };  // Assuming a vertical timeline
          }
          if (item.type.startsWith('audio/')) {
            return (
              <div key={index} className="my-2" style={itemStyle}>
                <AudioOverlayTrack text={item.name} />
              </div>
            );
          } else if (item.type.startsWith('video/')) {
            return (
              <div key={index} className="my-2" style={itemStyle}>
                <VideoProgressBar text={item.title} 
                />
                
              </div>
            );
          } else if (item.type.startsWith('image/')) {
            return (
              <div key={index} className="my-2" style={itemStyle}>
                <ImageBar text={item.title} />
              </div>
            );
          } else if (item.type.startsWith('subtitles')) {
            return (
              <div key={index} className="my-2">
                <SubtitlesBar text={item.title} />
              </div>
            );
          } else if (item.type.startsWith('text/')) {
            return (
              <div key={index} className="my-2">
                <TextOverlayTrack text={item.title} />
              </div>
            );
          } else {
            return <></>;
          
          }
         

        })}</div>
  
    </div>
  );
};

export default MainTimeline;