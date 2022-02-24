import React from 'react';
import styled from 'styled-components';

const Frames = ({ frames, setSelectedFrame }) => {
  return (
    <FrameWrap>
      {frames &&
        frames?.map((frame) => (
          <Frame onClick={() => setSelectedFrame(frame.bg)}>
            <img src={frame.bg} />
            <p>{frame.name}</p>
          </Frame>
        ))}
    </FrameWrap>
  );
};

const FrameWrap = styled.div`
  width: 30%;
  border: 1px solid red;
  overflow-y: auto;
`;

const Frame = styled.div`
  width: 100px;
  cursor: pointer;
  img {
    width: 100%;
  }
`;
export default Frames;
