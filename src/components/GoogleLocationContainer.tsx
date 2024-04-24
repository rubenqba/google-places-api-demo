import { GoogleLocation } from "@model/places";
import { PrimeIcons } from "primereact/api";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import { FaBuilding, FaLocationDot } from "react-icons/fa6";

export type GoogleLocationContainerProps = {
  places: GoogleLocation[];
  isLoading?: boolean;
};
const GoogleLocationContainer = ({ places, isLoading = false }: GoogleLocationContainerProps) => {
  const renderPlaces = () => {
    return (
      <ol className="flex flex-col gap-3">
        {places.map((place) => (
          <li key={place.id} className="border p-3 rounded-md">
            <div>
              <div className="font-bold text-lg">{place.displayName.text}</div>
              <div className="flex gap-1 items-center">
                <FaBuilding />
                <span>{place.formattedAddress}</span>
              </div>
              <div className="flex gap-1 items-center text-sm">
                <FaLocationDot />
                <span>
                  ({place.location.latitude}, {place.location.longitude})
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    );
  };

  const skeleton = () => {
    return (
      <ol className="flex flex-col gap-3">
        <li key={"place.id"} className="border p-3 rounded-md">
          <div>
            <Skeleton width="15rem" />
            <Skeleton width="10rem" />
            <Skeleton width="5rem" />
          </div>
        </li>
      </ol>
    );
  };
  return (
    <div>
      {isLoading || places.length === 0 ? skeleton() : renderPlaces()}
    </div>
  );
};

GoogleLocationContainer.propTypes = {};

export default GoogleLocationContainer;
