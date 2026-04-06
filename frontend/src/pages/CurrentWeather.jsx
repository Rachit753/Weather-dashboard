import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";

function CurrentWeather() {
  const { latitude, longitude, error } = useLocation();
  const [weather, setWeather] = useState(null);
  const currentTemp = weather?.hourly?.temperature_2m?.[0];
  const humidity = weather?.hourly?.relativehumidity_2m?.[0];
  const precipitation = weather?.hourly?.precipitation?.[0];

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude).then((data) => {
        console.log("Weather Data:", data);
        setWeather(data);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className="max-w-6xl mx-auto p-4">
  <h1 className="text-2xl font-bold text-center mb-6">
    Current Weather
  </h1>

  {!weather && <p className="text-center">Loading...</p>}

  {weather && (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <WeatherCard title="Temperature" value={currentTemp} unit="°C" />
      <WeatherCard title="Humidity" value={humidity} unit="%" />
      <WeatherCard title="Precipitation" value={precipitation} unit="mm" />
    </div>
  )}
</div>
  );
}

export default CurrentWeather;