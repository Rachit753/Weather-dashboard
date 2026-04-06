import { useEffect, useState } from "react";
import useLocation from "../hooks/useLocation";
import { fetchWeather, fetchAirQuality } from "../services/weatherApi";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";

function CurrentWeather() {
  const { latitude, longitude, error } = useLocation();
  const [weather, setWeather] = useState(null);
  const [airData, setAirData] = useState(null);

  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => {
    if (unit === "F") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  const currentIndex = weather?.hourly?.time?.findIndex(
    (t) => new Date(t).getHours() === new Date().getHours()
  );
  const index = currentIndex !== -1 ? currentIndex : 0;

  const currentTemp = convertTemp(weather?.hourly?.temperature_2m?.[index]);
  const humidity = weather?.hourly?.relativehumidity_2m?.[index];
  const precipitation = weather?.hourly?.precipitation?.[index];
  const windSpeed = weather?.hourly?.windspeed_10m?.[index];
  const uvIndex = weather?.hourly?.uv_index?.[index];

  const sunrise = weather?.daily?.sunrise?.[0];
  const sunset = weather?.daily?.sunset?.[0];

  const tempMax = weather?.daily?.temperature_2m_max?.[0];
  const tempMin = weather?.daily?.temperature_2m_min?.[0];

  const formatTime = (time) =>
    time
      ? new Date(time).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--";

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude).then(setWeather);
      fetchAirQuality(latitude, longitude).then(setAirData);
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
      wind: weather.hourly.windspeed_10m[index],
      visibility: weather.hourly.visibility[index],
    })) || [];

  const airChartData =
    airData?.hourly?.time?.map((time, index) => ({
      time: new Date(time).toLocaleString("en-IN", {
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      pm10: airData.hourly.pm10[index],
      pm25: airData.hourly.pm2_5[index],
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
            <div className="bg-gray-800 p-4 rounded-xl">
              <p className="text-gray-400 text-sm mb-2">Temperature Range</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Max</p>
                  <p className="text-lg font-semibold">
                    {convertTemp(tempMax)?.toFixed(1)}°{unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Min</p>
                  <p className="text-lg font-semibold">
                    {convertTemp(tempMin)?.toFixed(1)}°{unit}
                  </p>
                </div>
              </div>
            </div>
            <WeatherCard title="Humidity" value={humidity} unit="%" />
            <WeatherCard title="Precipitation" value={precipitation} unit="mm" />
            <WeatherCard title="Wind Speed" value={windSpeed} unit="km/h" />
            <WeatherCard title="UV Index" value={uvIndex} unit="" />
            <WeatherCard
              title="Sunrise"
              value={formatTime(sunrise)}
              unit=""
            />
            <WeatherCard
              title="Sunset"
              value={formatTime(sunset)}
              unit=""
            />
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

            <WeatherChart
              data={chartData}
              dataKey="wind"
              title="Wind Speed (km/h)"
            />

            <WeatherChart
              data={chartData}
              dataKey="visibility"
              title="Visibility (m)"
            />

            {airData && (
              <WeatherChart
                data={airChartData}
                dataKey={["pm10", "pm25"]}
                title="PM10 & PM2.5"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;