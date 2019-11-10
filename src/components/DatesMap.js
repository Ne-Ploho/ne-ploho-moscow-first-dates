import * as React from 'react';
import {
  YMaps,
  Map as YMap,
  Placemark,
  withYMaps,
  Polyline
} from 'react-yandex-maps';
import styled, { keyframes } from 'styled-components';
import { navigate } from 'gatsby';
import Logo from '../icons/neploho_logo.svg';
import Badge1950_1965 from '!!raw-loader!../icons/badge-1950-1965.svg';
import Badge1966_1980 from '!!raw-loader!../icons/badge-1966-1980.svg';
import Badge1981_1995 from '!!raw-loader!../icons/badge-1981-1995.svg';
import Badge1996_2010 from '!!raw-loader!../icons/badge-1996-2010.svg';
import Badge2011_2019 from '!!raw-loader!../icons/badge-2011-2019.svg';
import useMapEditor from '../hooks/useMapEditor';

const Y_LIBS =
  'Map,Placemark,projection.Cartesian,MapType,Layer,layer.storage,mapType.storage,templateLayoutFactory';

const getBadge = year => {
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

const MAP_WIDTH = 6783;
const MAP_HEIGHT = 8007;
const WORLD_SIZE = Math.pow(2, 10) * 256;

const CENTER = [55.749, 37.616];

const LOCATION_FACTOR = 32000;

function scaleLocation(loc) {
  return [
    (loc[0] - CENTER[0]) * LOCATION_FACTOR + CENTER[0],
    (loc[1] - CENTER[1]) * LOCATION_FACTOR + CENTER[1]
  ];
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
  const [tilesLoaded, setTilesLoaded] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(true);

  const editor = useMapEditor(map, c => {
    return [
      (c[0] - CENTER[0]) / LOCATION_FACTOR + CENTER[0],
      (c[1] - CENTER[1]) / LOCATION_FACTOR + CENTER[1]
    ];
  });

  const options = React.useMemo(() => {
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
    };
  }, [ymaps]);

  React.useEffect(() => {
    if (tilesLoaded && stories.length > 0) {
      const to = setTimeout(() => {
        setFirstRender(false);
      }, 1500);

      return () => clearTimeout(to);
    }
  }, [tilesLoaded, stories.length]);

  React.useEffect(() => {
    if (stories.length === 0) {
      console.log('NO STORIES')
      setFirstRender(true);
    }
  }, [stories.length]);

  React.useEffect(() => {
    if (!ymaps) return;

    const Layer = function() {
      const layer = new ymaps.Layer('/assets/tiles/%z/tile-%x-%y.png', {});

      layer.getZoomRange = function() {
        return ymaps.vow.resolve([6, 9]);
      };

      layer.events.add('tileloadchange', (e) => {
        if (e.get('readyTileNumber') === e.get('totalTileNumber')) {
          setTilesLoaded(true);
        }
      });

      return layer;
    };

    ymaps.layer.storage.add('datesMapLayer', Layer);

    const _mapType = new ymaps.MapType('datesMap', ['datesMapLayer']);

    ymaps.mapType.storage.add('datesMap', _mapType);

    setMapType(_mapType);
  }, [ymaps]);

  const svgLayout = React.useMemo(
    () => {
      if (ymaps) {
        const markLayout = ymaps.templateLayoutFactory.createClass(
          `
            <div
              data-id="{{ properties.id }}"
              class="map-badge map-badge-{{ properties.gender }} {{ properties.className }}"
              style="animation-delay: {{ properties.delay }}s"
            >
              $[properties.badge]
              <div class="badge-year">
                $[properties.iconContent]
              </div>
            </div>
          `,
          {
            build: function() {
              markLayout.superclass.build.call(this);
              const element = this.getParentElement().getElementsByClassName('map-badge')[0];
              const obj = this.getData().geoObject;

              obj.events.add('mouseenter', () => {
                element.classList.add('map-badge-hover');
              });
              obj.events.add('mouseleave', () => {
                element.classList.remove('map-badge-hover');
              });
              obj.events.add('click', () => {
                element.classList.add('map-badge-loading');
                element.classList.remove('map-badge-hover');
                element.getElementsByClassName('badge-year')[0].innerHTML = '<b></b><b></b><b></b>';
              })

              element
            }
          }
        );

        return markLayout;
      }
      return undefined;
    },
    [ymaps]
  );

  return (
    <DatesMapRoot>
      <LogoBack />
      <YMaps
        preload
        query={{
          apikey: '92659bc7-f871-4646-9da3-b90f42da0c4c',
          load: Y_LIBS
        }}
        hash="mfd"
      >
        <OnMapLoad onMapLoad={setYmaps} />
        {mapType && (
          <StyledYMap
            instanceRef={setMap}
            state={{
              center: CENTER,
              zoom: 6,
              type: 'datesMap',
              controls: []
            }}
            options={options}
          >
            {editor}
            {!editor && tilesLoaded && stories.map((s, idx) => {
              return (
                <Placemark
                  key={idx}
                  geometry={scaleLocation([s.location.lat, s.location.lon])}
                  properties={{
                    badge: getBadge(parseInt(s.year)),
                    iconContent: s.year,
                    gender: s.gender,
                    id: s.contentfulid,
                    delay: Math.random(),
                    className: firstRender ? '' : 'map-badge-rendered'
                  }}
                  options={{
                    iconLayout: svgLayout,
                    iconShape: {
                      type: 'Rectangle',
                      coordinates: [[-35, -16], [35, 16]]
                    }
                  }}
                  onClick={() => {
                    navigate(`/stories/${s.slug}`);
                  }}
                />
              );
            })}
          </StyledYMap>
        )}
      </YMaps>
    </DatesMapRoot>
  );
};

export default DatesMap;

const badgeScaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`

const DatesMapRoot = styled.div`
  position: absolute;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  background-color: #fde3f4;
`;

const StyledYMap = styled(YMap)`
  position: absolute;
  width: 100%;
  height: 100%;

  & .map-badge {
    display: inline-block;
    position: relative;
    transform: translate(-50%, -50%);
    height: 21px;
    text-align: center;
    animation: ${badgeScaleIn} 0.2s ease-out;
    animation-fill-mode: both;
  }

  & .map-badge svg {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow(-1px -1px 2px rgba(100, 0, 0, 0.6));
  }

  & .map-badge svg .badge-body {
    transition: fill 0.3s ease-out;
  }

  & .map-badge.map-badge-male svg .badge-body,
  & .map-badge.map-badge-hover.map-badge-female svg .badge-body {
    fill: #ffffff;
    stroke: none;
  }

  & .map-badge.map-badge-female svg .badge-body,
  & .map-badge.map-badge-hover.map-badge-male svg .badge-body {
    fill: #eb212e;
    stroke: none;
  }

  & .map-badge .badge-year {
    position: relative;
    z-index: 1;
    font-weight: bold;
    padding: 1px 14px 0;
    transition: color 0.3s ease-out;
    white-space: nowrap;
  }

  & .map-badge.map-badge-male .badge-year,
  & .map-badge.map-badge-hover.map-badge-female .badge-year {
    color: #eb212e;
  }

  & .map-badge.map-badge-female .badge-year,
  & .map-badge.map-badge-hover.map-badge-male .badge-year {
    color: #ffffff;
  }

  & .map-badge.map-badge-rendered {
    animation: none;
  }

  & .map-badge-loading b {
    background-color: #FFFFFF;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  }

  & .map-badge-male.map-badge-loading b {
    background-color: #eb212e;
  }

  & .map-badge-loading b:first-child {
    animation-delay: -0.16s;
  }

  & .map-badge-loading b:last-child {
    animation-delay: 0.16s;
  }

  .dot {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #FFFFFF;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-bounce 2s infinite cubic-bezier(0.455, 0.03, 0.515, 0.955); 
  }

  .sk-bounce-dot:nth-child(2) { animation-delay: -1.0s; }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0);
    } 45%, 55% {
      transform: scale(1); 
    } 
  }
`;

const LogoBack = styled(Logo)`
  position: absolute;
  top: 40%;
  height: 20%;
  left: 20%;
  width: 60%;
  color: #ffd4f0;
`;
