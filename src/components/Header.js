import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Header = ({  }) => {
  return <HeaderRoot>
    <Title>КАРТА ПЕРВЫХ СВИДАНИЙ МОСКВЫ / FIRST DATES OF MOSCOW</Title>
    <AboutLink to="/about">О КАРТЕ / ABOUT</AboutLink>
  </HeaderRoot>;
};

export default Header;

const HeaderRoot = styled.header`
  height: 40px;
  flex: 0 0 auto;
  padding: 10px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #EB212E;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1em;
`;

const AboutLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;