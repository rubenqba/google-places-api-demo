
export type GooglePoint = {
  latitude: number;
  longitude: number;
};

export type GoogleLocation = {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  location: GooglePoint;
};

export type GooglePlaceResponse = {
  places: GoogleLocation[];
}