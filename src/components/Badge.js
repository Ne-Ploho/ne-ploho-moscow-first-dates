import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Badge1950_1965 from '../icons/badge-1950-1965.svg';
import Badge1966_1980 from '../icons/badge-1966-1980.svg';
import Badge1981_1995 from '../icons/badge-1981-1995.svg';
import Badge1996_2010 from '../icons/badge-1996-2010.svg';
import Badge2011_2019 from '../icons/badge-2011-2019.svg';

const getIcon = year => {
  if (year >= 2011) {
    return Badge2011_2019;
  } else if (year >= 1996) {
    return Badge1996_2010;
  } else if (year >= 1981) {
    return Badge1981_1995;
  } else if (year >= 1966) {
    return Badge1966_1980;
  } else {
    return Badge1950_1965;
  }
};

const Badge = ({ className, year, active, inverted, label, to, children }) => {
  const BadgeIcon = getIcon(parseInt(year, 10));

  return (
    <BadgeRoot
      className={className}
      data-active={active}
      data-inverted={inverted}
      aria-label={label}
      to={to}
    >
      <BadgeIcon aria-hidden="true" />
      {children}
    </BadgeRoot>
  );
};

export default Badge;

const BadgeRoot = styled(Link)`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;

  & svg {
    flex: 0 0 auto;
    height: 12px;
    width: 26px;
    margin-right: 8px;
  }

  text-decoration: ${p => p['data-active'] ? 'underline' : 'none'};

  &:hover {
    text-decoration: underline;
  }

  & .badge-body {
    fill: ${p => (p['data-inverted'] ? '#FFFFFF' : '#EB212E')};
    stroke: #eb212e;

    transition: fill 0.15s ease-out;
  }

  &:hover .badge-body {
    fill: ${p => (p['data-inverted'] ? '#EB212E' : '#FFFFFF')};
    stroke: #eb212e;
  }
`;
