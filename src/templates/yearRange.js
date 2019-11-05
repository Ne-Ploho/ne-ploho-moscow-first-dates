import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';


function YearRangeTemplate(props) {
  const { data, pageContext } = props;

  const title = pageContext.fromYear && pageContext.toYear
    ? `${pageContext.fromYear} - ${pageContext.toYear}`
    : undefined;

  return (
    <Layout title={title} />
  );
}

export default YearRangeTemplate;

export const pageQuery = graphql`
  query YearRangeQuery {
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
