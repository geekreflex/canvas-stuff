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
        <Text>
          <h2>We found an unfinished filtar from your previous visit</h2>
          <p>Would you like to continue from where you left off?</p>
        </Text>
        <ActionBtn>
          <button onClick={handleDicardStorage}>No, Start over</button>
          <button id="continue" onClick={handleFromStorage}>
            Yes, Continue
          </button>
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
  width: 500px;
  max-height: 400px;
  max-width: 100%;
  padding: 30px;
  border-radius: 21px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  h2 {
    text-align: center;
    font-weight: 400;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    text-align: center;
  }

  @media (max-width: 768px) {
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

  #continue {
    background-color: #333;
    color: #fff;

    :hover {
      background-color: #000;
    }
  }

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

  @media (max-width: 512px) {
    flex-direction: column;

    button {
      margin: 10px 0;
    }
  }
`;

export default UnfinishedModal;
