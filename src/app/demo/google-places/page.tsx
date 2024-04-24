"use client";
import { GoogleLocationProvider } from "@component/GoogleLocationProvider";
import GooglePlaces from "@component/GooglePlaces";

export default function GooglePlacesPage() {
  return (
    <GoogleLocationProvider>
      <GooglePlaces
        countryId="MX"
        className="w-full border-2 border-dotted flex flex-col gap-4"
      />
    </GoogleLocationProvider>
  );
}
