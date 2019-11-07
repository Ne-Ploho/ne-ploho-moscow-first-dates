import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { I18nProvider, useLingui } from '@lingui/react';
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import initI18n from '../i18n';

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

export const DialogContext = React.createContext(undefined);

function filterStories(stories, pageContext) {
  return stories.filter(s => {
    if (pageContext.fromYear && pageContext.toYear) {
      const year = parseInt(s.year, 10);
      return pageContext.fromYear <= year && pageContext.toYear >= year;
    }

    return true;
  });
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

function LangDatesMap(props) {
  const { i18n } = useLingui();
  return <DatesMap stories={props.stories.filter(s => s.node_locale === i18n.locale)} />
}

const Index = ({ children, data, pageContext, location }) => {
  const i18n = React.useMemo(() => initI18n(location), []);
  const stories =
    data && data.allContentfulStory ? data.allContentfulStory.nodes : [];
  const [dialogState, setDialogState] = React.useState(
    getDialogState(location)
  );

  React.useLayoutEffect(() => {
    const newState = getDialogState(location, dialogState);
    setDialogState(newState);
  }, [location]);

  return (
    <DialogContext.Provider value={dialogState}>
      <I18nProvider i18n={i18n}>
        <IndexRoot>
          <GlobalStyle />
          <Header
            fromYear={pageContext.fromYear}
            toYear={pageContext.toYear}
            gender={pageContext.gender}
            location={location}
          />
          <Main>
            <LangDatesMap stories={filterStories(stories, pageContext)} />
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

  @media (max-width: 414px) {
    position: absolute;
    bottom: 90px;
    top: 40px;
    left: 0;
    right: 0;
  }
`;
