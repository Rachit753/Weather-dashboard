export async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,visibility,windspeed_10m,uv_index&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&timezone=auto`
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
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`
);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Air Quality API Error:", err);
    return null;
  }
}

export async function fetchHistorical(lat, lon, start, end) {
  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,windspeed_10m_max`
    );

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}