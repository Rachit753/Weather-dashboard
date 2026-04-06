import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeatherChart({ data, dataKey, title }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-6">
      <h2 className="text-white mb-4">{title}</h2>

      {/* Horizontal Scroll + Controlled Width */}
      <div className="w-full overflow-x-auto">
        <div
          className="min-w-[800px]"
          style={{
            width: Math.max(data.length * 30, 800),
            height: 300,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              
              {/* Smart X-Axis (prevents clutter) */}
              <XAxis
                dataKey="time"
                interval={Math.ceil(data.length / 10)}
              />

              <YAxis />

              {/* Improved Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#3b82f6"
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WeatherChart;