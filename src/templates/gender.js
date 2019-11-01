import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';


function GenderTemplate(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={siteTitle} />
    </Layout>
  );
}

export default GenderTemplate;

export const pageQuery = graphql`
  query GenderQuery($gender: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStory(filter:{
      gender: { eq: $gender }
    }) {
      edges {
        node {
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
  }
`;
