import { useState } from 'react';
import AddHeading from './AddHeading';
import AddParagraph from './AddParagraph';
import AddQuote from './AddQuote';

function TextMenu() {
  const [currentComponent, setCurrentComponent] = useState('menu');

  const goBack = () => setCurrentComponent('menu');

  return (
    <div>
      {currentComponent === 'menu' ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Add Text</h2>
          <div className="flex flex-col space-y-2 font-semibold text-[16px]">
            {['Add Heading', 'Add Paragraph', 'Add Quote'].map((text, index) => (
              <button
                key={index}
                className="bg-gray-400 hover:bg-gray-500 transition-all duration-300 p-3 rounded-md flex"
                onClick={() => {
                  if (text === 'Add Heading') setCurrentComponent('addHeading');
                  if (text === 'Add Paragraph') setCurrentComponent('addParagraph');
                  if (text === 'Add Quote') setCurrentComponent('addQuote');
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </>
      ) : currentComponent === 'addHeading' ? (
        <AddHeading goBack={goBack} />
      ) : currentComponent === 'addParagraph' ? (
        <AddParagraph goBack={goBack} />
      ) : currentComponent === 'addQuote' ? (
        <AddQuote goBack={goBack} />
      ) : null}
    </div>
  );
}

export default TextMenu;
