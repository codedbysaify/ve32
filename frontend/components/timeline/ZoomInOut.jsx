import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";



function ZoomInOut() {
  const [zoomLevel, setZoomLevel] = useState(50); // Default zoom level (50%)

  // Handle increment and decrement for zoom level
  const increaseZoom = () => {
    if (zoomLevel < 100) {
      setZoomLevel(zoomLevel + 5); // Increase by 5
    }
  };

  const decreaseZoom = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 5); // Decrease by 5
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Decrease Zoom Button */}
      <button
        onClick={decreaseZoom}
        className="text-lg rounded-md hover:bg-gray-400"
      >
     <AiFillMinusCircle />


      </button>

      {/* Zoom Level Slider */}
      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          className="w-[70px] h-[2px] bg-gray-300"
        />
      </div>

      {/* Increase Zoom Button */}
      <button
        onClick={increaseZoom}
        className="text-lg rounded-md hover:bg-gray-400"
      >
        <IoMdAddCircle />

      </button>
    </div>
  );
}

export default ZoomInOut;
