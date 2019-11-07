import * as React from 'react';
import styled from 'styled-components';
import { Link, navigate } from 'gatsby';
import Badge from './Badge';
import Logo from '../icons/neploho_logo.svg';
import { Trans } from '@lingui/macro';

const YearRange = ({ fromYear, toYear, active }) => {
  const url = active ? '/' : `/years/${fromYear}-${toYear}`;
  return (
    <StyledBadge year={fromYear} active={active} label={`${fromYear} - ${toYear}`} to={url}>
      {' '}
      {fromYear} - {toYear}
    </StyledBadge>
  );
};

const Footer = ({ fromYear, toYear, gender }) => {
  const inRange = (f, t) => fromYear <= f && toYear >= t;

  return (
    <FooterRoot>
      <Legend>
        <LegendYears>
          <YearRange
            fromYear={1950}
            toYear={1965}
            active={inRange(1950, 1965)}
          />
          <YearRange
            fromYear={1966}
            toYear={1980}
            active={inRange(1966, 1980)}
          />
          <YearRange
            fromYear={1981}
            toYear={1995}
            active={inRange(1981, 1995)}
          />
          <YearRange
            fromYear={1996}
            toYear={2010}
            active={inRange(1996, 2010)}
          />
          <YearRange
            fromYear={2011}
            toYear={2019}
            active={inRange(2011, 2019)}
          />
        </LegendYears>
        <LegendGenders>
          <label>
            <Trans id="footer.genders.title">Гендер рассказчика</Trans>
          </label>
          <Genders>
            <StyledBadge year={2011} active={gender === 'female'} to={gender === 'female' ? '/' : `/gender/female`}>
              <Trans id="footer.genders.female">Женщина</Trans>
            </StyledBadge>
            <StyledBadge year={2011} active={gender === 'male'} inverted to={gender === 'male' ? '/' : `/gender/male`}>
              <Trans id="footer.genders.male">Мужчина</Trans>
            </StyledBadge>
          </Genders>
        </LegendGenders>
      </Legend>
      <LogoLink href="https://ne-ploho.com" target="_blank" rel="noopener noreferrer">
        <StyledLogo />
      </LogoLink>
    </FooterRoot>
  );
};

export default Footer;

const FooterRoot = styled.footer`
  height: 80px;
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 24px;
  box-sizing: border-box;

  & a {
    color: #dd5db3;
    font-size: 0.8em;
    line-height: 1;
  }

  @media (max-width: 414px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;

    flex-direction: column;
    padding: 8px 16px;
    box-sizing: border-box;
    width: 100vw;
    height: 90px;
  }
`;

const LogoLink = styled.a`
  @media (max-width: 414px) {
    align-self: flex-end;
  }
`;

const StyledLogo = styled(Logo)`
  color: #eb212e;
  height: 16px;
  width: auto;
`;

const StyledBadge = styled(Badge)`
  margin-right: 32px;

  @media (max-width: 414px) {
    margin-right: 16px;
  }
`;

const Legend = styled.div`
  max-width: 100%;
  min-width: 50%;
`;

const LegendYears = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-y: auto;
  max-width: 100vw;
`;

const LegendGenders = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  & label {
    font-size: 0.8em;
    font-weight: bold;
    color: #EB212E;
    margin-right: 16px;
    white-space: nowrap;
  }

  @media (max-width: 414px) {
    flex-direction: column;
    align-items: flex-start;

    & label {
      display: none;
    }
  }
`;

const Genders = styled.div`
  display: flex;
`;
