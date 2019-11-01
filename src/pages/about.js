import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Dialog from '../components/Dialog';
import { Trans } from '@lingui/macro';

function AboutTemplate(props) {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout>
      <Helmet title={`О карте | ${siteTitle}`} />
      <Dialog>
        <AboutContent>
        <p>
          <Trans id="about.description">
            <b>Карта первых свиданий Москвы</b> — это живые настоящие истории,
            которые нам рассказывали знакомые и незнакомые люди самых разных
            возрастов. Мы спрашивали про первые свидания на улице, в
            интернете, у знакомых, друзей и у членов семьи. Реакции были
            разные: кто-то рассказывал о своём первом свидании взахлёб, кто-то
            совсем не мог его вспомнить. У кого-то отношения складывались без
            свиданий вообще. У кого-то свидание получилось, хотя они не
            виделись лично. Один человек сказал, что о таких личных вещах
            спрашивать должно быть стыдно, и отказался разговаривать.
          </Trans>
        </p>
        <h3>
          <Trans id="about.interviewees.title">
            На этой карте на свидание ходили:
          </Trans>
        </h3>

        <table>
          <tr>
            <td>
              <Trans id="about.interviewees.column.1">
                4 Татьяны{'\n'}
                3 Полины{'\n'}
                3 Сони{'\n'}
                3 Кати{'\n'}
                2 Дарьи{'\n'}
                1 Мария{'\n'}
                1 Светлана{'\n'}
                1 Яна{'\n'}
                1 Саида{'\n'}
                1 Надежда{'\n'}
                1 Нина{'\n'}
                1 Лиза{'\n'}
                1 Галя{'\n'}
                1 Оксана{'\n'}
                1 Аня{'\n'}
                1 Евдокия{'\n'}
                1 Жанна{'\n'}
                1 Лариса
              </Trans>
            </td>
            <td>
              <Trans id="about.interviewees.column.2">
                1 Аглая{'\n'}
                1 Джульетта{'\n'}
                1 Лена{'\n'}
                1 соседка_дьявола{'\n'}
                4 Саши{'\n'}
                2 Пети{'\n'}
                1 Дима{'\n'}
                1 Максим{'\n'}
                1 Влад{'\n'}
                1 Серёжа{'\n'}
                1 Серафим{'\n'}
                1 Ваня{'\n'}
                1 Филипп{'\n'}
                1 Николай{'\n'}
                1 Георгий{'\n'}
                1 Витя{'\n'}
                1 CMEXxX
              </Trans>
            </td>
          </tr>
        </table>

        <p>
          <Trans id="about.interviewees.stats">
            9 человек не назвали своего имени.{'\n'}
            38 человек не назвали имени своей второй половинки.{'\n'}
            13 человек не помнят своего первого свидания.{'\n'}
            У 6 человек первого свидания не было.{'\n'}
            3 человека не захотели говорить из-за эмоций.
          </Trans>
        </p>

        <h3>
          <Trans id="about.interviewers.title">Про свидания спрашивали:</Trans>
        </h3>
        </AboutContent>
      </Dialog>
    </Layout>
  );
}

export default AboutTemplate;

const AboutContent = styled.div`
  white-space: pre-line;
  line-height: 1.6;
  color: #EB212E;
  & h3 {
    margin: 24px 0 16px;
    font-size: 1em;
    font-weight: bold;
  }

  & td {
    width: 50%;
    vertical-align: top;
  }
`;

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
