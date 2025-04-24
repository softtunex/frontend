// src/components/shared/MobileWeather.tsx
import React from "react";
import { Icon } from "@iconify/react";

interface WeatherData {
  temperature: number;
  condition: string;
  forecast: Array<{
    day: number;
    temperature: number;
    condition: string;
  }>;
}

// Function to get weather icon based on condition
const getWeatherIcon = (condition: string): string => {
  const conditionMap: Record<string, string> = {
    Clear: "mdi:weather-sunny",
    Sunny: "mdi:weather-sunny",
    Clouds: "mdi:weather-cloudy",
    Cloudy: "mdi:weather-cloudy",
    Rain: "mdi:weather-rainy",
    Drizzle: "mdi:weather-partly-rainy",
    Thunderstorm: "mdi:weather-lightning-rainy",
    Snow: "mdi:weather-snowy",
  };

  return conditionMap[condition] || "mdi:weather-partly-cloudy";
};

/**
 * Reusable Weather Widget component for both iOS and Android interfaces
 */
const MobileWeather: React.FC<{
  deviceType: "ios" | "android";
  weather: WeatherData;
}> = ({ deviceType, weather }) => {
  if (deviceType === "ios") {
    // iOS style horizontal forecast
    return (
      <div className="weather-widget mobile">
        <div className="forecast">
          {weather.forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="day">{day.day}</div>
              <div className="icon">
                <Icon
                  icon={getWeatherIcon(day.condition)}
                  width="22"
                  color="white"
                />
              </div>
              <div className="temp">{day.temperature}°</div>
            </div>
          ))}
        </div>
        <div className="label">Weather</div>
      </div>
    );
  } else {
    // Android style weather widget with current temperature focus
    return (
      <div className="weather-widget mobile">
        <div className="weather-header">
          <div>
            <div className="weather-location">
              <Icon
                icon="mdi:map-marker"
                width="16"
                style={{ marginRight: "4px" }}
              />
              Lagos
            </div>
            <div className="weather-condition">
              {weather.condition || "Partly cloudy"}
            </div>
          </div>
          <div className="weather-temp">{weather.temperature}°</div>
        </div>
        <div className="weather-forecast">
          {weather.forecast.slice(0, 4).map((day, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">
                {index === 0 ? "Today" : day.day}
              </div>
              <Icon
                icon={getWeatherIcon(day.condition)}
                width="20"
                color="white"
              />
              <div className="forecast-temp">{day.temperature}°</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default MobileWeather;
