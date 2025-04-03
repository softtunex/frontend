// src/components/Mobile/MobileInterface.tsx
import React, { useState, useEffect } from "react";
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const currentDate = new Date();
  const day = currentDate.getDate();

  // Date formatting for display
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Check fullscreen state when component mounts
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Function to open link in a new tab
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Function to handle notifications
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

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
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

  // Function to handle app clicks
  const handleAppClick = (app: any) => {
    if (app.onClick) {
      app.onClick();
    }
  };

  // Define app icons with links
  const appIcons = [
    {
      id: 1,
      label: "Projects",
      icon: "logos:javascript",
      badge: "8+",
      color: "#54C5F8",
    },
    {
      id: 2,
      label: "Blog",
      icon: "mdi:post-outline",
      badge: "3",
      color: "#44a8b3",
      onClick: () => openLink("https://medium.com/@olatunjibuari8"),
    },
    {
      id: 3,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: "#f40f02",
      onClick: () =>
        openLink(
          "https://drive.google.com/file/d/1b-5QtzA8b3ywoA6G-1wH8yajuekJtM3x/view"
        ),
    },
    {
      id: 4,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: undefined,
      onClick: () => openLink("https://github.com/softtunex"),
    },
    {
      id: 5,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: "#0A66C2",
      onClick: () =>
        openLink("https://www.linkedin.com/in/olatunji-buari-a87031190/"),
    },
    {
      id: 6,
      label: "Calendar",
      specialIcon: "calendar",
      day: day,
    },
    {
      id: 7,
      label: "Portfolio",
      icon: "mdi:web",
      color: "#1877f2",
      onClick: () => openLink("https://buariolatunji.netlify.app/"),
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
      label: "Fullscreen",
      icon: isFullScreen ? "mdi:fullscreen-exit" : "mdi:fullscreen",
      color: "#FFCA28",
      onClick: toggleFullScreen,
    },
  ];

  // Render App Icons
  const renderAppGrid = () => {
    return (
      <div className="app-grid">
        {appIcons.map((app) => (
          <div key={app.id} className="app" onClick={() => handleAppClick(app)}>
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
          <div
            className="dock-item"
            onClick={() => openLink("https://buariolatunji.netlify.app/")}
          >
            <Icon icon="mdi:safari" width="28" color="#1C9CF6" />
          </div>
          <div
            className="dock-item"
            onClick={() => openLink("https://medium.com/@olatunjibuari8")}
          >
            <Icon icon="mdi:post-outline" width="28" color="#1A9DFB" />
          </div>
          <div
            className="dock-item"
            onClick={() => openLink("https://github.com/softtunex")}
          >
            <Icon icon="mdi:github" width="28" color="#F57C00" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="mobile-dock">
          <div className="dock-item">
            <Icon icon="mdi:phone" width="28" color="#3DDC84" />
          </div>
          <div
            className="dock-item"
            onClick={() => openLink("https://buariolatunji.netlify.app/")}
          >
            <Icon icon="mdi:google-chrome" width="28" color="#4285F4" />
          </div>
          <div
            className="dock-item"
            onClick={() => openLink("https://medium.com/@olatunjibuari8")}
          >
            <Icon icon="mdi:post-outline" width="28" color="#EA4335" />
          </div>
          <div
            className="dock-item"
            onClick={() => openLink("https://github.com/softtunex")}
          >
            <Icon icon="mdi:github" width="28" color="#FFFFFF" />
          </div>
        </div>
      );
    }
  };

  // Render "Made with React" badge
  const renderMadeWithBadge = () => {
    const badgeClass =
      deviceType === "ios" ? "made-with-badge ios" : "made-with-badge android";
    return (
      <div className={badgeClass}>
        <Icon
          icon="simple-icons:react"
          width="16"
          style={{ marginRight: "6px" }}
          color="#61DAFB"
        />
        <span>Made with React</span>
      </div>
    );
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
