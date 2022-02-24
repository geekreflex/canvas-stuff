import React from 'react';
import styled from 'styled-components';

const Side = ({
  setModal,
  setPreview,
  moveToTop,
  moveToBottom,
  selectedId,
  textValue,
  setTextValue,
  textSize,
  setTextSize,
  textColor,
  setTextColor,
}) => {
  return (
    <SideWrap>
      <button id="add-text" onClick={() => setModal(true)}>
        Add Text
      </button>
      <button onClick={() => setPreview(true)}>Preview</button>

      {selectedId && (
        <div>
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <br />
          <input
            type="number"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <div>
            <button onClick={moveToTop}>Move to Top</button>
            <button onClick={moveToBottom}>Move to Bottom</button>
          </div>
        </div>
      )}
    </SideWrap>
  );
};

const SideWrap = styled.div`
  padding: 30px;
  #add-text {
    margin-bottom: 20px;
  }
`;

export default Side;
