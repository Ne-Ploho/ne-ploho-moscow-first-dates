import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Hero from '../components/hero';
import Layout from '../components/layout';


class RootIndex extends React.Component {
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

export default RootIndex;

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
