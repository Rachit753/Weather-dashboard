import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { fetchWeather } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";

function CurrentWeather() {
  const { latitude, longitude, error } = useLocation();
  const [weather, setWeather] = useState(null);

  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => {
    if (unit === "F") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  const currentTemp = convertTemp(weather?.hourly?.temperature_2m?.[0]);
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
      temperature: convertTemp(weather.hourly.temperature_2m[index]),
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

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Switch to °{unit === "C" ? "F" : "C"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <WeatherCard
              title="Temperature"
              value={currentTemp?.toFixed(1)}
              unit={`°${unit}`}
            />
            <WeatherCard title="Humidity" value={humidity} unit="%" />
            <WeatherCard title="Precipitation" value={precipitation} unit="mm" />
          </div>

          <div className="space-y-8">
            <WeatherChart
              data={chartData}
              dataKey="temperature"
              title={`Temperature (°${unit})`}
            />
            <WeatherChart
              data={chartData}
              dataKey="humidity"
              title="Humidity (%)"
            />
            <WeatherChart
              data={chartData}
              dataKey="precipitation"
              title="Precipitation (mm)"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;