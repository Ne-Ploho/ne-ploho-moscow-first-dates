import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Trans } from '@lingui/macro';

const AboutLink = ({ className }) => (
  <AboutLinkRoot className={className} to="/about">
    <Trans id="header.about">О карте</Trans>
  </AboutLinkRoot>
);

export default AboutLink;

const AboutLinkRoot = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
