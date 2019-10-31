import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { navigate } from 'gatsby';
import Cross from '../icons/cross.svg';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.2;
  }
`

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const Dialog = ({ children }) => {
  return (
  <DialogRoot>
    <Back onClick={() => navigate('/')} />
    <Body>
      <CloseButton onClick={() => navigate('/')}><Cross /></CloseButton>
      <Content>
        {children}
      </Content>
    </Body>
  </DialogRoot>
  );
};

export default Dialog;

const DialogRoot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Back = styled.div`
  position: absolute;
  z-index: 1;
  content: "";
  width: 100%;
  height: 100%;
  background: #E68;
  opacity: 0.4;
  animation: ${fadeIn} 0.2s ease-out;
`

const Body = styled.div`
  position: relative;
  z-index: 2;
  background: #FFF;
  border-radius: 10px;
  animation: ${slideIn} 0.2s ease-out;
`;

const Content = styled.div`
  width: 400px;
  min-height: 300px;
  max-height: 70vh;
  padding: 30px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  color: #F00;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
`;