import React, { createRef, useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import styled from 'styled-components';
import BGImage from './BGImage';
import Frames from './Frames';
import Modal from './Modal';
import Preview from './Preview';
import Side from './Side';
import TextElem from './TextElem';
// import Frame1 from '../assets/elements/frame1.png';

const Editor = () => {
  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [styles, setStyles] = useState();
  const [frames, setFrames] = useState();
  const [modal, setModal] = useState(false);
  const [textColor, setTextColor] = useState();
  const [textSize, setTextSize] = useState();
  const [textValue, setTextValue] = useState();
  const [preview, setPreview] = useState(false);
  const [elemType, setElemType] = useState(null);
  const [, updateState] = React.useState();
  const [previewImg, setPreviewImg] = useState();
  const [selectedFrame, setSelectedFrame] = useState(null);

  const [imageUrl, setImageUrl] = useState();

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const stageEl = createRef();

  useEffect(() => {
    console.log(selectedFrame);
    setImageUrl(selectedFrame);
    forceUpdate();
  }, [selectedFrame]);

  useEffect(() => {
    setFrames([
      {
        bg: require('../assets/elements/frame1.png'),
        type: 'birthday',
        name: 'Frame1',
      },
      {
        bg: require('../assets/elements/frame2.png'),
        type: 'birthday',
        name: 'Frame2',
      },
      {
        bg: require('../assets/elements/frame3.png'),
        type: 'birthday',
        name: 'Frame3',
      },
      {
        bg: require('../assets/elements/frame4.png'),
        type: 'wedding',
        name: 'Frame4',
      },
    ]);
  }, []);

  useEffect(() => {
    setStyles({
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
        shadowColor: 'black',
        shadowBlur: 5,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowOpacity: 0.5,
      },
      cookie: {
        fontFamily: 'Cookie',
        fill: 'red',
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 100, y: 100 },
        fillLinearGradientColorStops: [0, 'red', 1, 'blue'],
        fillEnabled: true,
        fillPriority: 'linear-gradient',
      },
    });
  }, [setStyles]);

  useEffect(() => {
    let id = selectedId;
    let items = texts;
    let item = items.find((i) => i.id === id);
    let index = items.indexOf(item);

    let newItem = {
      ...item,
      fill: textColor,
      fontSize: textSize,
      text: textValue,
    };
    items.splice(index, 1);
    items.push(newItem);
    forceUpdate();
  }, [textValue, textSize, textColor]);

  const addText = (style) => {
    setModal(false);
    const textNode = {
      text: 'Click to edit',
      x: 150,
      y: 300,
      width: 220,
      fontFamily: 'sans-serif',
      fontSize: 25,
      fill: '#333333',
      id: `text${texts.length + 1}`,
      ...style,
    };
    const items = texts.concat([textNode]);
    setTexts(items);
    const shs = shapes.concat([`text${texts.length + 1}`]);
    setShapes(shs);
  };

  const moveToTop = () => {
    const items = texts.slice();
    const item = items.find((s) => s.id === selectedId);
    const index = items.indexOf(item);
    items.splice(index, 1);
    items.splice(index + 1, 0, item);
    setTexts(items);
  };

  const moveToBottom = () => {
    const items = texts.slice();
    const item = items.find((s) => s.id === selectedId);
    const index = items.indexOf(item);
    items.splice(index, 1);
    items.splice(index - 1, 0, item);
    setTexts(items);
  };

  useEffect(() => {
    if (preview) {
      createPreview();
    }
  }, [preview]);

  const createPreview = () => {
    selectShape(null);
    setTimeout(() => {
      let canvas = stageEl.current.toDataURL();
      setPreviewImg(canvas);
    });
  };

  return (
    <>
      <Container>
        <Frames frames={frames} setSelectedFrame={setSelectedFrame} />
        <EditorWrap>
          <Stage
            width={400}
            height={600}
            ref={stageEl}
            onMouseDown={(e) => {
              // deselect when clicked on empty area
              const clickedOnEmpty = e.target === e.target.getStage();
              if (clickedOnEmpty) {
                selectShape(null);
                setElemType(null);
              }
            }}
          >
            <Layer>
              <BGImage
                imageUrl={imageUrl}
                onMouseDown={(e) => {
                  selectShape(null);
                  setElemType(null);
                }}
              />

              {texts.map((text, i) => {
                return (
                  <TextElem
                    key={i}
                    shapeProps={text}
                    isSelected={text.id === selectedId}
                    onSelect={() => {
                      selectShape(text.id);
                      setTextColor(text.fill);
                      setTextSize(text.fontSize);
                      setTextValue(text.text);
                    }}
                    onChange={(newAttrs) => {
                      const txts = texts.slice();
                      txts[i] = newAttrs;
                      setTexts(txts);
                      setElemType('text');
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        </EditorWrap>
        <Side
          setModal={setModal}
          moveToTop={moveToTop}
          moveToBottom={moveToBottom}
          selectedId={selectedId}
          textValue={textValue}
          setTextValue={setTextValue}
          textColor={textColor}
          setTextColor={setTextColor}
          textSize={textSize}
          setTextSize={setTextSize}
          textColor={textColor}
          setTextColor={setTextColor}
          preview={preview}
          setPreview={setPreview}
          createPreview={createPreview}
        />
      </Container>
      <Modal
        modal={modal}
        setModal={setModal}
        styles={styles}
        addText={addText}
      />
      <Preview preview={preview} setPreview={setPreview} image={previewImg} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  border: 1px solid #999;
  width: 90%;
  height: 600px;
  margin-top: 70px;
  position: relative;
`;

const EditorWrap = styled.div`
  display: inline-flex;
  background-color: white;
  position: relative;
`;

export default Editor;
