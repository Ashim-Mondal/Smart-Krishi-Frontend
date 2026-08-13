import { useEffect, useState } from "react";
import {
  Sun,
  Droplets,
  Wind,
  Cloud,
  CloudRain,
  CloudSun,
  CloudLightning,
  Snowflake,
  Loader2,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
}

interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // -----------------------------------------
  // Kolkata coordinates
  // -----------------------------------------

  const latitude = 22.5726;
  const longitude = 88.3639;

  // -----------------------------------------
  // Weather description
  // -----------------------------------------

  const getWeatherInfo = (weatherCode: number, isDay: boolean) => {
    if (weatherCode === 0) {
      return {
        condition: "Clear sky",
        icon: isDay ? <Sun size={24} /> : <CloudSun size={24} />,
      };
    }

    if (weatherCode === 1 || weatherCode === 2) {
      return {
        condition: weatherCode === 1 ? "Mainly clear" : "Partly cloudy",
        icon: isDay ? <CloudSun size={24} /> : <Cloud size={24} />,
      };
    }

    if (weatherCode === 3) {
      return {
        condition: "Overcast",
        icon: <Cloud size={24} />,
      };
    }

    if (weatherCode === 45 || weatherCode === 48) {
      return {
        condition: "Foggy",
        icon: <Cloud size={24} />,
      };
    }

    if (
      weatherCode === 51 ||
      weatherCode === 53 ||
      weatherCode === 55 ||
      weatherCode === 56 ||
      weatherCode === 57
    ) {
      return {
        condition: "Drizzle",
        icon: <CloudRain size={24} />,
      };
    }

    if (
      weatherCode === 61 ||
      weatherCode === 63 ||
      weatherCode === 65 ||
      weatherCode === 66 ||
      weatherCode === 67
    ) {
      return {
        condition: "Rain",
        icon: <CloudRain size={24} />,
      };
    }

    if (
      weatherCode === 71 ||
      weatherCode === 73 ||
      weatherCode === 75 ||
      weatherCode === 77
    ) {
      return {
        condition: "Snow",
        icon: <Snowflake size={24} />,
      };
    }

    if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
      return {
        condition: "Rain showers",
        icon: <CloudRain size={24} />,
      };
    }

    if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      return {
        condition: "Thunderstorm",
        icon: <CloudLightning size={24} />,
      };
    }

    return {
      condition: "Unknown",
      icon: <Cloud size={24} />,
    };
  };

  // -----------------------------------------
  // Fetch weather
  // -----------------------------------------

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day` +
        `&timezone=Asia%2FKolkata`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data: WeatherResponse = await response.json();

      setWeather({
        temperature: data.current.temperature_2m,

        humidity: data.current.relative_humidity_2m,

        windSpeed: data.current.wind_speed_10m,

        weatherCode: data.current.weather_code,

        isDay: data.current.is_day === 1,
      });
    } catch (error) {
      console.error("Weather API error:", error);

      setError("Unable to load weather.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Load weather
  // -----------------------------------------

  useEffect(() => {
    fetchWeather();

    // Refresh weather every 30 minutes
    const interval = setInterval(
      () => {
        fetchWeather();
      },
      30 * 60 * 1000,
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  // -----------------------------------------
  // Loading UI
  // -----------------------------------------

  if (loading) {
    return (
      <div className="card p-5 h-full">
        <h3 className="text-sm font-bold text-ink mb-3">Weather Today</h3>

        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-primary" />

          <span className="ml-2 text-sm text-muted">Loading weather...</span>
        </div>
      </div>
    );
  }

  // -----------------------------------------
  // Error UI
  // -----------------------------------------

  if (error || !weather) {
    return (
      <div className="card p-5 h-full">
        <h3 className="text-sm font-bold text-ink mb-3">Weather Today</h3>

        <div className="text-sm text-red-500">
          {error || "Weather unavailable"}
        </div>

        <button
          onClick={fetchWeather}
          className="text-xs font-semibold text-primary mt-2 hover:text-primary-dark"
        >
          Try Again
        </button>
      </div>
    );
  }

  // -----------------------------------------
  // Weather information
  // -----------------------------------------

  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay);

  return (
    <div className="card p-5 h-full">
      {/* Header */}

      <h3 className="text-sm font-bold text-ink mb-3">Weather Today</h3>

      {/* Main Weather */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Weather Icon */}

          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-warning">
            {weatherInfo.icon}
          </div>

          {/* Temperature */}

          <div>
            <p className="text-2xl font-extrabold text-ink leading-none">
              {Math.round(weather.temperature)}
              °C
            </p>

            <p className="text-xs text-muted mt-1">{weatherInfo.condition}</p>
          </div>
        </div>

        {/* Refresh */}

        <button
          onClick={fetchWeather}
          className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Weather Details */}

      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-border text-xs text-muted">
        {/* Humidity */}

        <span className="flex items-center gap-1.5">
          <Droplets size={13} className="text-primary" />
          Humidity {weather.humidity}%
        </span>

        {/* Wind */}

        <span className="flex items-center gap-1.5">
          <Wind size={13} className="text-primary" />
          {Math.round(weather.windSpeed)} km/h
        </span>
      </div>

      {/* Location */}

      <p className="text-[10px] text-muted mt-3">Kolkata, West Bengal</p>

      {/* Attribution */}

      <p className="text-[10px] text-muted mt-1">Weather data by Open-Meteo</p>
    </div>
  );
}
