import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image as ImageDef } from 'react-konva';
import { v1 as uuidv1 } from 'uuid';
import Rectangle from '../components/shapes/Rectangle';
import TextElem from '../components/shapes/TextElem';
import Image from '../components/shapes/Image';
import styled from 'styled-components';
import Banner from '../assets/elements/banner.png';
import Icecream from '../assets/elements/icecream.png';

const EditorView = () => {
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [, updateState] = React.useState();
  const [modal, setModal] = useState(false);
  const [elemType, setElemType] = useState('');
  const [textColor, setTextColor] = useState();
  const [textSize, setTextSize] = useState();
  const [textValue, setTextValue] = useState();

  const [defImage, setDefImage] = useState();

  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const defImgEl = React.createRef();
  const fileUploadEl = React.createRef();
  const previewEl = React.createRef();

  const forceUpdate = React.useCallback(() => updateState({}), []);

  const data = [
    {
      name: 'banner',
      label: 'Banner',
      image: Banner,
      width: 100,
    },
    {
      name: 'icrecream',
      label: 'Ice Cream',
      image: Icecream,
      width: 30,
    },
  ];

  useEffect(() => {
    createPreview();
  }, []);

  const createPreview = () => {
    selectShape(null);
    setTimeout(() => {
      // let canvas = stageEl.current.toDataURL();
      let canvas = stageEl.current.toDataURL();
      document.querySelector('.preview-img').src = canvas;
    }, 500);
  };

  const addRectangle = () => {
    const rect = {
      x: stageEl.current.getWidth() / 2 - 50,
      y: stageEl.current.getHeight() / 2 - 50,
      width: 100,
      height: 100,
      fill: Konva.Util.getRandomColor(),
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
    setElemType('shape');
  };

  const addText = () => {
    const txt = {
      text: 'Your text',
      x: 40,
      y: 70,
      width: 220,
      fontFamily: 'sans-serif',
      fontSize: 35,
      fill: '#333333',
      id: `text${texts.length + 1}`,
    };
    const txts = texts.concat([txt]);
    setTexts(txts);
    const shs = shapes.concat([`text${texts.length + 1}`]);
    setShapes(shs);
    setElemType('text');
  };

  const drawImage = () => {
    fileUploadEl.current.click();
  };

  const moveToTop = () => {
    if (elemType === 'shape') {
      let id = selectedId;
      let items = rectangles;
      let item = items.find((i) => i.id === id);
      let index = items.indexOf(item);
      items.splice(index, 1);
      items.push(item);
      forceUpdate();
    }

    if (elemType === 'image') {
      let id = selectedId;
      let items = images;
      let item = items.find((i) => i.id === id);
      let index = items.indexOf(item);
      items.splice(index, 1);
      items.push(item);
      forceUpdate();
    }
  };

  const moveToBottom = () => {
    if (elemType === 'shape') {
      let id = selectedId;
      let items = rectangles;
      let item = items.find((i) => i.id === id);
      let index = items.indexOf(item);
      items.splice(index, 1);
      items.unshift(item);
      forceUpdate();
    }

    if (elemType === 'image') {
      let id = selectedId;
      let items = images;
      let item = items.find((i) => i.id === id);
      let index = items.indexOf(item);
      items.splice(index, 1);
      items.unshift(item);
      forceUpdate();
    }
  };

  const handleTextChange = () => {
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
  };

  useEffect(() => {
    handleTextChange();
  }, [textColor, textSize, textValue]);

  const fileChange = (ev) => {
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const id = uuidv1();
        images.push({
          content: reader.result,
          id,
        });
        setImages(images);
        fileUploadEl.current.value = null;
        shapes.push(id);
        setShapes(shapes);
        forceUpdate();
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const drawElement = (url) => {
    const id = uuidv1();
    images.push({
      content: url,
      id,
    });

    setImages(images);
    shapes.push(id);
    setShapes(shapes);
    forceUpdate();
    setElemType('image');
  };

  return (
    <Wrap>
      <div className="btn-list">
        <button onClick={addRectangle}>Rectange</button>
        <button onClick={drawImage}>Upload</button>
        <button onClick={addText}>Add Text</button>
        <button
          onClick={() => {
            createPreview();
            setModal(true);
          }}
        >
          Preview
        </button>
        {selectedId && (
          <>
            <button onClick={moveToTop}>Send to top</button>
            <button onClick={moveToBottom}>Send to bottom</button>
            {elemType === 'text' && (
              <>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
                <input
                  type="number"
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                />
                <input
                  type="text"
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                />
              </>
            )}
          </>
        )}
        <div className="image-list">
          {data.map((d) => (
            <div
              className="img-wrap"
              key={d.image}
              onClick={() => drawElement(d.image)}
            >
              <img src={d.image} width={d.width} />
              <p>{d.label}</p>
            </div>
          ))}
        </div>
      </div>
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileUploadEl}
        onChange={fileChange}
      />

      <StageFrame>
        <StageWrap>
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
            <Layer ref={layerEl}>
              {rectangles.map((rect, i) => {
                return (
                  <Rectangle
                    key={i}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onSelect={() => {
                      selectShape(rect.id);
                      setElemType('shape');
                    }}
                    onChange={(newAttrs) => {
                      const rects = rectangles.slice();
                      rects[i] = newAttrs;
                      setRectangles(rects);
                    }}
                  />
                );
              })}
              {images.map((image, i) => {
                return (
                  <Image
                    key={i}
                    imageUrl={image.content}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                      selectShape(image.id);
                      setElemType('image');
                    }}
                    onChange={(newAttrs) => {
                      const imgs = images.slice();
                      imgs[i] = newAttrs;
                    }}
                  />
                );
              })}
              {texts.map((text, i) => {
                return (
                  <TextElem
                    key={i}
                    shapeProps={text}
                    isSelected={text.id === selectedId}
                    onSelect={() => {
                      selectShape(text.id);
                      setElemType('text');
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
              <Image ref={defImgEl} />
            </Layer>
          </Stage>
        </StageWrap>
      </StageFrame>

      <Modal visible={modal}>
        <div className="overlay" onClick={() => setModal(false)}></div>
        <div className="main">
          <div className="preview-frame">
            <div className="preview-wrap" ref={previewEl}>
              <img className="preview-img" />
            </div>
          </div>
        </div>
      </Modal>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;

  .btn-list {
    margin-top: 50px;
    margin-left: 50px;

    button {
      margin-right: 10px;
    }
  }

  .image-list {
    display: flex;
    margin-top: 20px;
  }

  .img-wrap {
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 20px;
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      border-color: #222;
    }
  }
`;

const StageFrame = styled.div`
  width: 440px;
  margin: 50px;
  padding: 20px;
  background-color: #eee;
  border-radius: 10px;
  display: flex;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
`;

const StageWrap = styled.div`
  background-color: #fff;
  width: 400px;
`;

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .main {
    background-color: #e5e5e5;
    position: relative;
    width: 800px;
    max-width: 100%;
    padding: 30px;
    border-radius: 30px;
  }

  .preview-frame {
    width: 400px;
    padding: 20px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }

  .preview-wrap {
    background-color: #fff;
    width: 400px;

    img {
      width: 100%;
    }
  }
`;

export default EditorView;
