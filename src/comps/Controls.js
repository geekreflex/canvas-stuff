import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  moveToBottom,
  moveToTop,
  setTextValue,
  setTextColor,
  toggleFontsModal,
  removeItem,
  togglePreviewModal,
  setFontSize,
} from '../features/editorSlice';
import {
  IoCloseCircleOutline,
  IoEnterOutline,
  IoExitOutline,
  IoEyeOutline,
  IoTextOutline,
} from 'react-icons/io5';
import FontList from './FontList';

const Controls = () => {
  const dispatch = useDispatch();
  const { selectedId, textValue, fontFamily, textColor, fontSize } =
    useSelector((state) => state.editor);

  const handleShowFontsModal = () => {
    dispatch(toggleFontsModal(true));
  };

  const handleTextValueChange = (text) => {
    dispatch(setTextValue(text));
  };

  const handleTextColorChange = (color) => {
    dispatch(setTextColor(color));
  };

  const handleFontSizeChange = (size) => {
    dispatch(setFontSize(size));
  };

  return (
    <ControlWrap>
      <ControlMain>
        <Text>
          <h2>Customize</h2>
          <p>Easily customize your filter using any of he buttons below.</p>
        </Text>
      </ControlMain>

      <ActionBtn>
        <button onClick={handleShowFontsModal}>
          <i>
            <IoTextOutline />
          </i>
          <span>Add Text</span>
        </button>

        <button onClick={() => dispatch(togglePreviewModal(true))}>
          <i>
            <IoEyeOutline />
          </i>
          <span>Preview</span>
        </button>
      </ActionBtn>

      {selectedId && (
        <CustomEdit>
          <Text>
            <h2>Edit</h2>
          </Text>
          <FontList />
          <InputWrap fontFamily={fontFamily}>
            <label>Change text</label>
            <textarea
              value={textValue}
              onChange={(e) => handleTextValueChange(e.target.value)}
            />
          </InputWrap>
          <InputWrap>
            <label>Font size</label>
            <input
              value={fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value)}
              type="number"
            />
          </InputWrap>
          <EditBtns>
            <button htmlFor="fontColor">
              <input
                type="color"
                id="fontColor"
                value={textColor}
                onChange={(e) => handleTextColorChange(e.target.value)}
              />
              <span>Font Color</span>
            </button>
            <button onClick={() => dispatch(moveToTop())}>
              <i>
                <IoEnterOutline />
              </i>
              <span>Bring Front</span>
            </button>
            <button onClick={() => dispatch(moveToBottom())}>
              <i>
                <IoExitOutline />
              </i>
              <span>Send Back</span>
            </button>
            <button onClick={() => dispatch(removeItem())}>
              <i>
                <IoCloseCircleOutline />
              </i>
              <span>Remove Item</span>
            </button>
          </EditBtns>
        </CustomEdit>
      )}
    </ControlWrap>
  );
};

const ControlWrap = styled.div`
  margin-left: 30px;
  color: #333;

  button {
    display: flex;
    border: none;
    outline: none;
    margin-right: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 60px;
    cursor: pointer;
    background-color: #e5e5e5;
    border: 1px solid #999;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 300ms;

    :hover {
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
    }

    i,
    input {
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
    }

    span {
      font-size: 10px;
      font-weight: 600;
    }
  }
`;
const ControlMain = styled.div``;
const Text = styled.div`
  width: 70%;
  margin-bottom: 30px;
  h2 {
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }

  @media (max-width: 520px) {
    margin-bottom: 20px;
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const ActionBtn = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const CustomEdit = styled.div``;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  input {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    padding: 0 10px;
    border: 1px solid #999;
    outline: none;
    font-size: 12px;
    font-weight: 600;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #e5e5e5;
  }

  textarea {
    border: 1px solid #999;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    resize: vertical;
    max-height: 100px;
    font-family: ${(props) => props.fontFamily};
    font-size: 16px;
  }
`;

const EditBtns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Controls;
