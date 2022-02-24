import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { togglePreviewModal } from '../features/editorSlice';

const PreviewModal = () => {
  const dispatch = useDispatch();
  const { previewModal, previewImage } = useSelector((state) => state.editor);

  return (
    <ModalWrap visible={previewModal}>
      <Overlay onClick={() => dispatch(togglePreviewModal(false))} />
      <ModalMain>
        <PreviewImgWrap>
          <PreviewImg>
            <img src={previewImage} alt="Preview Image" />
          </PreviewImg>
        </PreviewImgWrap>
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
  width: 600px;
  max-height: 700px;
  max-width: 100%;
  margin-top: 50px;
  padding: 30px;
  border-radius: 21px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PreviewImgWrap = styled.div`
  background-color: #e5e5e5;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
`;
const PreviewImg = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 10px;
  position: relative;
  overflow: hidden;

  img {
    width: 250px;
    z-index: 2;
  }
`;

export default PreviewModal;
