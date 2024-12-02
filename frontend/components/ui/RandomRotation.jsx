import { useState } from "react";
import RandomRotationBar from "./RandomRotationBar";

function RandomRotation() {
  const [isRotationActive, setIsRotationActive] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(90); // Default rotation degree
  const [rotationDirection, setRotationDirection] = useState("clockwise"); // Default direction

  const toggleRotation = () => {
    setIsRotationActive(prevState => !prevState);
  };

  return (
    <div className="space-y-4">
      {/* Random Rotation label */}
      <div className="flex items-center justify-between space-x-4">
        <span className="text-md">Random Rotation</span>

        {/* Toggle Switch */}
        <div
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isRotationActive ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={toggleRotation}
        >
          {/* Toggle knob */}
          <div
            className={`absolute top-1/2 left-1 ${isRotationActive ? 'translate-x-6' : ''} w-4 h-4 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out`}
          ></div>
        </div>
      </div>

      {/* Render RandomRotationBar only when "On" */}
      {isRotationActive && (
        <div className="mt-4">
          <RandomRotationBar 
            rotationDegree={rotationDegree} 
            setRotationDegree={setRotationDegree}
            rotationDirection={rotationDirection} 
            setRotationDirection={setRotationDirection}
          />
        </div>
      )}
    </div>
  );
}

export default RandomRotation;
