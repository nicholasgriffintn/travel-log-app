import React, { useState, useEffect } from 'react';
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl';

import { useSelector, useDispatch } from 'react-redux';

import LogEntryForm from './LogEntryForm';

const BaseMap = () => {
  const dispatch = useDispatch();

  const currentLocation = useSelector(
    (state) => state.location.currentLocation
  );
  const locationHistory = useSelector(
    (state) => state.location.locationHistory
  );
  const logEntries = useSelector((state) => state.location.logEntries);

  React.useEffect(() => {
    const fetchEntries = async () => {
      dispatch({ type: 'GET_LOCATION_LOGS' });
    };

    fetchEntries();
  }, []);

  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.4975,
    longitude: 0.1357,
    zoom: 3,
  });

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  const navControlStyle = {
    right: 10,
    top: 50,
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/nicholasgriffin-uk/ckopqdexf146r17o9spnz5rb8"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
        captureScroll={true}
        onGeolocate={(position) => {
          console.debug('Position changed => ', position);
          dispatch({ type: 'SET_LOCATION', payload: { location: position } });
        }}
      />
      <NavigationControl showCompass={false} style={navControlStyle} />
      {logEntries.map((entry) => (
        <React.Fragment key={entry.id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  // ...showPopup,
                  [entry.id]: true,
                })
              }
            >
              <svg
                className="marker yellow"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          {showPopup[entry.id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <div className="popup-header">
                  <h3>{entry.title}</h3>
                  <div className="popup-tag">{entry.status}</div>
                </div>
                <p>{entry.description}</p>
                {/* TODO: Add a posted by box */}
                {entry.images && entry.images.length > 0 && (
                  <div className="popup-images-gallery">
                    {entry.images.map((image) => {
                      <img src={entry.image} alt={entry.title} />;
                    })}
                  </div>
                )}
                {/* TODO: Add a rating box */}
                {/* TODO: Add a comments box */}
                <small>
                  Visited on: {new Date(entry.publishedAt).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
          >
            <div>
              <svg
                className="marker red"
                style={{
                  height: `${6 * viewport.zoom}px`,
                  width: `${6 * viewport.zoom}px`,
                }}
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path
                      d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default BaseMap;
