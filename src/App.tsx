// Updated App.tsx
import React, { useEffect, useState } from "react";
import { detectDevice, DeviceType } from "./deviceDetection";
import WindowsDesktop from "./components/Windows/WindowsDesktop";
import MacDesktop from "./components/MacOS/MacDesktop";
import AndroidInterface from "./components/Mobile/AndroidInterface";
import IOSInterface from "./components/Mobile/iOSInterface";
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

  // --- OS Switching Functions for all platforms ---
  const switchToMac = () => setDeviceType("macos");
  const switchToWindows = () => setDeviceType("windows");
  const switchToiOS = () => setDeviceType("ios");
  const switchToAndroid = () => setDeviceType("android");

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

      {/* --- REFACTORED Mobile Components --- */}
      {/* They now receive onSwitchOS and handle their own modals, just like desktop */}
      {deviceType === "ios" && (
        <IOSInterface weather={weather} onSwitchOS={switchToAndroid} />
      )}

      {deviceType === "android" && (
        <AndroidInterface weather={weather} onSwitchOS={switchToiOS} />
      )}

      {deviceType === "unknown" && (
        <div className="unknown-device">
          <h1>Welcome to My Adaptive Portfolio</h1>
          <p>
            Your device type couldn't be automatically detected. Choose your
            preferred interface:
          </p>
          <div className="device-selector">
            <button onClick={() => setDeviceType("windows")}>
              <Icon icon="mdi:microsoft-windows" width="32" />
              Windows
            </button>
            <button onClick={() => setDeviceType("macos")}>
              <Icon icon="mdi:apple" width="32" />
              macOS
            </button>
            <button onClick={() => setDeviceType("ios")}>
              <Icon icon="mdi:cellphone-iphone" width="32" />
              iOS
            </button>
            <button onClick={() => setDeviceType("android")}>
              <Icon icon="mdi:android" width="32" />
              Android
            </button>
          </div>
        </div>
      )}

      {showGuide && (
        <UserGuide
          deviceType={deviceType}
          onClose={handleGuideClose}
          avatarUrl={avatar}
        />
      )}

      {!showGuide && renderHelpButton()}
    </div>
  );
};

export default App;
