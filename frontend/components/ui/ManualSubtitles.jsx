"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPlay, FaPause } from "react-icons/fa";
import SubtitlesStyle from "./SubtitlesStyle"; // Import the style component
import { useDispatch } from "react-redux";
import { addToCurrentVideo } from "../statemanagement/slices/currentObjects";
import { PiPaintBrushHousehold } from "react-icons/pi";


function ManualSubtitles() {
  const [subtitles, setSubtitles] = useState(""); // To manage subtitle input
  const [isPlaying, setIsPlaying] = useState(false); // To toggle play/pause state
  const [subtitlesList, setSubtitlesList] = useState([]); // To store the added subtitles
  const [showStyle, setShowStyle] = useState(false); // To toggle between components
  const dispatch = useDispatch();

  const handleAddSubtitles = () => {
    if (subtitles.trim()) {
      setSubtitlesList((prevSubtitles) => [
        { text: subtitles, id: Date.now() }, // Add new subtitle with a unique id
        ...prevSubtitles, // Make the new subtitle appear at the top
      ]);
      dispatch(
        addToCurrentVideo({
          url: subtitles,
          type: "subtitles",
          title: subtitles.slice(0, 3) + `...`,
        })
      );
      setSubtitles(""); // Clear the input after adding the subtitle
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState); // Toggle between play and pause
  };

  const handleDeleteAllSubtitles = () => {
    setSubtitlesList([]); // Reset the subtitlesList to an empty array
  };

  const handleClearText = () => {
    setSubtitles(""); // Clear the text in the textarea
  };

  if (showStyle) {
    // Render SubtitlesStyle component when showStyle is true
    return <SubtitlesStyle onBack={() => setShowStyle(false)} />;
  }

  return (
    <div className="space-y-4">
      {/* First Row */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Subtitles</h2>
        <div className="flex space-x-2">
          {/* Style Button */}
          <button
            onClick={() => setShowStyle(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-600 text-white rounded-md hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <span>Style</span><span className="text-2xl"><PiPaintBrushHousehold /></span></button>
          {/* Delete All Subtitles Button */}
          <button
            onClick={handleDeleteAllSubtitles}
            className="px-4 py-2 border border-white bg-gray-400 text-white rounded-md hover:bg-white hover:text-black transition-all duration-300"
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {/* Second Row */}
      <div className="relative">
        {/* Time Display */}
        <div className="absolute top-2 left-2 text-sm font-medium text-gray-700">
          00:00.0 - 00:00.5 {/* Static Time */}
        </div>

        <textarea
          value={subtitles}
          onChange={(e) => setSubtitles(e.target.value)}
          placeholder="Type your subtitles here..."
          className="w-full p-2 border text-black border-gray-300 rounded-md mt-2 h-28 pt-9"
          rows="4"
        />

        {/* Play/Pause Button inside Textarea */}
        <button
          onClick={togglePlayPause}
          className="absolute top-2 left-[calc(100%-78px)] text-black rounded-md p-2 pr-0 hover:text-gray-400 transition-all duration-300"
        >
          {isPlaying ? <FaPause /> : <FaPlay />} {/* Display Play or Pause based on state */}
        </button>

        {/* Delete Button inside Textarea */}
        <button
          onClick={handleClearText}
          className="absolute top-2 right-2 text-black rounded-md p-2 text-[20px] pt-[6px] pl-0 hover:text-gray-400 transition-all duration-300"
        >
          <MdDelete />
        </button>
      </div>

      {/* Add Subtitles Button */}
      <button
        onClick={handleAddSubtitles}
        className="w-full px-4 py-2 bg-gray-300 text-black font-bold rounded-md mt-4 hover:border-white hover:border-[1px] hover:text-black hover:bg-gray-400 transition-all duration-300"
      >
        Add Subtitles
      </button>
    </div>
  );
}

export default ManualSubtitles;
