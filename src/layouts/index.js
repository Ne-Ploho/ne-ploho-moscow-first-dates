import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { I18nProvider } from '@lingui/react';
import { setupI18n } from '@lingui/core';
import { LocaleResolver, DETECTORS, TRANSFORMERS } from 'locales-detector';
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';

import catalogEn from '../locales/en.js';
import catalogRu from '../locales/ru.js';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
   font-size: 1em;
   line-height: 1.65;
   background: #FFFFFF;
  }

  a {
   color: currentColor;
  }
`;

const i18n = setupI18n();
i18n.load('en', catalogEn);
i18n.load('ru', catalogRu);

function getDefaultLang(location) {
  const locales = new LocaleResolver(
    [new DETECTORS.UrlDetector('l', location), new DETECTORS.NavigatorDetector()],
    [
      new TRANSFORMERS.LanguageOnlyTransformer(),
      new TRANSFORMERS.AllowOnlyTransformer(['ru', 'en'])
    ]
  ).getLocales();
  return locales[0] || 'ru';
}

const Index = ({ children, data, pageContext, location }) => {
  const edges =
    data && data.allContentfulStory ? data.allContentfulStory.edges : [];
  const [lang, setLang] = React.useState(getDefaultLang(location));

  const stories = edges.map(e => e.node);

  React.useEffect(() => {
    i18n.activate(lang);
  }, [lang]);

  const updateLang = lang => {
    setLang(lang);
  };

  return (
    <I18nProvider i18n={i18n}>
      <IndexRoot>
        <GlobalStyle />
        <Header
          fromYear={pageContext.fromYear}
          toYear={pageContext.toYear}
          gender={pageContext.gender}
          lang={lang}
          onLangChange={updateLang}
          location={location}
        />
        <Main>
          <DatesMap stories={stories.filter(s => s.node_locale === 'ru')} />
          {children}
        </Main>
        <Footer
          fromYear={pageContext.fromYear}
          toYear={pageContext.toYear}
          gender={pageContext.gender}
        />
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
  background: #fff;
`;

const Main = styled.main`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
`;
