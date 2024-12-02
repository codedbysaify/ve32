function CapitalCaseText({ setTextStyle, textStyle }) {
  const handleCapitalCaseClick = () => {
    if (textStyle === "uppercase") {
      setTextStyle(""); // Remove capital case
    } else {
      setTextStyle("uppercase"); // Apply capital case
    }
  };

  return (
    <button
      onClick={handleCapitalCaseClick}
      className={`py-2 px-4 hover:bg-gray-300 m-[2px] ${
        textStyle === "uppercase" ? "bg-gray-400" : "" // Change color to gray when capital case is applied
      }`}
    >
      AA
    </button>
  );
}

export default CapitalCaseText;
