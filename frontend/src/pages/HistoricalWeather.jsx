import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { fetchHistorical } from "../services/weatherApi";
import useLocation from "../hooks/useLocation";
import WeatherChart from "../components/WeatherChart";

function HistoricalWeather() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { latitude, longitude } = useLocation();
  const [data, setData] = useState(null);

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
    }
  }, [latitude, longitude, startDate, endDate]);

  const chartData =
    data?.daily?.time?.map((time, i) => ({
      date: new Date(time).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      max: data.daily.temperature_2m_max[i],
      min: data.daily.temperature_2m_min[i],
      mean: data.daily.temperature_2m_mean[i],
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

      <p className="text-gray-400 text-sm text-center mb-2">
        Showing temperature trends between selected dates
      </p>

      {data && (
        <WeatherChart
          data={chartData}
          dataKey={["max", "min", "mean"]}
          title="Temperature Trends"
        />
      )}
    </div>
  );
}

export default HistoricalWeather;