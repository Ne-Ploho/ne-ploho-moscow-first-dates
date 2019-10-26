import * as React from 'react';
import styled from 'styled-components';
import DatesMap from '../components/DatesMap';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = ({ children, data, ...rest }) => {
  console.log(rest);
  React.useEffect(() => {
    console.log('init');

    return () => console.log('uninit');
  }, []);

  const stories = data.allContentfulStory.edges.map(e => e.node);

  return (
  <IndexRoot>
    <Header />
    <Main>
      <DatesMap stories={stories.filter(s => s.node_locale === 'ru-RU')} />
      {children}
    </Main>
    <Footer />
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