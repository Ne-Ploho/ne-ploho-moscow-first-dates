import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Badge from './Badge';
import Logo from '../icons/neploho_logo.svg';

const YearRange = ({ fromYear, toYear, active }) => {
  return <YearRangeRoot>
    <StyledBadge year={fromYear} active={active} /> <Link to={active ? '/' : `/years/${fromYear}-${toYear}`}>{fromYear} - {toYear}</Link>
  </YearRangeRoot>
}

const YearRangeRoot = styled.div`
  display: flex;

  & a {
    color: #DD5DB3;
    text-decoration: none;
    font-size: 0.8em;
    line-height: 1;
    margin-left: 8px;
  }

  &:hover a {
    text-decoration: underline;
  }
`;

const Footer = ({ fromYear, toYear }) => {
  const inRange = (f, t) => fromYear <= f && toYear >= t;

  return <FooterRoot>
    <YearRange fromYear={1950} toYear={1965} active={inRange(1950, 1965)} />
    <YearRange fromYear={1966} toYear={1980} active={inRange(1966, 1980)} />
    <YearRange fromYear={1981} toYear={1995} active={inRange(1981, 1995)} />
    <YearRange fromYear={1996} toYear={2010} active={inRange(1996, 2010)} />
    <YearRange fromYear={2011} toYear={2019} active={inRange(2011, 2019)} />

    <StyledLogo /> 
  </FooterRoot>;
};

export default Footer;

const FooterRoot = styled.footer`
  height: 80px;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 24px;
  box-sizing: border-box;
`;

const StyledLogo = styled(Logo)`
  color: #EB212E;
  height: 16px;
  width: auto;
`;

const StyledBadge = styled(Badge)`
  height: 12px;
  width: 26px;
`;