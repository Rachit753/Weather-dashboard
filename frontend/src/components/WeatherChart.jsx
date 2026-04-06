import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeatherChart({ data, dataKey, title, unit }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-6">
      <h2 className="text-white mb-4">{title}</h2>

      <div className="w-full h-64 overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherChart;