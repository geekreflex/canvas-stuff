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
    { name: 'Start From Scratch', url: 'scratch' },
    { name: 'Flower Frame', url: require('../assets/elements/frame4.png') },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
    { name: 'Empty Frame' },
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
            withUrl={frame.url}
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

const FrameListWrap = styled.div`
  height: 600px;
  overflow-y: auto;
  padding: 20px 5px;
`;
const FrameList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  .active {
    border: 1px solid #777;
    background-color: #ccc;
  }

  @media (max-width: 470px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Frame = styled.div`
  background-color: #e5e5e5;
  height: 170px;
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
  padding: 0 20px;
  opacity: ${(props) => (props.withUrl ? '1' : '0.5')};
  pointer-events: ${(props) => (props.withUrl ? '' : 'none')};

  :hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transform: scale(1.05);
    border-color: #999;
  }
`;

export default Frames;
