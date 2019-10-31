import * as React from 'react';
import styled from 'styled-components';
import { I18nProvider } from '@lingui/react';
import { setupI18n } from '@lingui/core'
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';

import catalogEn from '../locales/en.js'
import catalogRu from '../locales/ru.js'

const i18n = setupI18n();
i18n.load('en', catalogEn);
i18n.load('ru', catalogRu);

function getDefaultLang() {
  return 'ru';
}

const Index = ({ children, data, pageContext }) => {
  const edges = data && data.allContentfulStory ? data.allContentfulStory.edges : [];
  const [lang, setLang] = React.useState(getDefaultLang());

  const stories = edges.map(e => e.node);

  React.useEffect(() => {
    i18n.activate(lang);
  }, [lang]);

  const updateLang = lang => {
    setLang(lang);
  }

  return (
  <I18nProvider i18n={i18n}>
    <IndexRoot>
      <Header fromYear={pageContext.fromYear} toYear={pageContext.toYear} lang={lang} onLangChange={updateLang} />
      <Main>
        <DatesMap stories={stories.filter(s => s.node_locale === 'ru')} />
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