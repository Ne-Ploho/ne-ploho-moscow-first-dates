import * as React from 'react';
import styled from 'styled-components';
import { ReactComponent as Badge1950_1965 } from '../icons/badge-1950-1965.svg';
import { ReactComponent as Badge1966_1980 } from '../icons/badge-1966-1980.svg';
import { ReactComponent as Badge1981_1995 } from '../icons/badge-1981-1995.svg';
import { ReactComponent as Badge1996_2010 } from '../icons/badge-1996-2010.svg';
import { ReactComponent as Badge2011_2019 } from '../icons/badge-2011-2019.svg';

const getIcon = (year) => {
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
}

const Badge = ({ className, year, gender, disabled }) => {
  const BadgeIcon = getIcon(year);

  return (
    <BadgeRoot className={className} data-gender={gender} disabled={disabled}>
      <BadgeIcon aria-hidden="true" />
    </BadgeRoot>
  );
};

export default Badge;

const BadgeRoot = styled.button`
  position: relative;
  border: 0;
  background: none;
  cursor: pointer;
  height: 32px;
  width: 70px;

  & svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  & .badge-body {
    fill: ${p => p['data-gender'] === 'male' ? '#FFFFFF' : '#EB212E'};
    stroke: #EB212E;

    transition: fill 0.15s ease-out;
  }

  &:hover .badge-body {
    fill: ${p => p.disabled ? '' : p['data-gender'] === 'male' ? '#EB212E' : '#FFFFFF'};
    stroke: #EB212E;
  }
`;
