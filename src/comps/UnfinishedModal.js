import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  clearSavedFromStorage,
  getSavedFromStorage,
} from '../features/editorSlice';

const UnfinishedModal = ({ modal, setModal }) => {
  const dispatch = useDispatch();

  const handleFromStorage = () => {
    dispatch(getSavedFromStorage());
    setModal(false);
  };

  const handleDicardStorage = () => {
    dispatch(clearSavedFromStorage());
    setModal(false);
  };

  return (
    <ModalWrap visible={modal}>
      <Overlay />
      <ModalMain>
        <h2>Found unfinished filtar</h2>
        <ActionBtn>
          <button onClick={handleFromStorage}>Load</button>
          <button onClick={handleDicardStorage}>Discard</button>
        </ActionBtn>
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
  align-items: center;
  padding: 0 20px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};
`;
const ModalMain = styled.div`
  position: relative;
  background-color: white;
  width: 400px;
  max-height: 400px;
  max-width: 100%;
  padding: 30px;
  border-radius: 21px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
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

const ActionBtn = styled.div`
  display: flex;

  button {
    padding: 10px 20px;
    margin: 0 20px;
    border: none;
    outline: none;
    background-color: #e5e5e5;
    color: #333;
    border-radius: 5px;
    cursor: pointer;
    transition: all 300ms;

    :hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
`;

export default UnfinishedModal;
