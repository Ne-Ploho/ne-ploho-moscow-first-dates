import * as React from 'react';
import styled from 'styled-components';
import Badge from './Badge';

const Footer = ({  }) => {
  return <FooterRoot>
    <Badge year={1950} gender='male' />
    <Badge year={1966} gender='female' />
    <Badge year={1981} gender='male' />
    <Badge year={1996} gender='female' disabled />
    <Badge year={2011} gender='male' disabled />
  </FooterRoot>;
};

export default Footer;

const FooterRoot = styled.footer`
  height: 50px;
  flex: 0 0 auto;
`;
