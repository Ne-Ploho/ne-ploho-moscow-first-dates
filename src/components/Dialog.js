import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { navigate } from 'gatsby';
import Cross from '../icons/cross.svg';
import { DialogContext } from '../layouts';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.4;
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
  const dialogState = React.useContext(DialogContext);

  return (
  <DialogRoot>
    <Back data-state={dialogState} onClick={() => navigate('/')} />
    <Body data-state={dialogState}>
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

  @media (max-width: 414px) {
    width: 100%;
    box-sizing: border-box;
    padding: 0 16px;
  }
`;

const Back = styled.div`
  position: absolute;
  z-index: 1;
  content: "";
  width: 100%;
  height: 100%;
  background: #E68;
  opacity: 0.4;
  ${p => p['data-state'] === 'appear' ? css`animation: ${fadeIn} 0.2s ease-out;` : ''}
`

const Body = styled.div`
  position: relative;
  z-index: 2;
  background: #FFF;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px rgba(100, 0, 0, .4);
  ${p => p['data-state'] === 'appear' ? css`animation: ${slideIn} 0.2s ease-out;` : ''}

  @media (max-width: 414px) {
    width: 100%;
  }
`;

const Content = styled.div`
  min-width: 414px;
  max-width: 95vw;
  max-height: 70vh;
  margin: 32px 0;
  padding: 0 32px;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;

  @media (max-width: 414px) {
    width: 100%;
    margin: 24px 0;
    padding: 0 24px;
    min-width: auto;
    max-width: 100vw;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: 0;
  color: #F00;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 16px;
  height: 16px;
  padding: 0;

  & svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 414px) {
    top: 8px;
    right: 8px;
    width: 12px;
    height: 12px;
  }
`;