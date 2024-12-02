import { useState } from "react";
import TextAnimationBar from "./TextAnimationBar";

function TextAnimation() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationType, setAnimationType] = useState("fade"); // Default animation type
  const [animationDuration, setAnimationDuration] = useState(1); // Default duration in seconds

  const toggleAnimation = () => {
    setIsAnimated(prevState => !prevState);
  };

  return (
    <div className="space-y-4">
      {/* Text Animation label */}
      <div className="flex items-center justify-between space-x-4">
        <span className="text-md">Text Animation</span>

        {/* Toggle Switch */}
        <div
          className={`relative w-11 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${isAnimated ? 'bg-blue-500' : 'bg-gray-300'}`}
          onClick={toggleAnimation}
        >
          {/* Toggle knob */}
          <div
            className={`absolute top-1/2 left-1 ${isAnimated ? 'translate-x-6' : ''} w-4 h-4 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out`}
          ></div>
        </div>
      </div>

      {/* Render TextAnimationBar only when "On" */}
      {isAnimated && (
        <div className="mt-4">
          <TextAnimationBar 
            animationType={animationType} 
            setAnimationType={setAnimationType}
            animationDuration={animationDuration} 
            setAnimationDuration={setAnimationDuration}
          />
        </div>
      )}
    </div>
  );
}

export default TextAnimation;
