function FontColor({ currentColor, setFontColor }) {
    return (
      <div className="rounded-full">
        <input
          type="color"
          className="w-9 h-9 border rounded-md cursor-pointer"
          value={currentColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>
    );
  }
  
  export default FontColor;
  