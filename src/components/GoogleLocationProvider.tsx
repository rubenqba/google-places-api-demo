import { Country, CountryID, SUPPORTED_COUNTRIES } from "@model/countries";
import { GoogleLocation, GooglePlaceResponse } from "@model/places";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export type GoogleLocationContextType = {
  countryName?: Country;
  country?: GoogleLocation;
  getCountryLocation: (country: string) => Promise<void>;
  getCountryZoom: () => number;
};

export const GoogleLocationContext =
  createContext<GoogleLocationContextType | null>(null);

interface GoogleLocationProviderProps {
  children: ReactNode;
}
export const GoogleLocationProvider = ({
  children,
}: GoogleLocationProviderProps) => {
  const [countryName, setCountryName] = useState<Country>();
  const [country, setCountry] = useState<GoogleLocation>();

  const getCountryLocation = useCallback(
    (country: string) => {

      const selected = SUPPORTED_COUNTRIES.find((c) => c.id === country);
      if (selected) {
        setCountryName(selected);
        console.log(`searching country location: ${country}`);
        return fetch("/api/places/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            textQuery: selected.displayName,
            languageCode: "ES",
            includedType: "country",
          }),
        })
          .then((res) => {
            if (res.ok) {
              return res.json().then((data: GooglePlaceResponse) => {
                if (data.places.length > 0) {
                  return data.places[0];
                }
                throw new Error(`Not found any '${country}' location`);
              });
            }
            throw new Error(`Failed to get '${country}' location`);
          })
          .then(setCountry)
          .catch((err) => {
            console.error(err);
            setCountry(undefined);
          });
      }
      return Promise.reject(new Error(`Not found any '${country}' location`));
    },
    [setCountry]
  );

  const getCountryZoom = useCallback(() => {
    const getZoomLevel = (country: CountryID | string): number => {
      switch (country) {
        case "MX":
          return 5; // Nivel de zoom para México
        case "US":
          return 4; // Nivel de zoom para Estados Unidos
        case "CA":
          return 4; // Nivel de zoom para Canadá
        case "CO":
          return 6; // Nivel de zoom para Colombia
        case "CU":
          return 7; // Nivel de zoom para Colombia
        default:
          return 3; // Nivel de zoom por defecto para otros países
      }
    };
    if (countryName) {
      const zoom = getZoomLevel(countryName.id);
      console.log(`country zoom (${countryName.displayName}): ${zoom}`);
      return zoom;
    }
    return -1;
  }, [countryName]);

  const contextValue: GoogleLocationContextType = useMemo(
    () => ({
      countryName,
      country,
      getCountryLocation,
      getCountryZoom,
    }),
    [countryName, country, getCountryLocation, getCountryZoom]
  );

  return (
    <GoogleLocationContext.Provider value={contextValue}>
      {children}
    </GoogleLocationContext.Provider>
  );
};
