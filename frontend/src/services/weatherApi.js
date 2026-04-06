export async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,uv_index`
);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}

export async function fetchAirQuality(lat, lon) {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Air Quality API Error:", err);
    return null;
  }
}