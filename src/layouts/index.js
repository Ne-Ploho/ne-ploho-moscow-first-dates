import * as React from 'react';
import styled from 'styled-components';
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = ({ children, data, pageContext }) => {
  const edges = data && data.allContentfulStory ? data.allContentfulStory.edges : [];

  const stories = edges.map(e => e.node);

  return (
  <IndexRoot>
    <Header fromYear={pageContext.fromYear} toYear={pageContext.toYear} />
    <Main>
      <DatesMap stories={stories.filter(s => s.node_locale === 'ru-RU')} />
      {children}
    </Main>
    <Footer fromYear={pageContext.fromYear} toYear={pageContext.toYear} />
  </IndexRoot>
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