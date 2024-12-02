import { useState, useRef, useEffect } from "react";

function FontStyle({ currentFont, setFontStyle }) {
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState(currentFont || "System");
  const fontMenuRef = useRef(null);
  const scrollRef = useRef(null);
  let scrollInterval;

  const fonts = [
    "System", "Arial", "Verdana", "Times New Roman", "Georgia", "Tahoma",
    "Courier New", "Comic Sans MS", "Impact", "Trebuchet MS"
  ];

  const startScrolling = (direction) => {
    if (scrollRef.current) {
      scrollInterval = setInterval(() => {
        scrollRef.current.scrollBy({
          top: direction === "up" ? -10 : 10,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  const stopScrolling = () => clearInterval(scrollInterval);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fontMenuRef.current && !fontMenuRef.current.contains(event.target)) {
        setIsFontMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        className="w-40 py-2 px-4 border rounded-md text-left text-[12px] hover:bg-gray-300 hover:text-black hover:font-semibold"
        onClick={() => setIsFontMenuOpen((prev) => !prev)}
        aria-expanded={isFontMenuOpen}
        aria-haspopup="listbox"
      >
        {selectedFont}
      </button>
      {isFontMenuOpen && (
        <div
          ref={fontMenuRef}
          className="absolute bg-[#1B1B1C] border rounded-md mt-1 w-26 max-h-48 z-50 dropdown"
        >
          <div className="relative h-full">
            <div
              className="text-center bg-gray-300 hover:bg-gray-400 cursor-pointer"
              onMouseEnter={() => startScrolling("up")}
              onMouseLeave={stopScrolling}
            >
              ▲
            </div>
            <ul
              ref={scrollRef}
              className="overflow-y-auto max-h-36 custom-scrollbar"
              role="listbox"
            >
              {fonts.map((font, index) => (
                <li
                  key={index}
                  style={{ fontFamily: font }}
                  className="p-1 text-[12px] hover:bg-gray-200 cursor-pointer hover:text-black"
                  onClick={() => {
                    setFontStyle(font);
                    setSelectedFont(font);
                    setIsFontMenuOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedFont === font}
                >
                  {font}
                </li>
              ))}
            </ul>
            <div
              className="text-center bg-gray-300 hover:bg-gray-400 cursor-pointer"
              onMouseEnter={() => startScrolling("down")}
              onMouseLeave={stopScrolling}
            >
              ▼
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FontStyle;
