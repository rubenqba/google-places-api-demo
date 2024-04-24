export type CountryID = "MX" | "US" | "CA" | "CO" | "CU";
export type Country = {
  id: CountryID;
  displayName: string;
};

export const SUPPORTED_COUNTRIES: Country[] = [
  {
    id: "MX",
    displayName: "Mexico",
  },
  {
    id: "US",
    displayName: "USA",
  },
  {
    id: "CA",
    displayName: "Canada",
  },
  {
    id: "CO",
    displayName: "Colombia",
  },
  {
    id: "CU",
    displayName: "Cuba",
  },
];
