import { useState } from "react";

function TextAnimationBar({ animationType, setAnimationType, animationDuration, setAnimationDuration }) {
  return (
    <div className="flex space-x-3">
      {/* Animation Type Selector */}
      <div className="flex items-center">
        <select
          value={animationType}
          onChange={(e) => setAnimationType(e.target.value)}
          className="border bg-[#1B1B1C] px-2 py-1 rounded-md"
        >
          <option value="fade">Fade</option>
          <option value="slide">Slide</option>
          <option value="bounce">Bounce</option>
          <option value="zoom">Zoom</option>
        </select>
        <span className="ml-2">Animation Type</span>
      </div>

      {/* Removed the Animation Duration Selector */}
    </div>
  );
}

export default TextAnimationBar;
