import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  fetchHistorical,
  fetchHistoricalAir,
} from "../services/weatherApi";
import useLocation from "../hooks/useLocation";
import WeatherChart from "../components/WeatherChart";

function HistoricalWeather() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { latitude, longitude } = useLocation();

  const [data, setData] = useState(null);
  const [airData, setAirData] = useState(null);

  useEffect(() => {
    if (latitude && longitude && startDate && endDate) {
      if (endDate - startDate > 2 * 365 * 24 * 60 * 60 * 1000) {
        alert("Select range within 2 years");
        return;
      }

      const format = (d) => d.toISOString().split("T")[0];

      fetchHistorical(
        latitude,
        longitude,
        format(startDate),
        format(endDate)
      ).then(setData);

      fetchHistoricalAir(
        latitude,
        longitude,
        format(startDate),
        format(endDate)
      ).then(setAirData);
    }
  }, [latitude, longitude, startDate, endDate]);

  const grouped = {};

  data?.hourly?.time?.forEach((time, i) => {
    const date = new Date(time).toISOString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = {
        temps: [],
        precipitation: 0,
        wind: [],
        windDir: [],
      };
    }

    grouped[date].temps.push(data.hourly.temperature_2m[i]);
    grouped[date].precipitation += data.hourly.precipitation[i];
    grouped[date].wind.push(data.hourly.windspeed_10m[i]);
    grouped[date].windDir.push(data.hourly.winddirection_10m[i]);
  });

  const getDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  const chartData = Object.keys(grouped).map((date) => {
    const d = grouped[date];

    const max = Math.max(...d.temps);
    const min = Math.min(...d.temps);
    const mean = d.temps.reduce((a, b) => a + b, 0) / d.temps.length;

    const windMax = Math.max(...d.wind);
    const avgWindDir =
      d.windDir.reduce((a, b) => a + b, 0) / d.windDir.length;

    return {
      date: new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      max,
      min,
      mean,
      precipitation: d.precipitation,
      windMax,
      windDir: avgWindDir,
      windDirection: getDirection(avgWindDir),
    };
  });

  const toDecimal = (time) =>
  new Date(time).getHours() +
  new Date(time).getMinutes() / 60;

const formatToTime = (time) =>
  new Date(time).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const sunChartData =
  data?.daily?.time?.map((date, i) => ({
    date: new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    sunrise: toDecimal(data.daily.sunrise[i]),   
    sunset: toDecimal(data.daily.sunset[i]),     
    sunriseLabel: formatToTime(data.daily.sunrise[i]), 
    sunsetLabel: formatToTime(data.daily.sunset[i]),   
  })) || [];

  const airChartData =
    airData?.hourly?.time?.map((time, i) => ({
      date: new Date(time).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      pm10: airData.hourly.pm10[i],
      pm25: airData.hourly.pm2_5[i],
    })) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Historical Weather
      </h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="p-2 rounded"
          maxDate={endDate || new Date()}
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="p-2 rounded"
          minDate={startDate}
          maxDate={new Date()}
        />
      </div>

      <p className="text-gray-400 text-sm text-center mb-4">
        Showing weather trends between selected dates
      </p>

      {data && (
        <>
          <WeatherChart
            data={chartData}
            dataKey={["max", "mean", "min"]}
            title="Temperature (Max / Mean / Min)"
            scale={30}
          />

          <WeatherChart
            data={sunChartData}
            dataKey={["sunrise", "sunset"]}
            title="Sunrise & Sunset (IST)"
            scale={140}
          />

          <WeatherChart
            data={chartData}
            dataKey="precipitation"
            title="Precipitation Total (mm)"
            scale={30}
          />

          <WeatherChart
            data={chartData}
            dataKey="windMax"
            title="Max Wind Speed"
            scale={30}
          />

          <div className="bg-gray-800 p-4 rounded-xl text-white">
            <p className="text-sm text-gray-400 mb-2">
              Dominant Wind Direction
            </p>
            <div className="flex flex-wrap gap-2">
              {chartData.map((d, i) => (
                <span key={i} className="bg-gray-700 px-2 py-1 rounded">
                  {d.date}: {d.windDirection}
                </span>
              ))}
            </div>
          </div>

          {airData && (
            <WeatherChart
              data={airChartData}
              dataKey={["pm10", "pm25"]}
              title="PM10 & PM2.5 Trends"
              scale={30}
            />
          )}
        </>
      )}
    </div>
  );
}

export default HistoricalWeather;