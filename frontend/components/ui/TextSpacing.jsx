import { useState } from "react";

function TextSpacing({ setTextStyle, textStyle }) {
  const handleTextSpacingClick = () => {
    // Toggle text spacing
    if (textStyle === "spaced") {
      setTextStyle(""); // Remove text spacing
    } else {
      setTextStyle("spaced"); // Apply text spacing
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleTextSpacingClick}
        className={`py-2 px-4 hover:bg-gray-300 m-[2px] ${
          textStyle === "spaced" ? "bg-gray-400" : "" // Change button color to gray when spacing is applied
        }`}
      >
        T
      </button>
    </div>
  );
}

export default TextSpacing;
