"use client";
import { useState } from "react";
import { CountryID } from "@model/countries";
import { GoogleSuggestion, GoogleSuggestions } from "@model/autocomplete";

export const useGoogleAutocomplete = () => {
  const [running, setRunning] = useState(false);
  // const [suggestions, setSuggestions] = useState<GoogleSuggestion[]>([]);

  const autocompletePlaces = async (
    query: string,
    id: CountryID
  ): Promise<GoogleSuggestion[]> => {
    const search = query.trim();
    setRunning(true);
    if (search.length) {
      console.log(`searching places similar to '${search}' in country '${id}'`);
      return fetch("/api/places/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: search,
          languageCode: "es",
          regionCode: id,
        }),
      })
        .then((res) => {
          return res.json().then((data: GoogleSuggestions) => data.suggestions);
        })
        .finally(() => setRunning(false));
    }
    setRunning(false)
    return Promise.reject(new Error("empty query"));
  };

  return {
    running,
    autocompletePlaces,
  };
};
