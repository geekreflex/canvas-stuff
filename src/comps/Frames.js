import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  saveChangesToStorage,
  setBGFrame,
  setLoadingFrame,
} from '../features/editorSlice';

const Frames = () => {
  const dispatch = useDispatch();
  const { frameUrl } = useSelector((state) => state.editor);
  const frames = [
    { name: 'Start From Scratch', url: '' },
    { name: 'Flower Frame', url: require('../assets/elements/frame4.png') },
    // { name: 'Frame Three' },
    // { name: 'Frame Four' },
  ];

  const handleFrameClick = (url) => {
    if (frameUrl === null || url !== frameUrl) {
      dispatch(setBGFrame(url));
      dispatch(setLoadingFrame(true));
    }
  };

  return (
    <FrameListWrap>
      <FrameList>
        {frames.map((frame, i) => (
          <Frame
            className={frameUrl === frame.url ? 'active' : ''}
            onClick={() => handleFrameClick(frame.url)}
            key={i}
          >
            {frame.name}
          </Frame>
        ))}
      </FrameList>
    </FrameListWrap>
  );
};

const FrameListWrap = styled.div``;
const FrameList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  .active {
    border: 1px solid #777;
    background-color: #ccc;
  }
`;
const Frame = styled.div`
  background-color: #e5e5e5;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  cursor: pointer;
  transition: all 300ms;
  border-radius: 5px;
  border: 1px solid transparent;
  text-align: center;
  font-size: 14px;

  :hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
    border-color: #999;
  }
`;

export default Frames;
