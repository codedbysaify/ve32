function TitleCaseText({ setTextStyle, textStyle }) {
  const handleTitleCaseClick = () => {
    if (textStyle === "capitalize") {
      setTextStyle(""); // Remove title case
    } else {
      setTextStyle("capitalize"); // Apply title case
    }
  };

  return (
    <button
      onClick={handleTitleCaseClick}
      className={`py-2 px-4 hover:bg-gray-300 m-[2px] ${
        textStyle === "capitalize" ? "bg-gray-400" : "" // Change color to gray when title case is applied
      }`}
    >
      Aa
    </button>
  );
}

export default TitleCaseText;
