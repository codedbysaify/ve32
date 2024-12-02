import { useState } from "react";

function RandomRotationBar({ rotationDegree, setRotationDegree, rotationDirection, setRotationDirection }) {
  return (
    <div className="flex flex-col space-y-3">
      {/* Rotation Degree Selector */}
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="360"
          value={rotationDegree}
          onChange={(e) => setRotationDegree(Number(e.target.value))}
          className="w-[2200px] h-[2px]"
        />
        <span>{rotationDegree}°</span>
      </div>

      {/* Rotation Direction Selector */}
      <div className="flex items-center">
        <select
          value={rotationDirection}
          onChange={(e) => setRotationDirection(e.target.value)}
          className="border px-2 py-1 rounded-md bg-[#1B1B1C]"
        >
          <option value="clockwise">Clockwise</option>
          <option value="counterclockwise">Counterclockwise</option>
        </select>
    
      </div>
    </div>
  );
}

export default RandomRotationBar;
