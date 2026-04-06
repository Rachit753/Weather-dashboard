import { BrowserRouter, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import HistoricalWeather from "./pages/HistoricalWeather";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/weather-bg.jpg')`,
      }}
    >
      <div className="min-h-screen bg-black/70">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/historical" element={<HistoricalWeather />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;