import * as React from 'react';
import { YMaps, Map as YMap, Placemark, withYMaps } from '@alexkuz/react-yandex-maps';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import Badge1950_1965 from '!!raw-loader!../icons/badge-1950-1965.svg';
import Badge1966_1980 from '!!raw-loader!../icons/badge-1966-1980.svg';
import Badge1981_1995 from '!!raw-loader!../icons/badge-1981-1995.svg';
import Badge1996_2010 from '!!raw-loader!../icons/badge-1996-2010.svg';
import Badge2011_2019 from '!!raw-loader!../icons/badge-2011-2019.svg';


const Y_LIBS = 'Map,Placemark,projection.Cartesian,MapType,Layer,layer.storage,mapType.storage,templateLayoutFactory';

const getBadge = (year) => {
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

const MAP_WIDTH = 6783;
const MAP_HEIGHT = 8007;
const WORLD_SIZE = Math.pow(2, 10) * 256;

const CENTER = [55.749, 37.616];

const LOCATION_FACTOR = 32000;

function scaleLocation(loc) {
  return [
    (loc[0] - CENTER[0]) * LOCATION_FACTOR + CENTER[0],
    (loc[1] - CENTER[1]) * LOCATION_FACTOR + CENTER[1],
  ]
}

// we need this lo load ymaps before rendering map component,
// to avoid nasty performance issues

const OnMapLoad = withYMaps(({ onMapLoad, ymaps }) => {
  React.useEffect(() => {
    if (ymaps) {
      onMapLoad(ymaps);
    }
  }, [ymaps]);

  return null;
});

const DatesMap = ({ stories }) => {
  const [ymaps, setYmaps] = React.useState(null);
  const [map, setMap] = React.useState(null);
  const [mapType, setMapType] = React.useState(null);

  const options = React.useMemo(
    () => {
      const bounds = [
        [MAP_HEIGHT / 2 - WORLD_SIZE, -MAP_WIDTH / 2],
        [MAP_HEIGHT / 2, WORLD_SIZE - MAP_WIDTH / 2]
      ];

      return {
      suppressMapOpenBlock: true,
      avoidFractionalZoom: false,
      projection:
        ymaps && ymaps.projection
          ? new ymaps.projection.Cartesian(bounds, [false, false])
          : undefined,
      restrictMapArea: [
        [-MAP_HEIGHT / 2, -MAP_WIDTH / 2],
        [MAP_HEIGHT / 2, MAP_WIDTH / 2]
      ]
    }
  },
    [ymaps]
  );

  React.useEffect(() => {
    if (!ymaps) return;

    const Layer = function() {
      const layer = new ymaps.Layer('/assets/tiles/%z/tile-%x-%y.png', {});

      layer.getZoomRange = function() {
        return ymaps.vow.resolve([6, 10]);
      };

      return layer;
    };

    ymaps.layer.storage.add('datesMapLayer', Layer);

    const _mapType = new ymaps.MapType('datesMap', ['datesMapLayer']);

    ymaps.mapType.storage.add('datesMap', _mapType);

    setMapType(_mapType);
  }, [ymaps]);

  const svgLayout = React.useMemo(() =>
    ymaps && ymaps.templateLayoutFactory.createClass('<div class="map-badge map-badge-{{ properties.gender }}">$[properties.badge]<div class="badge-year">$[properties.iconContent]</div></div>'),
    [ymaps]
  );

  return (
    <YMaps
      query={{
        apikey: '92659bc7-f871-4646-9da3-b90f42da0c4c',
        load: Y_LIBS
      }}
      hash="mfd"
    >
      <OnMapLoad onMapLoad={setYmaps} />
      {mapType && <StyledYMap
        instanceRef={setMap}
        state={{
          center: CENTER,
          zoom: 6,
          type: 'datesMap',
          controls: []
        }}
        options={options}
      >
        {stories.map((s, idx) => {
          return (
            <Placemark
              key={idx}
              geometry={scaleLocation([s.location.lat, s.location.lon])}
              properties={{
                badge: getBadge(s.year),
                iconContent: s.year,
                gender: s.gender
              }}
              options={{
                iconLayout: svgLayout,
                iconShape: {
                    type: 'Rectangle',
                    // Прямоугольник описывается в виде двух точек - верхней левой и нижней правой.
                    coordinates: [
                        [-35, -16], [35, 16]
                    ]
                }
              }}
              onClick={() => {
                navigate(`/stories/${s.slug}`)
              }}
              onMouseEnter={e => {
                e.get('target').properties.set('gender', s.gender === 'male' ? 'female' : 'male')
              }}
              onMouseLeave={e => {
                e.get('target').properties.set('gender', s.gender)
              }}
            />
          );
        })}
      </StyledYMap>}
    </YMaps>
  );
};

export default DatesMap;

const StyledYMap = styled(YMap)`
  position: absolute;
  width: 100%;
  flex: 1 0 auto;
  height: calc(100vh - 120px);

  & .map-badge {
    position: relative;
    transform: translate(-35px, -16px);
    width: 70px;
    height: 32px;
    text-align: center;
  }

  & .map-badge svg {
  }

  & .map-badge svg .badge-body {
    transition: fill 1s ease-out;
  }

  & .map-badge.map-badge-male svg .badge-body {
    fill: #FFFFFF;
    stroke: #EB212E;
  }

  & .map-badge .badge-year {
    position: absolute;
    width: 100%;
    top: 6px;
    text-align: center;
    font-weight: bold;
  }

  & .map-badge.map-badge-male .badge-year {
    color: #EB212E;
  }

  & .map-badge.map-badge-female svg .badge-body {
    fill: #EB212E;
    stroke: #EB212E;
  }

  & .map-badge.map-badge-female .badge-year {
    color: #FFFFFF;
  }
`;
