import { useState, useEffect } from "react";

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
  useEffect(() => {
    async function getPos() {
      const deviceGeoLocation = navigator.geolocation;
      if (!deviceGeoLocation) {
        return setError("Cannot access geolocation");
      }
      await promisifiedGeoLocation()
        .then(({ coords }) => onChange({ coords }))
        .catch(error => onError(error));
    }
    getPos();
  }, []);

  return { ...position, error };
};
