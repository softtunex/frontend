// src/App.tsx
import React, { useEffect, useState } from "react";
import { detectDevice, DeviceType } from "./deviceDetection";
import WindowsDesktop from "./components/Windows/WindowsDesktop";
import MacDesktop from "./components/MacOS/MacDesktop";
import MobileInterface from "./components/Mobile/MobileInterface";
import { Icon } from "@iconify/react";
import "./App.css";

const App: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");
  const [weather, setWeather] = useState({
    temperature: 29,
    condition: "Patchy light rain with thunder",
    high: 30,
    low: 28,
    forecast: [
      { day: 18, temperature: 29, condition: "Sunny" },
      { day: 19, temperature: 29, condition: "Sunny" },
      { day: 20, temperature: 29, condition: "Sunny" },
      { day: 21, temperature: 29, condition: "Sunny" },
      { day: 22, temperature: 28, condition: "Cloudy" },
      { day: 23, temperature: 29, condition: "Cloudy" },
    ],
  });

  useEffect(() => {
    // Detect the device type on mount
    const detected = detectDevice();
    setDeviceType(detected);

    // You could also add API call for real weather data here
  }, []);

  return (
    <div className="portfolio-app">
      {deviceType === "windows" && <WindowsDesktop weather={weather} />}
      {deviceType === "macos" && <MacDesktop weather={weather} />}
      {(deviceType === "ios" || deviceType === "android") && (
        <MobileInterface
          deviceType={deviceType as "ios" | "android"}
          weather={weather}
        />
      )}
      {deviceType === "unknown" && (
        <div className="unknown-device">
          <h1>Welcome to My Adaptive Portfolio</h1>
          <p>
            Your device type couldn't be automatically detected. The portfolio
            interface will adapt based on your device.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
