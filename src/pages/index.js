import React from 'react';
import { graphql } from 'gatsby';
import YearRangeTemplate from '../templates/yearRange';
import Helmet from 'react-helmet';
import Layout from '../components/layout';

function HomePage(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={siteTitle} />
    </Layout>
  );
}

export default HomePage;

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStory {
      nodes {
        node_locale
        gender
        year
        slug
        location {
          lat
          lon
        }
      }
    }
  }
`;
