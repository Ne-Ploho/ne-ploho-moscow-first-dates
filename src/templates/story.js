import React from 'react'
import styled from 'styled-components';
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet';
import { useLingui, Trans } from '@lingui/react';
import Layout from '../components/layout'
import Dialog from '../components/Dialog';

function StoryTemplate(props) {
  const { data, pageContext } = props;
  const siteTitle = data.site.siteMetadata.title;
  const stories = data.allContentfulStory.nodes;

  const { i18n } = useLingui();

  const story = i18n.locale === 'ru' ? data.storyRu : data.storyEn;

  const imageUrl = story.image.file.url;
  const image2xUrl = story.image2x.file.url;

  const prev = stories.find(s => s.contentfulid === story.contentfulid - 1);
  const next = stories.find(s => s.contentfulid === story.contentfulid + 1);

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
        <Controls>
          {prev && <Link className="prev-link" to={`/stories/${prev.slug}`}><Trans id="story.back">Назад</Trans></Link>}
          {next && <Link className="next-link" to={`/stories/${next.slug}`}><Trans id="story.forward">Вперед</Trans></Link>}
        </Controls>
      </Dialog>
    </Layout>
  )
}

export default StoryTemplate;

const Img = styled.img`
  width: 100%;
  min-height: 310px;

  @media (max-width: 414px) {
    min-height: auto;
  }
`

const Controls = styled.div`
  margin-top: 16px;
  height: 16px;
  line-height: 1;

  & a {
    font-size: 0.9em;
    color: #EB212E;
    text-decoration: none;
    font-weight: bold;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .prev-link {
    float: left;
  }

  & .next-link {
    float: right;
  }
`;

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
      contentfulid
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
      contentfulid
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
`
