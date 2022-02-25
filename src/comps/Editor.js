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

const Editor = () => {
  const dispatch = useDispatch();
  const {
    texts,
    selectedId,
    textValue,
    textColor,
    fontFamily,
    previewModal,
    fontSize,
    frameUrl,
  } = useSelector((state) => state.editor);
  const stageEl = createRef();

  const handleSelectedItem = (text) => {
    dispatch(setSelectedItem(text));
  };

  const handleTextChange = (payload) => {
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
    let items = texts.slice();
    let item = items.find((i) => i.id === id);
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
  }, [frameUrl]);

  return (
    <EditorWrap>
      <EditorInner>
        <EditorMain>
          <Stage
            ref={stageEl}
            width={300}
            height={550}
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
              {texts.map((text, i) => (
                <TextElement
                  key={i}
                  shapeProps={text}
                  isSelected={text.id === selectedId}
                  onSelect={() => {
                    handleSelectedItem(text);
                  }}
                  onChange={(newAttrs) => {
                    const payload = { newAttrs, i };
                    handleTextChange(payload);
                    saveChanges();
                  }}
                />
              ))}
            </Layer>
          </Stage>
          <Loading />
        </EditorMain>
      </EditorInner>
      <Controls />
    </EditorWrap>
  );
};

const EditorWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
const EditorInner = styled.div`
  background-color: #e5e5e5;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`;
const EditorMain = styled.div`
  background-color: white;
  border-radius: 10px;
  position: relative;
`;

export default Editor;
