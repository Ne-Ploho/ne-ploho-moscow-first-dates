import * as React from 'react';
import styled from 'styled-components';
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { I18nProvider } from '@lingui/react';

import catalogEn from '../locales/en/messages.js'
import catalogRu from '../locales/ru/messages.js'

const catalogs = { en: catalogEn, ru: catalogRu };

function getDefaultLang() {
  return 'ru';
}

const Index = ({ children, data, pageContext }) => {
  const edges = data && data.allContentfulStory ? data.allContentfulStory.edges : [];
  const [lang, setLang] = React.useState(getDefaultLang());

  const stories = edges.map(e => e.node);

  const updateLang = lang => {
    setLang(lang);
  }

  return (
  <I18nProvider language={lang} catalogs={catalogs}>
    <IndexRoot>
      <Header fromYear={pageContext.fromYear} toYear={pageContext.toYear} lang={lang} onLangChange={updateLang} />
      <Main>
        <DatesMap stories={stories.filter(s => s.node_locale === 'ru-RU')} />
        {children}
      </Main>
      <Footer fromYear={pageContext.fromYear} toYear={pageContext.toYear} />
    </IndexRoot>
  </I18nProvider>
  );
};

export default Index;

const IndexRoot = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: #FFF;
`;

const Main = styled.main`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
`;