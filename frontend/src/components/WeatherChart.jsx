import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function WeatherChart({ data, dataKey, title, scale = 80 }) {

  const calculatedWidth = Math.max(
    data.length * scale,
    window.innerWidth * 1.5 
  );

  const xKey =
    data?.[0]?.formattedTime
      ? "formattedTime"
      : data?.[0]?.date
      ? "date"
      : "time";

  return (
    <div className="bg-gray-800 p-4 rounded-xl mt-6">
      <h2 className="text-white mb-4">{title}</h2>

      <div className="w-full overflow-x-auto">
        <div
          style={{
            width: calculatedWidth,
            height: 300,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              
              <XAxis
                dataKey={xKey}
                interval={Math.ceil(data.length / 10)}
              />

              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  color: "#fff",
                }}
                formatter={(value, name) => [`${value}`, name]}
              />

              <Legend />

              {Array.isArray(dataKey) ? (
                dataKey.map((key, i) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={
                      i === 0
                        ? "#3b82f6" // blue
                        : i === 1
                        ? "#10b981" // green
                        : "#f59e0b" // yellow
                    }
                    dot={false}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="#3b82f6"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WeatherChart;