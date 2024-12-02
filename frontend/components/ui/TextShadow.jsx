import { useState } from "react";
import TextShadowBar from "./TextShadowBar";

function TextShadow() {
  const [isOutlined, setIsOutlined] = useState(false);
  const [shadowIntensity, setShadowIntensity] = useState(1); // Default intensity
  const [shadowColor, setShadowColor] = useState("#000000"); // Default color

  const toggleOutline = () => {
    setIsOutlined(prevState => !prevState);
  };

  return (
    <div className="space-y-4">
      {/* Text Shadow label */}
      <div className="flex items-center justify-between space-x-4">
        <span className="text-md">Text Shadow</span>

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

      {/* Render TextShadowBar only when "On" */}
      {isOutlined && (
        <div className="mt-4">
          <TextShadowBar 
            shadowColor={shadowColor}  // Corrected prop name
            setShadowColor={setShadowColor} // Corrected prop name
            shadowIntensity={shadowIntensity} // Corrected prop name
            setShadowIntensity={setShadowIntensity} // Corrected prop name
          />
        </div>
      )}
    </div>
  );
}

export default TextShadow;
