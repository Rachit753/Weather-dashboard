import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { fetchWeather } from "../services/weatherApi";

function CurrentWeather() {
  const { latitude, longitude, error } = useLocation();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude).then((data) => {
        console.log("Weather Data:", data);
        setWeather(data);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="max-w-6xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold">Current Weather</h1>

      {!latitude && !error && <p>Getting location...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && <p className="mt-4">Data fetched successfully ✅</p>}
    </div>
  );
}

export default CurrentWeather;