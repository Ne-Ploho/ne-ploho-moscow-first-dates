import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Dialog from '../components/Dialog';

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const story = data.contentfulStory;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={`${story.name} | ${siteTitle}`} />
        </div>
        <Dialog>

        </Dialog>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query StoryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulStory(slug: { eq: $slug }) {
      name
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
`
