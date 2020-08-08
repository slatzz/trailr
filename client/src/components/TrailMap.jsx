import React, {useState, useEffect} from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from 'react-google-maps';

const Map = ({location, id}) => {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [trailPhotos, setTrailsPhotos] = useState({});

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        setSelectedTrail(null);
      }
    };
    // setTrailsPhotos(fakeData);
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <GoogleMap defaultZoom={12} defaultCenter={location}>
      <Marker key={id} position={location} />

      {selectedTrail && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedTrail(null);
          }}
          position={{
            lat: +selectedTrail.lat,
            lng: +selectedTrail.lon,
          }}
        >
          <div>
            <h2>{selectedTrail.name}</h2>
            <p>{selectedTrail.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;