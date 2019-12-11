import { useState } from "react";

const promisifiedGeoLocation = () =>
  new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject);
  });

// Based on Oleksii Trekhleb's implementation here: https://itnext.io/creating-react-useposition-hook-for-getting-browsers-geolocation-2f27fc1d96de

export const usePosition = () => {
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };
  const onError = error => {
    console.log(error);
    setError(error.message);
  };

  const getPosition = async () => {
    setIsLoading(true);
    const deviceGeoLocation = navigator.geolocation;

    if (!deviceGeoLocation) {
      return setError("Cannot access geolocation");
    }
    await promisifiedGeoLocation()
      .then(({ coords }) => {
        onChange({ coords });
        setIsLoading(false);
      })
      .catch(error => onError(error));
  };
  return { ...position, getPosition, isLoading, error };
};
