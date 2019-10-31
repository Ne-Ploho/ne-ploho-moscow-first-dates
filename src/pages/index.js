import { graphql } from 'gatsby';
import YearRangeTemplate from '../templates/yearRange';

export default YearRangeTemplate;

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStory {
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
          image {
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;


console.log('PAGE QUERY', pageQuery, YearRangeTemplate)