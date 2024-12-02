// TextDelete.jsx

import React from 'react';

function TextDelete() {
  const handleDelete = () => {
    // Logic to delete the text or heading goes here
    alert('Text has been deleted!');
  };

  return (
    <div className="flex  items-center">
      <button
        className="px-4 py-2 w-full bg-gray-400 text-white rounded-md hover:bg-gray-600 hover:border-white hover:border-[1px] transition duration-300"
        onClick={handleDelete}
      >
        Delete Text
      </button>
    </div>
  );
}

export default TextDelete;
