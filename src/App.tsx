// Updated App.tsx
import React, { useEffect, useState } from "react";
import { detectDevice, DeviceType } from "./deviceDetection";
import WindowsDesktop from "./components/Windows/WindowsDesktop";
import MacDesktop from "./components/MacOS/MacDesktop";
import MobileInterface from "./components/Mobile/MobileInterface";
import UserGuide from "./components/UserGuide/UserGuide";
import { Icon } from "@iconify/react";
import { avatar } from "./shared/userConfig";
import "./App.css";
import "./Responsive.css";

const App: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");
  const [showGuide, setShowGuide] = useState(false);

  // Weather data
  const weather = {
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
  };

  useEffect(() => {
    const detected = detectDevice();
    setDeviceType(detected);

    const guideShown = localStorage.getItem("portfolioGuideShown");
    if (guideShown !== "true") {
      const timer = setTimeout(() => {
        setShowGuide(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const switchToMac = () => {
    setDeviceType("macos");
  };

  const switchToWindows = () => {
    setDeviceType("windows");
  };

  const handleGuideClose = () => {
    setShowGuide(false);
  };

  const renderHelpButton = () => {
    return (
      <button
        className="help-button"
        onClick={() => setShowGuide(true)}
        title="Show Guide"
      >
        <Icon icon="mdi:help-circle" width="24" />
      </button>
    );
  };

  return (
    <div className="portfolio-app">
      {deviceType === "windows" && (
        <WindowsDesktop weather={weather} onSwitchToMac={switchToMac} />
      )}

      {deviceType === "macos" && (
        <MacDesktop weather={weather} onSwitchToWindows={switchToWindows} />
      )}

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

      {showGuide && (
        <UserGuide
          deviceType={deviceType}
          onClose={handleGuideClose}
          avatarUrl={avatar} // Use shared config
        />
      )}

      {!showGuide && renderHelpButton()}
    </div>
  );
};

export default App;
