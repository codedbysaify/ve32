import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io"; // Import the back arrow icon
import FontStyle from "./FontStyle";
import FontSize from "./FontSize";
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
import StylesTop from "./StylesTop";
import StylesCenter from "./StylesCenter";
import StylesBottom from "./StylesBottom";
import TextAnimation from "./TextAnimation";
import RandomRotation from "./RandomRotation";

const SubtitlesStyle = ({ onBack }) => {
  const [fontStyle, setFontStyle] = useState("normal");
  const [fontSize, setFontSize] = useState("16px");
  const [fontColor, setFontColor] = useState("#000000");
  const [textStyle, setTextStyle] = useState({});

  const handleFontStyleChange = (newFontStyle) => {
    setFontStyle(newFontStyle);
  };

  const goBack = () => {
    onBack(); // Call the onBack function passed from parent component
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
        <div className="text-lg">Styles</div>
      </div>

      {/* Heading Section */}
      <h2 className="text-xl font-semibold mb-4">Customization</h2>
    
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

        {/* additional row */}
        <div className="flex border-[1px] border-gray-300 rounded-md space-x-3 mb-4">
          <StylesTop/>
          <StylesCenter/>
          <StylesBottom/>
        </div>

        {/* additional heaing */}
      <h2 className="text-xl font-semibold mb-4">Effect</h2>

      {/* Row 3 - Text Outline */}
      <div className="mb-2 p-2 border-[1px] border-gray-300 rounded-md">
        <TextShadow />
      </div>   

      {/* Row 4 - Text Shadow */}
      <div className="mb-2 p-2 border-[1px] border-gray-300 rounded-md">
        <TextAnimation />
      </div>

      {/* Row 5 - Text Delete */}
      <div className="mb-2 p-2 border-[1px] border-gray-300 rounded-md">
        <RandomRotation /> {/* Adding RandomRotation component here */}
      </div>
    

    </div>
  );
};

export default SubtitlesStyle;
