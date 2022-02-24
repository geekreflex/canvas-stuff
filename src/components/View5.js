import React from 'react';
import { Layer, Stage, Text } from 'react-konva';
import styled from 'styled-components';
import { addTextNode } from './textNode';
// import Icecream from '../assets/elements/icecream.png';

const View5 = () => {
  const stageRef = React.createRef();
  const layerRef = React.createRef();

  const [shapes, setShapes] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [textStyles, setTextStyles] = React.useState({
    cedarville: {
      fontFamily: 'Cedarville Cursive',
    },
    ubuntu: {
      fontFamily: 'Ubuntu',
    },
    simple: {
      fontFamily: 'Arial',
      fontStyle: 'bold',
    },
    pacifico: {
      fontFamily: 'Pacifico',
      stroke: 'red',
      strokeWidth: 1,
    },

    fredoka: {
      fontFamily: 'Fredoka One',
    },
  });

  const drawText = (style) => {
    setModal(false);
    const id = addTextNode(
      stageRef.current.getStage(),
      layerRef.current,
      style
    );
    const shs = shapes.concat([id]);
    setShapes(shs);
  };

  const showFontModal = () => {
    setModal(true);
  };

  return (
    <div>
      <div>
        <button onClick={showFontModal}>Add Text</button>
      </div>
      <div>
        <Stage ref={stageRef} width={700} height={700}>
          <Layer ref={layerRef}>
            {/* <Text
              fontSize={60}
              text="HELLO THERE"
              wrap="char"
              align="center"
              width={700}
              fill="red"
              strokeWidth={2}
              stroke="green"
              fontFamily="helvetica"
            /> */}
          </Layer>
        </Stage>
      </div>

      <Modal visible={modal}>
        <Overlay onClick={() => setModal(false)} />
        <ModalMain>
          <h2>Choose Font Style</h2>
          <div className="font-list">
            <p id="simple" onClick={() => drawText(textStyles.simple)}>
              Simple Text
            </p>
            <p id="ubuntu" onClick={() => drawText(textStyles.ubuntu)}>
              Ubuntu
            </p>
            <p id="cedarville" onClick={() => drawText(textStyles.cedarville)}>
              Cedarville
            </p>
            <p id="pacifico" onClick={() => drawText(textStyles.pacifico)}>
              Pacifico
            </p>
            <p id="fredoka" onClick={() => drawText(textStyles.fredoka)}>
              Awesomeness
            </p>
          </div>
        </ModalMain>
      </Modal>
    </div>
  );
};

const Modal = styled.div`
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
  }
`;

export default View5;
