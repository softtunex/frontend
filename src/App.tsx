// Add this to your App.tsx file

import React, { useEffect, useState } from "react";
import { detectDevice, DeviceType } from "./deviceDetection";
import WindowsDesktop from "./components/Windows/WindowsDesktop";
import MacDesktop from "./components/MacOS/MacDesktop";
import MobileInterface from "./components/Mobile/MobileInterface";
import UserGuide from "./components/UserGuide/UserGuide"; // Import the UserGuide component
import { Icon } from "@iconify/react"; // Import Icon component
import "./App.css";
import "./Responsive.css";

const App: React.FC = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("unknown");
  const [showGuide, setShowGuide] = useState(false);

  // Avatar URL - ensure this is the correct path
  const avatarUrl =
    "https://res.cloudinary.com/duwdwr0r9/image/upload/v1743427116/sticker_qg5max.png";

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
    // Detect the device type on mount
    const detected = detectDevice();
    setDeviceType(detected);

    // Check if user guide has been shown before
    const guideShown = localStorage.getItem("portfolioGuideShown");
    if (guideShown !== "true") {
      // Wait a moment before showing the guide to let the interface load
      const timer = setTimeout(() => {
        setShowGuide(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  // Switch handlers
  const switchToMac = () => {
    setDeviceType("macos");
  };

  const switchToWindows = () => {
    setDeviceType("windows");
  };

  // Handler for guide close
  const handleGuideClose = () => {
    setShowGuide(false);
  };

  // Add the help button to reopen guide
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

      {/* Add the UserGuide component */}
      {showGuide && (
        <UserGuide
          deviceType={deviceType}
          onClose={handleGuideClose}
          avatarUrl={avatarUrl}
        />
      )}

      {/* Help button to reopen the guide */}
      {!showGuide && renderHelpButton()}
    </div>
  );
};

export default App;
