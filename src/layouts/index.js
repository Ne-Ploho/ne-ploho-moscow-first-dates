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
  html {
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1em;
    line-height: 1.65;
    background: #FFFFFF;
    overflow: hidden;
  }

  a {
    color: currentColor;
  }
`;

const i18n = setupI18n();
i18n.load('en', catalogEn);
i18n.load('ru', catalogRu);

export const DialogContext = React.createContext(undefined);

function getDefaultLang(location) {
  const locales = new LocaleResolver(
    [
      new DETECTORS.UrlDetector('l', location),
      typeof window === 'undefined' ? null : new DETECTORS.NavigatorDetector()
    ].filter(Boolean),
    [
      new TRANSFORMERS.LanguageOnlyTransformer(),
      new TRANSFORMERS.AllowOnlyTransformer(['ru', 'en'])
    ]
  ).getLocales();
  return locales[0] || 'ru';
}

function filterStories(stories, pageContext, lang) {
  return stories.filter(s => {
    if (s.node_locale !== lang) return false;

    if (pageContext.fromYear && pageContext.toYear) {
      const year = parseInt(s.year, 10);
      return pageContext.fromYear <= year && pageContext.toYear >= year;
    }

    return true;
  })
}

function getDialogState(location, prevDialogState) {
  const pathname = location.pathname;
  if (location.pathname.indexOf('/stories/') !== -1) {
    if (prevDialogState === 'hidden' || prevDialogState === 'disappear') {
      return 'appear';
    } else {
      return 'shown';
    }
  } else {
    if (prevDialogState === 'shown' || prevDialogState === 'appear') {
      return 'disappear';
    } else {
      return 'hidden';
    }    
  }
}

const Index = ({ children, data, pageContext, location }) => {
  const stories =
    data && data.allContentfulStory ? data.allContentfulStory.nodes : [];
  const [lang, setLang] = React.useState(getDefaultLang(location));
  const [dialogState, setDialogState] = React.useState(getDialogState(location));

  React.useLayoutEffect(() => {
    const newState = getDialogState(location, dialogState);
    setDialogState(newState);
  }, [location]);

  React.useEffect(() => {
    i18n.activate(lang);
  }, [lang]);

  const updateLang = lang => {
    setLang(lang);
  };

  return (
    <DialogContext.Provider value={dialogState}>
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
          <DatesMap stories={filterStories(stories, pageContext, lang)} />
          {children}
        </Main>
        <Footer
          fromYear={pageContext.fromYear}
          toYear={pageContext.toYear}
          gender={pageContext.gender}
        />
      </IndexRoot>
    </I18nProvider>
    </DialogContext.Provider>
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
