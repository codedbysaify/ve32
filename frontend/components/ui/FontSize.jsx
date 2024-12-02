import { useState, useRef, useEffect } from "react";

function FontSize({ currentSize, setFontSize }) {
  const [isFontSizeMenuOpen, setIsFontSizeMenuOpen] = useState(false);
  const fontSizeMenuRef = useRef(null);
  const scrollRef = useRef(null);
  let scrollInterval;

  // Create font sizes from 5px to 300px
  const fontSizes = Array.from({ length: 300 }, (_, index) => `${(index + 1) * 1}px`);

  // Function to start scrolling
  const startScrolling = (direction) => {
    if (scrollRef.current) {
      scrollInterval = setInterval(() => {
        scrollRef.current.scrollBy({
          top: direction === "up" ? -30 : 30,
          behavior: "smooth",
        });
      }, 50); // Change the interval to control the speed of scrolling
    }
  };

  // Function to stop scrolling
  const stopScrolling = () => {
    clearInterval(scrollInterval);
  };

  // Handle clicks outside the font size menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fontSizeMenuRef.current && !fontSizeMenuRef.current.contains(event.target)) {
        setIsFontSizeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="w-20 py-2 px-4 border rounded-md text-[12px] text-left hover:bg-gray-300 hover:text-black hover:font-semibold"
        onClick={() => setIsFontSizeMenuOpen((prev) => !prev)}
      >
        {currentSize}
      </button>
      {isFontSizeMenuOpen && (
        <div
          ref={fontSizeMenuRef}
          className="absolute bg-[#1B1B1C] border-[2px] border-white rounded-md mt-1 w-22 max-h-52"
        >
          <div className="relative h-full">
            {/* Up Arrow */}
            <div
              className="text-center h-[22px] bg-gray-300 hover:bg-gray-400 cursor-pointer"
              onMouseEnter={() => startScrolling("up")}
              onMouseLeave={stopScrolling}
            >
              ▲
            </div>
            {/* Font Size Options */}
            <ul
              ref={scrollRef}
              className="overflow-y-auto max-h-36 custom-scrollbar"
            >
              {fontSizes.map((size, index) => (
                <li
                  key={index}
                  className="p-1 hover:bg-gray-200 hover:text-black cursor-pointer"
                  onClick={() => {
                    setFontSize(size); // Update font size for other components
                    setIsFontSizeMenuOpen(false); // Close menu after selection
                  }}
                >
                  {size}
                </li>
              ))}
            </ul>
            {/* Down Arrow */}
            <div
              className="text-center h-[22px] bg-gray-300 hover:bg-gray-400 cursor-pointer"
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

export default FontSize;
