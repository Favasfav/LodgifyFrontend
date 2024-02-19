import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; 

const LocationSearch = ({ onLocationSelect }) => {
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [maplocation, setMapLocation] = useState("");

  useEffect(() => {
    if (!geocoderRef.current) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: 'pk.eyJ1IjoiZmF2YXNrIiwiYSI6ImNsbzRoY3k0cDAxa3gycWxhcHNzNmNpOTEifQ.0k3SEICCKB2cLxFn2xZLXQ',
        mapboxgl: mapboxgl,
      });

      geocoderRef.current.addTo(geocoderContainerRef.current);

      geocoderRef.current.on('result', (event) => {
        console.log('Selected location:', event.result);
        onLocationSelect(event.result);
      });
    }
  }, []);

  useEffect(() => {
    // Hide the search icon
    const geocoderInput = document.querySelector('.mapboxgl-ctrl-geocoder input[type="text"]');
    if (geocoderInput) {
      geocoderInput.classList.add('hide-icon');
    }
  }, []);

  return (
    <div className="flex-1 ">
      <label htmlFor="pickUpLocation" className="text-blue-500">
        Pick up location
      </label>
      <div className="relative h-12 rounded-[4px]">
        <input
          type="text"
          id="pickUpLocation"
          onChange={(e) => { setMapLocation(e.target.value) }}
          placeholder=""
          className="absolute bottom-0 left-0 text-gray-500 placeholder-gray-600 w-full border h-full rounded-[4px] border-gray-300 py-2 sm:py-[14px] pl-4 pr-9 focus:ring-blue-500 focus:border-blue-500"
        />
        <div ref={geocoderContainerRef} className="geocoder-container"></div>
      </div>
      <style>{`
        /* Custom CSS to hide the search icon */
        .mapboxgl-ctrl-geocoder .geocoder-icon-search {
          display: none !important;
        }

        /* Optionally, you can add a background image for the input field */
        .mapboxgl-ctrl-geocoder input[type="text"] {
          background-image: url('path/to/your-custom-icon.png');
          /* Adjust the padding to accommodate the icon */
          padding-left: 30px; /* Adjust as needed */
          background-position: 10px center; /* Adjust position as needed */
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
};

export default LocationSearch;
