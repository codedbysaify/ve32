import { useState } from "react";

function TextShadowBar({ shadowColor, setShadowColor, shadowIntensity, setShadowIntensity }) {
  return (
    <div className="flex space-x-3">
      {/* Shadow Intensity Bar */}
      <div className="flex items-center">
        <input
          type="range"
          min="1"
          max="50"
          value={shadowIntensity}
          onChange={(e) => setShadowIntensity(Number(e.target.value))}
          className="w-[220px] h-[2px] bg-gray-200"
        />
        <span className="text-md">{shadowIntensity}</span> {/* This will display the shadow intensity */}
      </div>

      {/* Shadow Color Picker */}
      <div className="w-6 h-6 p-0">
        <input
          type="color"
          value={shadowColor}
          onChange={(e) => setShadowColor(e.target.value)}
          className="w-full h-full p-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TextShadowBar;
