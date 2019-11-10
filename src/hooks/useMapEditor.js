import React from 'react';
import { Polyline, Circle } from 'react-yandex-maps';

export default function useMapEditor(map, convertCoords) {
  if (typeof window === 'undefined' || window.location.search !== '?edit') {
    return null;
  }

  const [poly, setPoly] = React.useState([[]]);

  React.useEffect(() => {
    if (map) {
      const handleClick = e => {
        const coords = e.get('coords');
        const last = poly[poly.length - 1];
        poly[poly.length - 1] = [...last, coords];
        setPoly([...poly]);
      };
      map.events.add('click', handleClick);

      return () => map.events.remove('click', handleClick);
    }
  }, [map, poly]);

  console.log(
    JSON.stringify(
      poly.map(line =>
        line.map(convertCoords).map(c => {
          return [
            parseFloat(c[0].toPrecision(6)),
            parseFloat(c[1].toPrecision(6))
          ];
        })
      )
    )
  );

  React.useEffect(() => {
    const handleKeyDown = e => {
      console.log(e);
      switch (e.code) {
        case 'KeyZ':
          if (e.metaKey) {
            const last = poly[poly.length - 1];
            last.pop();
            poly[poly.length - 1] = [...last];
            setPoly([...poly]);
          }
          break;
        case 'Equal':
          if (e.shiftKey) {
            setPoly([...poly, []]);
          }
          break;
        case 'KeyD':
          if (e.altKey) {
            poly.pop();
            setPoly(poly.length === 0 ? [[]] : [...poly]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [poly, setPoly]);

  return poly.map((line, idx) => {
    const last = idx === poly.length - 1;
    return line.length === 1 ? (
      <Circle
        key={idx}
        geometry={[line[0], 40]}
        options={{ strokeColor: last ? '#000' : '#00F', strokeWidth: 2 }}
      />
    ) : (
      <Polyline
        key={idx}
        geometry={line}
        options={{ strokeColor: last ? '#000' : '#00F', strokeWidth: 2 }}
      />
    );
  });
}
