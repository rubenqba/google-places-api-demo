"use client";
import React, { useEffect } from "react";
import GooglePlaceSearchBar from "@component/GooglePlaceSearchBar";
import GoogleMapContainer from "@component/GoogleMapContainer";
import { useGooglePlaces } from "@hook/useGooglePlaces";
import GoogleLocationContainer from "./GoogleLocationContainer";
import { CountryID } from "@model/countries";
import { useGoogleCountryLocation } from "@hook/useGoogleCountryLocation";
import { useGoogleAutocomplete } from "@hook/useGoogleAutocomplete";
import { GoogleSuggestion } from "@model/autocomplete";

export type GooglePlacesProps = {
  countryId: CountryID;
  className?: string;
};

const GooglePlaces = ({ countryId, className }: GooglePlacesProps) => {
  const { running, places, lookupPlaces, setQuery } = useGooglePlaces();

  const { lookupCountry, name } = useGoogleCountryLocation();
  const { autocompletePlaces } = useGoogleAutocomplete();
  useEffect(() => {
    if (name === undefined || name.id !== countryId) {
      console.log("getting country location...");
      lookupCountry(countryId);
    } else {
      console.log(`country location selected: ${name.displayName}`);
    }
  }, [name, countryId, lookupCountry]);

  const autocomplete = async (
    query: string
  ): Promise<GoogleSuggestion[]> => {
    return autocompletePlaces(query, countryId).catch((error) => {
      console.error(error);
      return [];
    });
  };

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold">Buscar Lugar en el Mapa</h1>
      <GooglePlaceSearchBar
        onChange={setQuery}
        searchAction={() => lookupPlaces(countryId)}
        enableAutocomplete
        autocompleteAction={autocomplete}
      />
      <div className="flex gap-4">
        <GoogleMapContainer places={places} />
        <GoogleLocationContainer places={places} isLoading={running} />
      </div>
    </div>
  );
};

export default GooglePlaces;
