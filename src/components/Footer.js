import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Badge from './Badge';
import Logo from '../icons/neploho_logo.svg';
import { Trans } from '@lingui/macro';

const YearRange = ({ fromYear, toYear, active }) => {
  return (
    <YearRangeRoot>
      <StyledBadge year={fromYear} active />{' '}
      <Link
        to={active ? '/' : `/years/${fromYear}-${toYear}`}
        style={{ textDecoration: active ? 'underline' : 'none' }}
      >
        {fromYear} - {toYear}
      </Link>
    </YearRangeRoot>
  );
};

const YearRangeRoot = styled.div`
  display: flex;
  margin-right: 32px;
  flex-wrap: nowrap;
  white-space: nowrap;
  @media (max-width: 414px) {
    margin-right: 16px;
  }
`;

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
            <Gender>
              <StyledBadge year={2011} active />
              <Link
                to={gender === 'female' ? '/' : `/gender/female`}
                style={{
                  textDecoration: gender === 'female' ? 'underline' : 'none'
                }}
              >
                <Trans id="footer.genders.female">Женщина</Trans>
              </Link>
            </Gender>
            <Gender>
              <StyledBadge year={2011} />
              <Link
                to={gender === 'male' ? '/' : `/gender/male`}
                style={{
                  textDecoration: gender === 'male' ? 'underline' : 'none'
                }}
              >
                <Trans id="footer.genders.male">Мужчина</Trans>
              </Link>
            </Gender>
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
    text-decoration: none;
    font-size: 0.8em;
    line-height: 1;
    margin-left: 8px;
  }

  &:hover a {
    text-decoration: underline;
  }

  @media (max-width: 414px) {
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
  height: 12px;
  width: 26px;
`;

const Legend = styled.div`
  max-width: 100%;
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

const Gender = styled.div`
  margin-right: 16px;
  display: flex;
`;
