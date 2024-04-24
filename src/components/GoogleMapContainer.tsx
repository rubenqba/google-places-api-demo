"use client";
import React, { useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import env from "@config/env";
import { ProgressSpinner } from "primereact/progressspinner";
import GoogleMarkers from "@component/GoogleMarkers";
import { GoogleLocation } from "@model/places";
import { useGoogleCountryLocation } from "@hook/useGoogleCountryLocation";

export type GoogleMapContainerProps = {
  places?: GoogleLocation[];
};

const GoogleMapContainer = ({ places = [] }: GoogleMapContainerProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: useMemo(() => ["places"], []),
  });
  const { country, zoom } = useGoogleCountryLocation();

  const mapCenter = useMemo(() => {
    return country
      ? {
          lat: country.location.latitude,
          lng: country.location.longitude,
        }
      : { lat: 0, lng: 0 };
  }, [country]);

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "600px",
        }}
        center={mapCenter}
        zoom={zoom}
        options={{
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
          },
        }}
      >
        {places.length == 0 ? (
          <GoogleMarkers places={country ? [country] : []} enableBounds={false} />
        ) : (
          <GoogleMarkers places={places} />
        )}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <ProgressSpinner />;
};

export default React.memo(GoogleMapContainer);