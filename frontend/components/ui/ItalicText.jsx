function ItalicText({ setTextStyle, textStyle }) {
  const handleItalicClick = () => {
    // Toggle italic text style
    setTextStyle((prev) => (prev === "italic" ? "" : "italic"));
  };

  return (
    <button
      onClick={handleItalicClick}
      className={`py-2 px-4 hover:bg-gray-300 m-[2px] ${
        textStyle === "italic" ? "bg-gray-400" : "" // Apply bg-gray-400 when italic is active
      }`}
    >
      /
    </button>
  );
}

export default ItalicText;
