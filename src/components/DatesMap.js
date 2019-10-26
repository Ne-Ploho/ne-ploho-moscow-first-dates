import * as React from 'react';
import { YMaps, Map as YMap, ZoomControl, Placemark } from 'react-yandex-maps';
import styled from 'styled-components';

const MAP_WIDTH = 6789;
const MAP_HEIGHT = 8010;
const WORLD_SIZE = Math.pow(2, 10) * 256;

const CENTER = [55.749, 37.616];

const LOCATION_FACTOR = 50000;

function scaleLocation(loc) {
  return [
    (loc[0] - CENTER[0]) * LOCATION_FACTOR + CENTER[0],
    (loc[1] - CENTER[1]) * LOCATION_FACTOR + CENTER[1],
  ]
}

console.log(LOCATION_FACTOR)

const DatesMap = ({ stories }) => {
  const [ymaps, setYmaps] = React.useState(null);
  const [map, setMap] = React.useState(null);
  const [mapType, setMapType] = React.useState(null);

  console.log(ymaps);
  console.log(map);

  const bounds = [
    [MAP_HEIGHT / 2 - WORLD_SIZE, -MAP_WIDTH / 2],
    [MAP_HEIGHT / 2, WORLD_SIZE - MAP_WIDTH / 2]
  ];

  const options = React.useMemo(
    () => ({
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
    }),
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

  return (
    <YMaps
      query={{
        apikey: '92659bc7-f871-4646-9da3-b90f42da0c4c',
        load:
          'Map,Placemark,control.ZoomControl,projection.Cartesian,MapType,Layer,layer.storage,mapType.storage'
      }}
    >
      <StyledYMap
        onLoad={setYmaps}
        instanceRef={setMap}
        state={{
          center: CENTER,
          zoom: 6,
          type: mapType ? 'datesMap' : undefined,
          controls: []
        }}
        options={options}
      >
        <ZoomControl />
        {stories.map((s, idx) => {
          return (
            <Placemark
              key={idx}
              geometry={scaleLocation([s.location.lat, s.location.lon])}
              properties={{
                iconCaption: `${s.name}, ${s.age}`
              }}
            />
          );
        })}
      </StyledYMap>
    </YMaps>
  );
};

export default DatesMap;

const DatesMapRoot = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledYMap = styled(YMap)`
  width: 100vw;
  height: 100vh;
`;
