import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import thumbnail from '../images/thumbnail.png';
import icon48 from '../images/48x48.png';

function Layout(props) {
  const { children } = props;
  const { i18n } = useLingui();

  const appTitle = i18n._(t`app.title`);
  const appDescription = i18n._(t`app.description`);

  const title = props.title ? `${props.title} | ${appTitle}` : appTitle;

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );
  const siteUrl = data.site.siteMetadata.siteUrl;

  return (
    <LayoutRoot>
      <Helmet title={title}>
        <html lang={i18n.locale} />
        <meta name="test" content="test" />
        <meta name="description" content={appDescription} />

        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={appDescription} />
        <meta property="og:image" content={thumbnail} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={appDescription} />
        <meta name="twitter:image" content={siteUrl + thumbnail} />

        <link rel="apple-touch-icon" href={icon48} />
      </Helmet>
      {children}
    </LayoutRoot>
  );
}

export default Layout;

const LayoutRoot = styled.div`
  width: 100%;
  height: 100%;
`;
