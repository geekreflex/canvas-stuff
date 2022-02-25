import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Loading = () => {
  const { loadingFrame } = useSelector((state) => state.editor);
  return (
    <LoadingWrap visible={loadingFrame}>
      <h2>Loading...</h2>
    </LoadingWrap>
  );
};

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.visible ? '1' : '0')};

  h2 {
    position: relative;
    color: #fff;
  }
`;

export default Loading;
