import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Hero from '../components/hero';
import Layout from '../components/layout';
import DatesMap from '../components/DatesMap';

class RootIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const stories = data.allContentfulStory.edges.map(e => e.node);

    console.log(stories);

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <DatesMap stories={stories.filter(s => s.node_locale === 'ru-RU')} />
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

// image {
//   fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
//    ...GatsbyContentfulFluid_tracedSVG
//   }
// }
