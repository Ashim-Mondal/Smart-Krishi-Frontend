import { Sun, Droplets, Wind } from "lucide-react";
import { weather } from "../../data/mockData";

export default function WeatherCard() {
  return (
    <div className="card p-5 h-full">
      <h3 className="text-sm font-bold text-ink mb-3">Weather Today</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center text-warning">
            <Sun size={24} />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-ink leading-none">{weather.tempC}°C</p>
            <p className="text-xs text-muted mt-1">{weather.condition}</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
          {weather.tomorrow}
        </button>
      </div>
      <div className="flex items-center gap-5 mt-4 pt-4 border-t border-border text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Droplets size={13} className="text-primary" />
          Humidity {weather.humidity}%
        </span>
        <span className="flex items-center gap-1.5">
          <Wind size={13} className="text-primary" />
          {weather.windKmh} km/h
        </span>
      </div>
    </div>
  );
}
