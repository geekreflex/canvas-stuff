import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layer, Stage } from 'react-konva';
import TextElement from './TextElement';
import { useDispatch, useSelector } from 'react-redux';
import {
  setItemChange,
  setSelectedItem,
  deSelectItem,
  updateItemData,
  setPreviewImage,
  saveChangesToStorage,
  setLoadingFrame,
} from '../features/editorSlice';
import Controls from './Controls';
import BGFrameImage from './BGFrameImage';
import Loading from './Loading';
import ImageElement from './ImageElement';

const Editor = () => {
  const dispatch = useDispatch();
  const {
    elements,
    selectedId,
    textValue,
    textColor,
    fontFamily,
    previewModal,
    fontSize,
    frameUrl,
  } = useSelector((state) => state.editor);
  const stageEl = createRef();

  const handleSelectedItem = (item) => {
    dispatch(setSelectedItem(item));
  };

  const handleItemChange = (payload) => {
    dispatch(setItemChange(payload));
  };

  const handleStageClick = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(deSelectItem());
    }
  };

  useEffect(() => {
    saveChanges();
    let id = selectedId;
    let items = elements.slice();
    let item = items.find((item) => item.id === id);
    let index = items.indexOf(item);
    let newItem = {
      ...item,
      text: textValue,
      fontFamily,
      fill: textColor,
      fontSize,
    };
    items.splice(index, 1);
    if (newItem.text) {
      items.push(newItem);
      dispatch(updateItemData(items));
      saveChanges();
    }
  }, [textValue, fontFamily, textColor, fontSize, dispatch]);

  useEffect(() => {
    if (previewModal) {
      dispatch(deSelectItem());
      setTimeout(() => {
        let canvas = stageEl.current.toDataURL();
        dispatch(setPreviewImage(canvas));
      }, 0);
    }
  }, [previewModal]);

  const saveChanges = () => {
    dispatch(saveChangesToStorage());
  };

  useEffect(() => {
    dispatch(setLoadingFrame(false));
    saveChanges();
  }, [frameUrl]);

  return (
    <EditorWrap>
      <EditorOuter>
        <EditorInner>
          <EditorMain>
            <Stage
              ref={stageEl}
              width={300}
              height={550}
              onTouchStart={(e) => {
                handleStageClick(e);
              }}
              onMouseDown={(e) => {
                handleStageClick(e);
              }}
            >
              <Layer>
                <BGFrameImage
                  imageUrl={frameUrl}
                  onMouseDown={() => {
                    dispatch(deSelectItem());
                  }}
                />
                {elements.map((element, i) => {
                  if (element.type === 'text') {
                    return (
                      <TextElement
                        key={i}
                        shapeProps={element}
                        isSelected={element.id === selectedId}
                        onSelect={() => {
                          handleSelectedItem(element);
                        }}
                        onChange={(newAttrs) => {
                          const payload = { newAttrs, i };
                          handleItemChange(payload);
                          saveChanges();
                        }}
                      />
                    );
                  }

                  if (element.type === 'image') {
                    return (
                      <ImageElement
                        key={i}
                        imageUrl={element.content}
                        isSelected={element.id === selectedId}
                        shapeProps={element}
                        onSelect={() => {
                          handleSelectedItem(element);
                        }}
                        onChange={(newAttrs) => {
                          const payload = { newAttrs, i };
                          handleItemChange(payload);
                          saveChanges();
                        }}
                      />
                    );
                  }
                })}
              </Layer>
            </Stage>
            <Loading />
          </EditorMain>
        </EditorInner>
      </EditorOuter>
      <Controls />
    </EditorWrap>
  );
};

const EditorWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;
const EditorOuter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const EditorInner = styled.div`
  max-width: 100%;
  background-color: #e5e5e5;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);

  @media (max-width: 520px) {
    padding: 15px;
  }
`;
const EditorMain = styled.div`
  background-color: white;
  border-radius: 10px;
  position: relative;
  text-align: center;

  @media (max-width: 418px) {
    display: flex;
    justify-content: flex-start;
    width: 250px;
    height: 450px !important;
    canvas {
      width: 250px !important;
      height: 450px !important;
      max-width: 100% !important;
    }
  }
`;

export default Editor;
