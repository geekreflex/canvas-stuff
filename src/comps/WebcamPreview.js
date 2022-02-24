import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const WebcamPreview = () => {
  const videoEl = useRef();

  useEffect(() => {
    let video = videoEl.current;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log('Somehing went wrong!');
        });
    }
  }, []);

  return (
    <Wrap>
      <video ref={videoEl} autoPlay></video>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 250px;
  overflow: hidden;
  position: absolute;
  top: 50px;

  video {
    height: 460px;
    transform: scale(1);
    border-radius: 10px;
  }
`;

export default WebcamPreview;
