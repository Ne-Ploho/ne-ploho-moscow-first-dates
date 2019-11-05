import React from 'react';
import { graphql } from 'gatsby';
import YearRangeTemplate from '../templates/yearRange';
import Layout from '../components/Layout';

function HomePage(props) {
  const { data } = props;

  return (
    <Layout />
  );
}

export default HomePage;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulStory {
      nodes {
        contentfulid
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
