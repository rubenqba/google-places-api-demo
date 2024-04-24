
export type GooglePlacePredictionMatchOffset = {
  endOffset: number;
}

export type GooglePlacePredictionMatch = {
  text: string;
  matches: GooglePlacePredictionMatchOffset[];
};

export type GooglePlacePredictionText = {
  text: string;
};

export type GooglePlacePrediction = {
  place: string;
  placeId: string;
  text: GooglePlacePredictionMatch;
  structuredFormat: {
    mainText: GooglePlacePredictionMatch;
    secondaryText: GooglePlacePredictionText;
  },
  types: string[]
}
export type GoogleSuggestion = {
  placePrediction: GooglePlacePrediction;
};

export type GoogleSuggestions = {
  suggestions: GoogleSuggestion[];
}