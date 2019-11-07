import React from 'react'
import styled from 'styled-components';
import { graphql, Link, navigate } from 'gatsby';
import Img from 'gatsby-image';
import { useLingui, Trans } from '@lingui/react';
import Layout from '../components/Layout'
import Dialog from '../components/Dialog';

function StoryTemplate(props) {
  const { data, pageContext } = props;
  const stories = data.allContentfulStory.nodes;

  const { i18n } = useLingui();

  const story = i18n.locale === 'ru' ? data.storyRu : data.storyEn;

  const prev = stories.find(s => s.contentfulid === story.contentfulid - 1);
  const next = stories.find(s => s.contentfulid === story.contentfulid + 1);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = e => {
      if (prev && e.key === 'ArrowLeft') {
        navigate(`/stories/${prev.slug}`);
      } else if (next && e.key === 'ArrowRight') {
        navigate(`/stories/${next.slug}`);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next]);

  const fluid = {
    ...story.image.fluid,
    tracedSVG: story.image.fluid.tracedSVG.replace('fill=\'%23d3d3d3\'', 'fill=\'%23f9bedf\'')
  };

  return (
    <Layout>
      <Dialog>
        <StyledImg
          fluid={fluid}
          alt={story.description.description}
          data-aspectratio={story.image.fluid.aspectRatio}
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

const StyledImg = styled(Img)`
  max-width: 100%;
  width: ${p => p['data-aspectratio'] > 1 ? `${p['data-aspectratio'] * 400}px` : 'auto'};
  @media (max-width: 414px) {
    width: auto;
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
  max-width: 450px;
  color: #EB212E;
  line-height: 1.6;
  font-size: 0.9em;
  white-space: pre-line;
  margin: 1em auto 0;

  @media (max-width: 414px) {
    font-size: 0.8em;
  }
`;

export const pageQuery = graphql`
  query StoryBySlug($slug: String!) {
    storyEn: contentfulStory(slug: { eq: $slug }, node_locale: { eq: "en" }) {
      contentfulid
      image {
        fluid(maxHeight: 400, quality: 85) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      description {
        description
      }
    }
    storyRu: contentfulStory(slug: { eq: $slug }, node_locale: { eq: "ru" }) {
      contentfulid
      image {
        fluid(maxHeight: 400, quality: 85) {
          ...GatsbyContentfulFluid_tracedSVG
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
