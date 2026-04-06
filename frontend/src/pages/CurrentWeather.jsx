import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";

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

  const chartData =
  weather?.hourly?.time?.map((time, index) => ({
    time: new Date(time).toLocaleString("en-IN", {
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperature: weather.hourly.temperature_2m[index],
    humidity: weather.hourly.relativehumidity_2m[index],
    precipitation: weather.hourly.precipitation[index],
  })) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold text-center mb-6">
    Current Weather
  </h1>

  {!weather && <p className="text-center">Loading...</p>}

  {weather && (
    <>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <WeatherCard title="Temperature" value={currentTemp} unit="°C" />
        <WeatherCard title="Humidity" value={humidity} unit="%" />
        <WeatherCard title="Precipitation" value={precipitation} unit="mm" />
      </div>

      {/* Charts */}
      <div className="space-y-8">
        <WeatherChart data={chartData} dataKey="temperature" title="Temperature (°C)" />
        <WeatherChart data={chartData} dataKey="humidity" title="Humidity (%)" />
        <WeatherChart data={chartData} dataKey="precipitation" title="Precipitation (mm)" />
      </div>
    </>
  )}
</div>
  );
}

export default CurrentWeather;