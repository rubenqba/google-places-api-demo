"use client";
import React, { useEffect } from "react";
import GooglePlaceSearchBar from "@component/GooglePlaceSearchBar";
import GoogleMapContainer from "@component/GoogleMapContainer";
import { useGooglePlaces } from "@hook/useGooglePlaces";
import GoogleLocationContainer from "./GoogleLocationContainer";
import { CountryID } from "@model/countries";
import { useGoogleCountryLocation } from "@hook/useGoogleCountryLocation";

export type GooglePlacesProps = {
  countryId: CountryID;
  className?: string;
};

const GooglePlaces = ({ countryId, className }: GooglePlacesProps) => {
  const { running, places, fetchPlaces, setQuery } = useGooglePlaces();

  const {lookupCountry, name} = useGoogleCountryLocation();
  useEffect(() => {
    if (name === undefined || name.id !== countryId) {
      console.log("getting country location...");
      lookupCountry(countryId);
    } else {
      console.log(`country location selected: ${name.displayName}`);
    }
  }, [name, countryId]);

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold">Buscar Lugar en el Mapa</h1>
      <GooglePlaceSearchBar onChange={setQuery} fetchPlaces={() => fetchPlaces(countryId)} />
      <div className="flex gap-4">
        <GoogleMapContainer places={places} />
        <GoogleLocationContainer places={places} isLoading={running} />
      </div>
    </div>
  );
};

export default GooglePlaces;
