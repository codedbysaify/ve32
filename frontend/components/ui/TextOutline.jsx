import { useState } from "react";
import TextOutlineBar from "./TextOutlineBar";

function TextOutline() {
  const [isOutlined, setIsOutlined] = useState(false);
  const [outlineIntensity, setOutlineIntensity] = useState(1); // Default intensity
  const [outlineColor, setOutlineColor] = useState("#000000"); // Default color

  const toggleOutline = () => {
    setIsOutlined(prevState => !prevState);
  };

  return (
    <div className="space-y-4">
      {/* Text Outline label */}
      <div className="flex items-center justify-between space-x-4">
        <span className="text-md">Text Outline</span>

        {/* Toggle Switch */}
        <div
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isOutlined ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={toggleOutline}
        >
          {/* Toggle knob */}
          <div
            className={`absolute top-1/2 left-1 ${isOutlined ? 'translate-x-6' : ''} w-4 h-4 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out`}
          ></div>
        </div>
      </div>

      {/* Render TextOutlineBar only when "On" */}
      {isOutlined && (
        <div className="mt-4">
          <TextOutlineBar 
            outlineColor={outlineColor} 
            setOutlineColor={setOutlineColor}
            outlineIntensity={outlineIntensity} 
            setOutlineIntensity={setOutlineIntensity}
          />
        </div>
      )}
    </div>
  );
}

export default TextOutline;
