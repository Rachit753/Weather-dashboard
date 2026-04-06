function WeatherCard({ title, value, unit }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md">
      <h2 className="text-sm text-gray-400">{title}</h2>
      <p className="text-xl font-bold mt-2">
        {value} {unit}
      </p>
    </div>
  );
}

export default WeatherCard;