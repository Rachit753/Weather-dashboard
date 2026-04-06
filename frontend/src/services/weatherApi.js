export async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    return null;
  }
}