"use client";
import { useState } from "react";
import { GoogleLocation, GooglePlaceResponse } from "@model/places";
import { CountryID } from "@model/countries";

export const useGooglePlaces = () => {
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [places, setPlaces] = useState<GoogleLocation[]>([]);

  const fetchPlaces = async (
    query: string,
    id: CountryID
  ): Promise<GoogleLocation[]> => {
    const search = query.trim();
    if (search.length) {
      console.log(`searching places similar to '${search}' in country '${id}'`);
      return fetch("/api/places/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textQuery: search,
          languageCode: "ES",
          regionCode: id,
        }),
      }).then((res) => {
        return res.json().then((data: GooglePlaceResponse) => data.places);
      });
    }
    return Promise.reject(new Error("empty query"));
  };

  const lookupPlaces = async (id: CountryID) => {
    setRunning(true);
    try {
      const places = await fetchPlaces(query, id);
      setPlaces(places);
    } catch (error) {
      console.error(error);
    } finally {
      setRunning(false);
    }
  };

  return {
    query,
    setQuery,
    running,
    places,
    lookupPlaces,
    fetchPlaces,
  };
};
