import React, { useEffect, useState } from 'react';
import Editor from './Editor';
import Frames from './Frames';
import styled from 'styled-components';
import FontsModal from './FontsModal';
import PreviewModal from './PreviewModal';
import UnfinishedModal from './UnfinishedModal';

const View = () => {
  const [unfinishedModal, setUnfinishedModal] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('editor-state');
    if (saved) {
      console.log('Load unfinised data');
      setUnfinishedModal(true);
    }
  }, []);

  return (
    <>
      <Heading>
        <h1>Filtar Demo App</h1>
      </Heading>
      <ViewWrap>
        <Container>
          <ViewMain>
            <LeftView>
              <Frames />
            </LeftView>
            <RightView>
              <Editor />
            </RightView>
          </ViewMain>
        </Container>
      </ViewWrap>
      <FontsModal />
      <PreviewModal />
      <UnfinishedModal modal={unfinishedModal} setModal={setUnfinishedModal} />
    </>
  );
};

const ViewWrap = styled.div`
  margin-top: 50px;
`;
const ViewMain = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;
const LeftView = styled.div`
  width: 32%;
  display: flex;

  @media (max-width: 1025px) {
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
  }
`;
const RightView = styled.div`
  width: 65%;
  display: flex;

  @media (max-width: 1024px) {
    justify-content: center;
    width: 100%;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 20px;
`;

export default View;
