function SmallCaseText({ setTextStyle, textStyle }) {
  const handleSmallCaseClick = () => {
    if (textStyle === "lowercase") {
      setTextStyle(""); // Remove small case
    } else {
      setTextStyle("lowercase"); // Apply small case
    }
  };

  return (
    <button
      onClick={handleSmallCaseClick}
      className={`py-2 px-4 hover:bg-gray-300 m-[2px] ${
        textStyle === "lowercase" ? "bg-gray-400" : "" // Change color to gray when small case is applied
      }`}
    >
      aa
    </button>
  );
}

export default SmallCaseText;
