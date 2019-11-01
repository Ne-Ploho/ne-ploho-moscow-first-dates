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

  const imageUrl = story.image.file.url;
  const image2xUrl = story.image2x.file.url;

  return (
    <Layout>
      <Helmet title={siteTitle} />
      <Dialog>
        <Img
          src={imageUrl}
          srcSet={`${imageUrl}, ${image2xUrl} 2x`}
          alt={story.description.description}
        />
        {i18n.locale !== 'ru' && <Description>{story.description.description}</Description>}
      </Dialog>
    </Layout>
  )
}

export default StoryTemplate;

const Img = styled.img`
  width: 100%;
`

const Description = styled.p`
  max-width: 400px;
  color: #EB212E;
  line-height: 1.6;
  font-size: 0.9em;
  white-space: pre-line;
  margin-bottom: 0;
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
      image2x {
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
      image2x {
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
        }
      }
    }
  }
`
