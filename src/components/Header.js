import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

const Header = ({ fromYear, toYear, gender, location }) => {
  let title = <Trans id="header.title">Карта первых свиданий Москвы</Trans>;

  const { i18n } = useLingui();

  if (gender) {
    if (gender === 'male') {
      title = <Trans id="header.title.male"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>Mужчины</Section></Trans>;
    } else if (gender === 'female') {
      title = <Trans id="header.title.female"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>Женщины</Section></Trans>;
    }
  } else if (fromYear && toYear) {
    title = <Trans id="header.title.years"><Link to="/">Карта первых свиданий Москвы:</Link> <Section>{fromYear} - {toYear}</Section></Trans>;
  }

  const switchLangUrl = location.pathname + '?l=' + (i18n.locale === 'ru' ? 'en' : 'ru');

  return <HeaderRoot>
    <Title>{title}</Title>
    <Right>
      <AboutLink to="/about"><Trans id="header.about">О карте</Trans></AboutLink>
      <LangSwitch href={switchLangUrl} onClick={(e) => {
        e.preventDefault();
        if (window && window.history) {
          window.history.replaceState(null, null, switchLangUrl);
        }
        i18n.activate(i18n.locale  === 'ru' ? 'en' : 'ru');
      }}>{i18n.locale  === 'ru' ? 'EN' : 'RU'}</LangSwitch>
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
  align-items: center;
  justify-content: space-between;
  color: #EB212E;
  font-size: 1em;
  background: #FFFFFF;

  & a {
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      text-decoration: underline;
    }    
  }

  @media (max-width: 414px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    padding: 8px 16px;
    font-size: 0.8em;
  }
`;

const Section = styled.span`
  color: #dd5db3;
`;

const Title = styled.h1`
  font-size: inherit;
  margin: 0;
  font-weight: normal;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AboutLink = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LangSwitch = styled.a`
  background: #EB212E;
  color: #FFFFFF;
  padding: 5px 6px;
  cursor: pointer;
  margin-left: 16px;
  line-height: 1;
  font-size: 0.9em;
`;

const Right = styled.div`
  display: flex;
`;