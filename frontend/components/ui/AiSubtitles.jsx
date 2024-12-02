import { IoIosArrowBack } from "react-icons/io"; // Import the back arrow icon
import { useState } from "react"; // Import useState to manage animation type
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function AiSubtitles({ goBack }) {
  const [animationType, setAnimationType] = useState("Girl-86"); // State to manage selected animation type
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

  const options = [
    { value: "Girl-86", label: "Girl-86", imgSrc: "/images/video_pic_1.jpeg", time: "2:30" },
    { value: "video2", label: "video2", imgSrc: "/images/video_pic_2.jpeg", time: "3:15" },
    { value: "video3", label: "video3", imgSrc: "/images/video_pic_3.jpeg", time: "5:00" },
    { value: "video4", label: "video4", imgSrc: "/images/video_pic_4.jpeg", time: "4:45" },
    { value: "video5", label: "video5", imgSrc: "/images/video_pic_1.jpeg", time: "2:00" },
    { value: "video6", label: "video6", imgSrc: "/images/video_pic_2.jpeg", time: "6:10" },
    { value: "video7", label: "video7", imgSrc: "/images/video_pic_3.jpeg", time: "7:20" },
    { value: "video8", label: "video8", imgSrc: "/images/video_pic_4.jpeg", time: "3:50" },
  ];

  const handleChange = (optionValue) => {
    setAnimationType(optionValue);
    setDropdownOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="p-[2px]">
      {/* Back Button */}
      <div className="flex mb-4">
        <button
          className="text-lg font-bold text-blue-500 mr-2"
          onClick={goBack} // Call the goBack function passed from SubtitlesMenu
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <span className="text-lg">
            <IoIosArrowBack />
          </span>
        </button>
        <div className="text-lg">Auto Subtitles</div>
      </div>

      {/* Heading Section */}
      <p className="text-sm mb-4 font-thin">tip: Ensure all files selectedOption include speech to prevent unexpected errors.</p>

      {/* Custom Dropdown with Images */}
      <div className="relative">
        <div
          className="flex items-center cursor-pointer bg-[#1B1B1C] px-4 py-2 mr-[2px] rounded-md w-72 border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="mr-2">
            {/* Image next to the selected label */}
            <img
              src={options.find(option => option.value === animationType)?.imgSrc}
              alt={animationType}
              className="inline-block w-6 h-6"
            />
          </span>
          <span>{options.find(option => option.value === animationType)?.label}</span>
          <span className="ml-[155px]">
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>

        {/* Dropdown Options with Scrollbar */}
        {dropdownOpen && (
          <div className="top-full left-0 bg-[#1B1B1C] w-72 h-32 rounded-md mt-1 mb-2 border-[1px] border-gray-600 overflow-y-auto max-h-60">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between px-4 py-2 cursor-pointer m-[2px] hover:bg-gray-700 transition-all duration-200"
                onClick={() => handleChange(option.value)}
              >
                {/* Image next to the text in the dropdown */}
                <div className="flex items-center">
                  <img
                    src={option.imgSrc}
                    alt={option.label}
                    className="inline-block w-6 h-6 mr-2"
                  />
                  <span>{option.label}</span>
                </div>
                {/* Time displayed to the right */}
                <span className="text-sm text-gray-400">{option.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Subtitles Button */}
      {!dropdownOpen && (
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-3xl w-72 hover:bg-blue-600 transition-all duration-300"
        >
          Create Subtitles
        </button>
      )}
    </div>
  );
}

export default AiSubtitles;
