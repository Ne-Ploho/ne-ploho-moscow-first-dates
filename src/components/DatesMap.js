import * as React from 'react';
import { YMaps, Map as YMap, Placemark, withYMaps } from '@alexkuz/react-yandex-maps';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const MAP_WIDTH = 6789;
const MAP_HEIGHT = 8010;
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

  return (
    <YMaps
      query={{
        apikey: '92659bc7-f871-4646-9da3-b90f42da0c4c',
        load:
          'Map,Placemark,projection.Cartesian,MapType,Layer,layer.storage,mapType.storage'
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
                iconCaption: `${s.name}, ${s.age}`
              }}
              onClick={() => {
                navigate(`/stories/${s.slug}`)
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
  height: calc(100vh - 100px);
`;
