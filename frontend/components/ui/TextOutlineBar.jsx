import { useState } from "react";

function TextOutlineBar({ outlineColor, setOutlineColor, outlineIntensity, setOutlineIntensity }) {
  return (
    <div className="flex space-x-3">
      {/* Outline Intensity Bar */}
      <div className="flex items-center">
        <input
          type="range"
          min="1"
          max="50"
          value={outlineIntensity}
          onChange={(e) => setOutlineIntensity(Number(e.target.value))}
          className="w-[220px] h-[2px]"
        />
        <span>{outlineIntensity}</span>
      </div>

      {/* Outline Color Picker */}
      <div className="w-6 h-6 p-0">
        <input
          type="color"
          value={outlineColor}
          onChange={(e) => setOutlineColor(e.target.value)}
          className="w-full h-full p-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TextOutlineBar;
