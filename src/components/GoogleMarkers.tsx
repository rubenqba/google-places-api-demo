import { GoogleLocation } from "@model/places";
import { Marker, useGoogleMap } from "@react-google-maps/api";
import React, { useEffect } from "react";

export type GoogleMarkersProps = {
  places?: GoogleLocation[];
  enableBounds?: boolean;
};
const GoogleMarkers = ({ places = [], enableBounds = true }: GoogleMarkersProps) => {
  const map = useGoogleMap();

  const updateBounds = (places: GoogleLocation[]) => {
    if (map && enableBounds) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) =>
        bounds.extend({
          lat: place.location.latitude,
          lng: place.location.longitude,
        })
      );
      console.log("updating map bounds", bounds);
      map.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (map) {
      updateBounds(places);
    }
  }, [map, places]);

  return places.map((place) => (
    <Marker
      key={place.id}
      position={{
        lat: place.location.latitude,
        lng: place.location.longitude,
      }}
    />
  ));
};

GoogleMarkers.propTypes = {};

export default GoogleMarkers;
