// src/components/Mobile/MobileInterface.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./Mobile.css";

interface MobileInterfaceProps {
  deviceType: "ios" | "android";
  weather: {
    temperature: number;
    condition: string;
    forecast: Array<{
      day: number;
      temperature: number;
      condition: string;
    }>;
  };
}

const MobileInterface: React.FC<MobileInterfaceProps> = ({
  deviceType,
  weather,
}) => {
  const [showNotification, setShowNotification] = useState(true);
  const currentDate = new Date();
  const day = currentDate.getDate();

  // Date formatting for display
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const renderNotificationOverlay = () => {
    if (showNotification) {
      return (
        <div className="mobile-notification">
          <div className="notification-icon">
            <Icon icon="mdi:lightbulb-on-outline" width="24" />
          </div>
          <div className="notification-content">
            <div className="notification-title">Did you know?</div>
            <div className="notification-message">
              This portfolio will also look great on desktop
            </div>
          </div>
          <button
            className="notification-button"
            onClick={() => setShowNotification(false)}
          >
            OK
          </button>
        </div>
      );
    }
    return null;
  };
  // Render Safari interface for iOS
  const renderSafariInterface = () => {
    if (deviceType === "ios") {
      return (
        <>
          {/* iPhone notch and status bar */}
          <div className="iphone-notch-area">
            <div className="iphone-status-bar">
              <div className="iphone-time">{formattedTime}</div>
              <div className="iphone-status-right">
                <Icon icon="mdi:signal" width="16" />
                <span>4G</span>
                <Icon
                  icon="mdi:battery"
                  width="20"
                  style={{ marginLeft: "2px" }}
                />
              </div>
            </div>
            <div className="iphone-notch"></div>
          </div>

          {/* Safari bottom bar */}
          <div className="safari-bottom-bar">
            <div className="safari-bottom-item">
              <Icon icon="mdi:chevron-left" width="24" />
            </div>
            <div className="safari-bottom-item">
              <Icon icon="mdi:chevron-right" width="24" />
            </div>
            <div className="safari-bottom-item">
              <Icon icon="mdi:share-variant-outline" width="24" />
            </div>
            <div className="safari-bottom-item">
              <Icon icon="mdi:book-outline" width="24" />
            </div>
            <div className="safari-bottom-item">
              <Icon icon="mdi:application-outline" width="24" />
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  // Render Status Bar for Android
  const renderStatusBar = () => {
    return (
      <div className="status-bar android">
        <div className="status-left">
          <Icon icon="mdi:wifi" width="16" />
          <Icon icon="mdi:signal" width="16" />
        </div>
        <div className="status-right">
          <span>{formattedTime}</span>
          <Icon icon="mdi:battery" width="16" />
          <span>100%</span>
        </div>
      </div>
    );
  };

  // Render Weather Widget based on device type
  const renderWeatherWidget = () => {
    if (deviceType === "ios") {
      // iOS style horizontal forecast
      return (
        <div className="weather-widget mobile">
          <div className="forecast">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="day">{day.day}</div>
                <div className="icon">
                  {day.condition === "Cloudy" ? (
                    <Icon icon="mdi:weather-cloudy" width="22" color="white" />
                  ) : (
                    <Icon icon="mdi:weather-sunny" width="22" color="white" />
                  )}
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
              <div className="weather-condition">Partly cloudy</div>
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
                  icon={
                    day.condition === "Cloudy"
                      ? "mdi:weather-cloudy"
                      : "mdi:weather-sunny"
                  }
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

  // Render App Icons
  const renderAppGrid = () => {
    const appIcons = [
      {
        id: 1,
        label: "Projects",
        icon: "simple-icons:flutter",
        badge: "8+",
        color: "#54C5F8",
      },
      {
        id: 2,
        label: "Packages",
        icon: "mdi:package-variant-closed",
        badge: "3",
        color: "#44a8b3",
      },
      {
        id: 3,
        label: "Résumé",
        icon: "mdi:file-pdf-box",
        color: "#f40f02",
      },
      {
        id: 4,
        label: "Github",
        icon: "mdi:github",
        badge: "10+",
        color: undefined,
      },
      {
        id: 5,
        label: "LinkedIn",
        icon: "mdi:linkedin",
        badge: "4K+",
        color: "#0A66C2",
      },
      {
        id: 6,
        label: "Calendar",
        specialIcon: "calendar",
        day: day,
      },
      {
        id: 7,
        label: "FaceFolio",
        icon: "mdi:facebook",
        color: "#1877f2",
      },
      {
        id: 8,
        label: "Language",
        specialIcon: "language",
        text: "EN",
      },
      {
        id: 9,
        label: deviceType === "ios" ? "Android mode" : "iOS mode",
        icon: deviceType === "ios" ? "mdi:android" : "mdi:apple",
        color: deviceType === "ios" ? "#3DDC84" : undefined,
      },
      {
        id: 10,
        label: "Buy Me A Coffee",
        icon: "mdi:coffee",
        badge: "new",
        color: "#FFCA28",
      },
    ];

    return (
      <div className="app-grid">
        {appIcons.map((app) => (
          <div key={app.id} className="app">
            {app.specialIcon === "calendar" ? (
              <div className="app-icon calendar">
                <div className="calendar-day">{app.day}</div>
              </div>
            ) : app.specialIcon === "language" ? (
              <div className="app-icon language">
                <span>{app.text}</span>
              </div>
            ) : (
              <div className="app-icon">
                {app.badge && (
                  <div className={`badge ${app.badge === "new" ? "new" : ""}`}>
                    {app.badge}
                  </div>
                )}
                <Icon icon={app.icon!} width="28" color={app.color} />
              </div>
            )}
            <div className="app-label">{app.label}</div>
          </div>
        ))}
      </div>
    );
  };

  // Render Mobile Dock based on device type
  const renderMobileDock = () => {
    if (deviceType === "ios") {
      return (
        <div className="mobile-dock">
          <div className="dock-item">
            <Icon icon="mdi:phone" width="28" color="#34C759" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:safari" width="28" color="#1C9CF6" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:email" width="28" color="#1A9DFB" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:account-circle" width="28" color="#F57C00" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="mobile-dock">
          <div className="dock-item">
            <Icon icon="mdi:phone" width="28" color="#3DDC84" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:google-chrome" width="28" color="#4285F4" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:gmail" width="28" color="#EA4335" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:account-circle" width="28" color="#FFFFFF" />
          </div>
        </div>
      );
    }
  };

  // Add "Made with Flutter" badge for iOS
  const renderMadeWithBadge = () => {
    if (deviceType === "ios") {
      return (
        <div className="made-with-flutter">
          <Icon
            icon="simple-icons:flutter"
            width="16"
            style={{ marginRight: "6px" }}
            color="#54C5F8"
          />
          <span>Made with Flutter</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`mobile-interface ${deviceType}`}>
      <div className="mobile-background">
        {deviceType === "ios" ? renderSafariInterface() : renderStatusBar()}

        {renderNotificationOverlay()}
        {renderWeatherWidget()}
        {renderAppGrid()}
        {renderMobileDock()}
        {renderMadeWithBadge()}
      </div>
    </div>
  );
};

export default MobileInterface;
