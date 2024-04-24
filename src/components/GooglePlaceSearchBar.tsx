import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export type GooglePlaceSearchBarProps = {
  onChange?: (value: string) => void;
  fetchPlaces?: () => void;
};
const GooglePlaceSearchBar = ({
  onChange = () => {},
  fetchPlaces = () => {},
}: GooglePlaceSearchBarProps) => {
  return (
    <div className="flex gap-4">
      <InputText
        type="search"
        id="location-input"
        placeholder="Ingresa un lugar"
        className="w-[450px]"
        onChange={(e) => onChange(e.target.value)}
      />
      <Button label="Buscar" onClick={fetchPlaces} />
    </div>
  );
};

export default GooglePlaceSearchBar;
