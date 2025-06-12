// src/components/ImpressionsMap.jsx
import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export default function ImpressionsMap() {
  return (
    <ComposableMap projectionConfig={{ scale: 150 }} style={{ width: '100%', height: '100%' }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#2b2b2b" stroke="#555" />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}
