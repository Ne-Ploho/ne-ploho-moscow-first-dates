import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';


function YearRangeTemplate(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={siteTitle} />
    </Layout>
  );
}

export default YearRangeTemplate;

export const pageQuery = graphql`
  query YearRangeQuery {
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
