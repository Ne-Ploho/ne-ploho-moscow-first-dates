import React from 'react'
import styled from 'styled-components';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Dialog from '../components/Dialog';

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
          <Img src={story.image.file.url} />
        </Dialog>
      </Layout>
    )
  }
}

export default BlogPostTemplate

const Img = styled.img`
  width: 100%;
`

export const pageQuery = graphql`
  query StoryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulStory(slug: { eq: $slug }) {
      name
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
        }
      }
    }
  }
`
