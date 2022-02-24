import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addText, toggleFontsModal } from '../features/editorSlice';
import { fontstyles } from '../scripts/fontStyles';

const FontsModal = () => {
  const dispatch = useDispatch();
  const { fontsModal } = useSelector((state) => state.editor);

  const handleAddText = (styles) => {
    dispatch(addText(styles));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(toggleFontsModal(false));
  };

  return (
    <ModalWrap visible={fontsModal}>
      <Overlay onClick={handleCloseModal} />
      <ModalMain>
        <h2>Choose Font Style</h2>
        <FontList>
          {fontstyles.map((font, i) => (
            <Font
              key={i}
              style={font.webStyles}
              onClick={() => handleAddText(font.canvasStyles)}
            >
              {font.name}
            </Font>
          ))}
        </FontList>
      </ModalMain>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
`;

const ModalMain = styled.div`
  position: relative;
  background-color: white;
  width: 700px;
  /* max-height: 400px; */
  padding: 30px 0;
  max-width: 100%;
  margin-top: 100px;
  border-radius: 21px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FontList = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 30px;
`;

const Font = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;
  cursor: pointer;
  height: 50px;
  font-size: 20px;

  :hover {
    transform: scale(1.1);
  }
`;

export default FontsModal;
