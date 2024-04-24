import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from "primereact/autocomplete";
import { GoogleSuggestion } from "@model/autocomplete";

export type GooglePlaceSearchBarProps = {
  onChange?: (value: string) => void;
  searchAction?: () => void;
  enableAutocomplete?: boolean;
  autocompleteAction?: (query: string) => Promise<GoogleSuggestion[]>;
};

const GooglePlaceSearchBar = ({
  onChange = () => {},
  searchAction = () => {},
  enableAutocomplete = false,
  autocompleteAction,
}: GooglePlaceSearchBarProps) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<GoogleSuggestion[]>([]);

  const renderInputSearch = (allowAutocomplete: boolean) => {
    if (!allowAutocomplete) {
      return (
        <InputText
          type="search"
          id="location-input"
          placeholder="Ingresa un lugar"
          className="w-[450px]"
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }

    if (autocompleteAction === undefined) {
      throw new Error("AutocompleteAction is undefined");
    }

    const search = (event: AutoCompleteCompleteEvent) => {
      autocompleteAction(event.query.trim()).then(setSuggestions);
    };

    const itemTemplate = (item: GoogleSuggestion) => (
      <div>{item.placePrediction.text.text}</div>
    );

    const autocompleteValue = (event: AutoCompleteSelectEvent) => {
      const newValue: GoogleSuggestion = event.value;
      console.log(JSON.stringify(newValue, null, 2));
      setValue(newValue.placePrediction.text.text);
    };

    function isSuggestion(value: any): value is GoogleSuggestion {
      // Reemplaza 'someProperty' con una propiedad real de 'Model'
      return value && typeof value === "object" && "placePrediction" in value;
    }

    const updateValue = (event: AutoCompleteChangeEvent) => {
      const value = event.target.value;
      if (isSuggestion(value)) {
        const suggestion: GoogleSuggestion = value;
        const text = suggestion.placePrediction.text.text;
        setValue(text);
        onChange(text);
      } else if (typeof value === 'string') {
        setValue(value);
        onChange(value);
      }
    };

    return (
      <AutoComplete
        placeholder="Ingresa un lugar"
        inputClassName="w-[450px]"
        itemTemplate={itemTemplate}
        selectedItemTemplate={itemTemplate}
        suggestions={suggestions}
        completeMethod={search}
        delay={1000}
        value={value}
        onSelect={autocompleteValue}
        onChange={updateValue}
      />
    );
  };

  return (
    <div className="flex gap-4">
      {renderInputSearch(enableAutocomplete)}
      <Button label="Buscar" onClick={searchAction} />
    </div>
  );
};

export default GooglePlaceSearchBar;
