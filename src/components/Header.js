import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Trans } from '@lingui/macro';

const Header = ({ lang, onLangChange, fromYear, toYear, gender, location }) => {
  let title = <Trans id="header.title">Карта первых свиданий Москвы</Trans>;

  if (gender) {
    if (gender === 'male') {
      title = <Trans id="header.title.male"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>Mужчины</Section></Trans>;
    } else if (gender === 'female') {
      title = <Trans id="header.title.female"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>Женщины</Section></Trans>;
    }
  } else if (fromYear && toYear) {
    title = <Trans id="header.title.years"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>{fromYear} - {toYear}</Section></Trans>;
  }

  const switchLangUrl = location.pathname + '?l=' + (lang === 'ru' ? 'en' : 'ru');

  return <HeaderRoot>
    <Title>{title}</Title>
    <Right>
      <AboutLink to="/about"><Trans id="header.about">О карте</Trans></AboutLink>
      <LangSwitch href={switchLangUrl} onClick={(e) => {
        e.preventDefault();
        if (window && window.history) {
          window.history.replaceState(null, null, switchLangUrl);
        }
        onLangChange(lang === 'ru' ? 'en' : 'ru')
      }}>{lang === 'ru' ? 'EN' : 'RU'}</LangSwitch>
    </Right>
  </HeaderRoot>;
};

export default Header;

const HeaderRoot = styled.header`
  height: 40px;
  flex: 0 0 auto;
  padding: 8px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: #EB212E;

  & a {
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      text-decoration: underline;
    }    
  }
`;

const Section = styled.span`
  color: #dd5db3;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1em;
  text-transform: uppercase;
`;

const AboutLink = styled(Link)`
`;

const LangSwitch = styled.a`
  background: #EB212E;
  color: #FFFFFF;
  padding: 5px 6px;
  cursor: pointer;
  margin-left: 16px;
  line-height: 1;
`;

const Right = styled.div`
  display: flex;
`;