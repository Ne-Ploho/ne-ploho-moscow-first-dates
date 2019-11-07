import * as React from 'react';
import { YMaps, Map as YMap, Placemark, withYMaps, Polyline } from '@alexkuz/react-yandex-maps';
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

//   const [poly, setPoly] = React.useState([]);
// 
//   React.useEffect(() => {
//     if (map) {
//       const handleClick = e => {
//         const coords = e.get('coords');
//         setPoly([...poly, coords])
//       };
//       map.events.add('click', handleClick)
// 
//       return () => map.events.remove('click', handleClick);
//     }
//   }, [map, poly])
// 
//   console.log(JSON.stringify(poly.map(c => {
//     return [
//       (c[0] - CENTER[0]) / LOCATION_FACTOR + CENTER[0],
//       (c[1] - CENTER[1]) / LOCATION_FACTOR + CENTER[1],
//     ]
//   }).map(c => {
//     return [
//       parseFloat(c[0].toPrecision(6)),
//       parseFloat(c[1].toPrecision(6))
//     ]
//   })));

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
        return ymaps.vow.resolve([6, 9]);
      };

      return layer;
    };

    ymaps.layer.storage.add('datesMapLayer', Layer);

    const _mapType = new ymaps.MapType('datesMap', ['datesMapLayer']);

    ymaps.mapType.storage.add('datesMap', _mapType);

    setMapType(_mapType);
  }, [ymaps]);

  const svgLayout = React.useMemo(() =>
    ymaps && ymaps.templateLayoutFactory.createClass('<div data-id="{{ properties.id }}" class="map-badge map-badge-{{ properties.gender }}">$[properties.badge]<div class="badge-year">$[properties.iconContent]</div></div>'),
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
        {/*<Polyline
          geometry={poly}
          options={{ strokeColor: '#000', strokeWidth: 2 }}
        />*/}
        {stories.map((s, idx) => {
          return (
            <Placemark
              key={idx}
              geometry={scaleLocation([s.location.lat, s.location.lon])}
              properties={{
                badge: getBadge(parseInt(s.year)),
                iconContent: s.year,
                gender: s.gender,
                id: s.contentfulid
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

  @media (max-width: 414px) {
    margin-top: 40px;
    margin-bottom: 90px;
    height: calc(100vh - 130px);
  }

  & .map-badge {
    display: inline-block;
    position: relative;
    transform: translate(-50%, -50%);
    height: 21px;
    text-align: center;
  }

  & .map-badge svg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow( -1px -1px 2px rgba(100, 0, 0, .6));
  }

  & .map-badge svg .badge-body {
    transition: fill 1s ease-out;
  }

  & .map-badge.map-badge-male svg .badge-body {
    fill: #FFFFFF;
    stroke: none;
  }

  & .map-badge .badge-year {
    position: relative;
    z-index: 1;
    font-weight: bold;
    padding: 1px 14px 0;
  }

  & .map-badge.map-badge-male .badge-year {
    color: #EB212E;
  }

  & .map-badge.map-badge-female svg .badge-body {
    fill: #EB212E;
    stroke: none;
  }

  & .map-badge.map-badge-female .badge-year {
    color: #FFFFFF;
  }
`;
