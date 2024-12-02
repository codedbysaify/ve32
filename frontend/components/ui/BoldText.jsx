import { useState } from "react";

function BoldText({ setTextStyle, textStyle }) {
  const [isBoldSelected, setIsBoldSelected] = useState(textStyle === "bold");

  const handleBoldClick = () => {
    setIsBoldSelected((prev) => !prev);
    setTextStyle((prev) => (prev === "bold" ? "" : "bold"));
  };

  return (
    <button
      onClick={handleBoldClick}
      className={`py-2 px-4 hover:bg-gray-300 m-[2px] font-bold ${
        isBoldSelected ? "bg-gray-400" : ""  // Background becomes gray when not bold
      }`} 
    >
      B
    </button>
  );
}

export default BoldText;
