

function SplitMenu() {
  

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Split Screen</h2> 
      <button className="bg-gray-300 w-full rounded-md hover:bg-gray-400 transition-all duration-300">
        <h1 className="text-3xl text-center py-6 text-black font-semibold">Placeholder For<br />Podcast Clip</h1>
        </button>
      <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-3xl w-full hover:bg-blue-600 transition-all duration-300"
        >
          Replace Media
        </button>
    </div>
  );
}

export default SplitMenu;

