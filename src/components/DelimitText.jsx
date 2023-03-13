import React, { useState } from 'react';

const DelimitText = ({ text, maxLength, textStatic = false }) => {
  const [delimitText, setDelimitText] = useState(text.length > maxLength);

  const showMore = text.length > maxLength;
  const delimitedText = text.substring(0, maxLength);

  const handleDelimitText = () => {
    setDelimitText(!delimitText);
  };

  return (
    <div className="justify d-flex flex-column">
      <p className="justify mb-0">
        {delimitText ? `${delimitedText}...` : text}
      </p>

      {showMore && (
        <button
          onClick={() => (textStatic ? null : handleDelimitText())}
          className="ms-auto button-show"
        >
          {delimitText ? 'Ver más' : 'Ver menos'}
        </button>
      )}
    </div>
  );
};

export default DelimitText;
