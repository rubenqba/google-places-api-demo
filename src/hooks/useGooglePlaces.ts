"use client";
import { useState } from "react";
import { GoogleLocation, GooglePlaceResponse } from "@model/places";
import { CountryID } from "@model/countries";

export const useGooglePlaces = () => {
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [places, setPlaces] = useState<GoogleLocation[]>([]);

  const fetchPlaces = async (id: CountryID) => {
    if (query.length > 0) {
      console.log(`searching: ${query}`);
      setRunning(true);
      const res = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textQuery: query,
          languageCode: "ES",
          regionCode: id,
        }),
      });

      if (res.ok) {
        const data: GooglePlaceResponse = await res.json();
        setPlaces(data.places);
      }
      setRunning(false);
    }
  };

  return {
    query,
    setQuery,
    running,
    places,
    fetchPlaces,
  };
};
