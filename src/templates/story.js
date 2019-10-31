import React from 'react'
import styled from 'styled-components';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';
import { useLingui } from '@lingui/react';
import Layout from '../components/layout'
import Dialog from '../components/Dialog';

function StoryTemplate(props) {
  const { data, pageContext } = props;
  const siteTitle = data.site.siteMetadata.title;

  const { i18n } = useLingui();

  const story = i18n.locale === 'ru' ? data.storyRu : data.storyEn;

  return (
    <Layout location={props.location} >
      <div style={{ background: '#fff' }}>
        <Helmet title={`${story.name} | ${siteTitle}`} />
      </div>
      <Dialog>
        <Img src={story.image.file.url} alt={story.description.description} />
        {i18n.locale !== 'ru' && <Description>{story.description.description}</Description>}
      </Dialog>
    </Layout>
  )
}

export default StoryTemplate

const Img = styled.img`
  width: 100%;
`

const Description = styled.p`
  max-width: 400px;
`;

export const pageQuery = graphql`
  query StoryBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    storyEn: contentfulStory(slug: { eq: $slug }, node_locale: { eq: "en" }) {
      image {
        file {
          url
        }
      }
      description {
        description
      }
    }
    storyRu: contentfulStory(slug: { eq: $slug }, node_locale: { eq: "ru" }) {
      image {
        file {
          url
        }
      }
      description {
        description
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
          description {
            description
          }
        }
      }
    }
  }
`
