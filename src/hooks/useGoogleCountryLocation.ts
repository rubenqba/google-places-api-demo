import {
  GoogleLocationContext,
  GoogleLocationContextType,
} from "@component/GoogleLocationProvider";
import { useContext, useMemo } from "react";
import invariant from "invariant";

export const useGoogleCountryLocation = () => {
  const context = useContext<GoogleLocationContextType | null>(
    GoogleLocationContext
  );

  invariant(
    !!context,
    "useGoogleCountry needs a GoogleLocationProvider available up in the tree"
  );

  const { countryName, country, getCountryZoom, getCountryLocation } = context;

  const zoom = useMemo(() => (country ? getCountryZoom() : 0), [country, getCountryZoom]);
  return { name: countryName, country, zoom, lookupCountry: getCountryLocation };
};
