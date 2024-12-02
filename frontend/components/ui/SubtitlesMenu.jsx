import { FaRobot } from "react-icons/fa";
import { FiType } from "react-icons/fi";
import { useState } from "react"; // Import useState for managing state
import ManualSubtitles from "./ManualSubtitles"; // Import the ManualSubtitles component
import AiSubtitles from "./AiSubtitles"; // Import the AiSubtitles component

function SubtitlesMenu() {
  const [selectedOption, setSelectedOption] = useState(null); // State to track the selected option

  const handleOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option when a button is clicked
  };

  const goBack = () => {
    setSelectedOption(null); // Reset to null to show SubtitlesMenu
  };

  // Conditionally render AiSubtitles or ManualSubtitles if an option is selected
  if (selectedOption === "ManualSubtitles") {
    return <ManualSubtitles />; // Render the ManualSubtitles component
  }

  if (selectedOption === "AiSubtitles") {
    return <AiSubtitles goBack={goBack} />; // Pass goBack function to AiSubtitles
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Select Subtitles</h2>
      {[{ icon: <FaRobot className="text-4xl" />, label: "AI Subtitles", description: "Automatically recognize speech and generate subtitles", option: "AiSubtitles" }, 
      { icon: <FiType className="text-[24px]" />, label: "Manual Subtitles", description: "Add Subtitles Manually", option: "ManualSubtitles" }].map((item, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(item.option)}
          className="flex flex-col items-center bg-gray-400 hover:bg-gray-500 transition-all duration-300 text-white py-2 rounded-md w-full space-y-1"
        >
          <div className="flex flex-col items-center space-y-2">
            {item.icon}
            <span className="font-semibold text-lg text-gray-800">
              {item.label}
            </span>
          </div>
          <p className="text-sm text-center">{item.description}</p>
        </button>
      ))}
    </div>
  );
}

export default SubtitlesMenu;
