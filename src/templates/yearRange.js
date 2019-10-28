import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Hero from '../components/hero';
import Layout from '../components/layout';


class YearRangeTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          
        </div>
      </Layout>
    );
  }
}

export default YearRangeTemplate;

export const pageQuery = graphql`
  query YearRangeQuery($fromYear: Int! = 0, $toYear: Int! = 9999) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStory(filter:{
      year: {
        gte: $fromYear,
        lte: $toYear
      }
    }) {
      edges {
        node {
          node_locale
          gender
          name
          year
          age
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
