import React from 'react';
import styled from 'styled-components';

const Modal = ({ modal, setModal, styles, addText }) => {
  return (
    <ModalWrap visible={modal}>
      <Overlay onClick={() => setModal(false)} />
      <ModalMain>
        <h2>Choose Font Style</h2>
        <div className="font-list">
          <p id="simple" onClick={() => addText(styles.simple)}>
            Simple Text
          </p>
          <p id="ubuntu" onClick={() => addText(styles.ubuntu)}>
            Ubuntu
          </p>
          <p id="cedarville" onClick={() => addText(styles.cedarville)}>
            Cedarville
          </p>
          <p id="pacifico" onClick={() => addText(styles.pacifico)}>
            Pacifico
          </p>
          <p id="fredoka" onClick={() => addText(styles.fredoka)}>
            Shadow
          </p>
          <p id="cookie" onClick={() => addText(styles.cookie)}>
            Linear Gradient
          </p>
        </div>
      </ModalMain>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalMain = styled.div`
  display: flex;
  position: relative;
  padding: 50px;
  top: 100px;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  width: 700px;
  border-radius: 21px;

  h2 {
    margin-bottom: 30px;
    text-align: center;
  }

  .font-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  p {
    font-size: 25px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    :hover {
      background-color: #e5e5e5;
      border-radius: 8px;
    }
  }

  #ubuntu {
    font-family: ubuntu;
  }

  #cedarville {
    font-family: 'Cedarville cursive';
  }

  #pacifico {
    font-family: 'Pacifico';
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: red;
  }

  #fredoka {
    font-family: 'Fredoka One';
    text-shadow: 5px 5px 5px #000000;
  }

  #cookie {
    font-family: 'cookie';
    text-shadow: 2px solid #000;
    background: linear-gradient(45deg, red, blue);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

export default Modal;
