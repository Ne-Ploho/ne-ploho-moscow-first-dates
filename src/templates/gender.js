import React from 'react';
import { graphql } from 'gatsby';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Layout from '../components/Layout';


function GenderTemplate(props) {
  const { data, pageContext } = props;
  const { i18n } = useLingui();

  const title = i18n._(pageContext.gender === 'male'
    ? t`genderPage.male.title`
    : t`genderPage.female.title`
  );

  return (
    <Layout title={title} />
  );
}

export default GenderTemplate;

export const pageQuery = graphql`
  query GenderQuery($gender: String!) {
    allContentfulStory(filter:{
      gender: { eq: $gender }
    }) {
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
`;
