import React from 'react';
import styled from 'styled-components';
import Hold1 from '../assets/elements/hold1.jpg';

const Preview = ({ preview, setPreview, image }) => {
  return (
    <PreviewWrap visible={preview}>
      <Overlay onClick={() => setPreview(false)} />
      <PreviewModal>
        <PreviewImg>
          <div className="bg-hold">
            <img src={Hold1} />
          </div>
          <img className="img-prev" src={image} alt="Preview Image" />
        </PreviewImg>
      </PreviewModal>
    </PreviewWrap>
  );
};

const PreviewWrap = styled.div`
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
const PreviewModal = styled.div`
  display: flex;
  position: relative;
  padding: 50px;
  top: 100px;
  background-color: #fafafa;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  width: 700px;
  border-radius: 21px;
`;

const PreviewImg = styled.div`
  width: 300px;
  height: 500px;
  background-color: transparent;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  .img-prev {
    width: 100%;
    height: 100%;
  }

  .bg-hold {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: transparent;

    img {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
`;

export default Preview;
