import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Trans } from '@lingui/macro';

const Header = ({ lang, onLangChange }) => {
  return <HeaderRoot>
    <Title><Trans>First dates of Moscow</Trans></Title>
    <Right>
      <AboutLink to="/about"><Trans>About</Trans></AboutLink>
      <LangSwitch onClick={() => onLangChange(lang === 'ru' ? 'en' : 'ru')}>{lang === 'ru' ? 'EN' : 'RU'}</LangSwitch>
    </Right>
  </HeaderRoot>;
};

export default Header;

const HeaderRoot = styled.header`
  height: 40px;
  flex: 0 0 auto;
  padding: 8px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #EB212E;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1em;
  text-transform: uppercase;
`;

const AboutLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`;

const LangSwitch = styled.button`
  border: 0;
  background: #EB212E;
  color: #FFFFFF;
  padding: 6px 8px;
  cursor: pointer;
  margin-left: 16px;
  line-height: 1;
`;

const Right = styled.div`
  display: flex;
`;