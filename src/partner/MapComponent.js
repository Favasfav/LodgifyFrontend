import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MapComponent = ({ location, setLocation }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmF2YXNrIiwiYSI6ImNsbzRoY3k0cDAxa3gycWxhcHNzNmNpOTEifQ.0k3SEICCKB2cLxFn2xZLXQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.25948, 37.87221],
      zoom: 12,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([-122.25948, 37.87221])
      .addTo(map);

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search for places',
    });

    map.addControl(geocoder);

    map.on('load', () => {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#448ee4',
        },
      });

      geocoder.on('result', (event) => {
        const { coordinates, place_name } = event.result;
        setLocation({
          coordinates,
          placeName: place_name,
        });
        map.getSource('single-point').setData(event.result.geometry);
      });
    });

    return () => map.remove();
  }, [setLocation]);

  return (
    <div>
      <div id="map"  style={{ position: 'absolute', top: 90, bottom: 90, width: '50%' }} />
      <button onClick={() => console.log(location)}>Search</button>
    </div>
  );
};

export default MapComponent;
