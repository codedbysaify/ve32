import { useState } from "react";
import FontSize from "./FontSize";
import FontStyle from "./FontStyle";
import FontColor from "./FontColor";
import BoldText from "./BoldText";
import ItalicText from "./ItalicText";
import CapitalCaseText from "./CapitalCaseText";
import SmallCaseText from "./SmallCaseText";
import TitleCaseText from "./TitleCaseText";
import TextSpacing from "./TextSpacing";
import TextOutline from "./TextOutline";
import TextShadow from "./TextShadow";
import TextDelete from "./TextDelete";
import { IoIosArrowBack } from "react-icons/io";

function AddParagraph({ goBack }) {
  const [fontStyle, setFontStyle] = useState("System");
  const [fontSize, setFontSize] = useState("16px"); // Default font size
  const [fontColor, setFontColor] = useState("#000000");
  const [headingText, setHeadingText] = useState(""); // State to store textarea content
  const [textStyle, setTextStyle] = useState(""); // State to store text style (e.g., bold, italic)

  const handleFontStyleChange = (newFontStyle) => {
    setFontStyle(newFontStyle);
  };

  return (
    <div className="p-[2px]">
      {/* Back Button */}
      <div className="flex mb-4">
        <button
          className="text-lg font-bold text-blue-500 mr-2"
          onClick={goBack}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          {/* Back Arrow Only */}
          <span className="text-lg">
            <IoIosArrowBack />
          </span>
        </button>
        <div className="text-lg">Edit Text</div>
      </div>

      {/* Heading Section */}
      <h2 className="text-xl font-semibold mb-2">Paragraph</h2>
      <textarea
        className="w-full h-24 p-2 border rounded-md mb-4"
        placeholder="Paragraph"
        rows="2"
        value={headingText} // Bind textarea value to state
        onChange={(e) => setHeadingText(e.target.value)} // Update state on text change
        style={{
          fontFamily: fontStyle === "System" ? "inherit" : fontStyle,
          color: fontColor,
          fontSize: fontSize, // Apply font size
          fontWeight: textStyle === "bold" ? "bold" : "normal", // Apply bold text style dynamically
          fontStyle: textStyle === "italic" ? "italic" : "normal", // Apply italic text style dynamically
          textTransform: textStyle === "uppercase" ? "uppercase" : textStyle === "lowercase" ? "lowercase" : "none", // Apply capital case or small case dynamically
          letterSpacing: textStyle === "spaced" ? "0.1em" : "normal", // Apply text spacing dynamically
        }}
      ></textarea>

      {/* Style Section */}
      <h2 className="text-xl font-semibold mb-4">Style</h2>

      {/* Row 1 */}
      <div className="flex justify-between mb-2">
        {/* Font Style */}
        <FontStyle fontStyle={fontStyle} setFontStyle={handleFontStyleChange} />

        {/* Font Size */}
        <FontSize currentSize={fontSize} setFontSize={setFontSize} />

        {/* Font Color */}
        <FontColor currentColor={fontColor} setFontColor={setFontColor} />
      </div>

      {/* Row 2 - 6 buttons in a single row */}
      <div className="flex justify-between mb-2">
        {/* First two buttons together */}
        <div className="flex border-[1px] border-gray-200 rounded-md">
          <BoldText setTextStyle={setTextStyle} textStyle={textStyle} />
          <ItalicText setTextStyle={setTextStyle} textStyle={textStyle} />
        </div>

        {/* Gap between the second and third group of buttons */}
        <div className="flex border-[1px] border-gray-200 rounded-md">
          <CapitalCaseText setTextStyle={setTextStyle} textStyle={textStyle} />
          <SmallCaseText setTextStyle={setTextStyle} textStyle={textStyle} />
          <TitleCaseText setTextStyle={setTextStyle} textStyle={textStyle} />
        </div>

        {/* Last button separately */}
        <div className="border-[1px] border-gray-200 rounded-md">
          <TextSpacing setTextStyle={setTextStyle} textStyle={textStyle} />
        </div>
      </div>

      {/* Row 3 - Text Outline */}
      <div className="mb-2 p-2 border-[1px] border-gray-300 rounded-md">
        <TextOutline />
      </div>

      {/* Row 4 - Text Shadow */}
      <div className="mb-2 p-2 border-[1px] border-gray-300 rounded-md">
        <TextShadow />
      </div>

      {/* Row 5 - Text Delete */}
      <div className="mb-2">
        <TextDelete /> {/* Adding TextDelete component here */}
      </div>
    </div>
  );
}

export default AddParagraph;
