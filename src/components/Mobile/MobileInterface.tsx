// src/components/Mobile/MobileInterface.tsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Mobile.css";

interface AppIconProps {
  id: number;
  label: string;
  icon?: string;
  badge?: string;
  color?: string;
  specialIcon?: "calendar" | "language";
  avatar?: string;
  day?: number;
  text?: string;
  onClick?: () => void;
}

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
 * Mobile App Icon Component
 */
const MobileIcon: React.FC<AppIconProps> = ({
  label,
  icon,
  badge,
  color,
  specialIcon,
  avatar,
  day,
  text,
  onClick,
}) => {
  return (
    <div className="app" onClick={onClick}>
      {specialIcon === "calendar" ? (
        <div className="app-icon calendar">
          <div className="calendar-day">{day}</div>
        </div>
      ) : specialIcon === "language" ? (
        <div className="app-icon language">
          <span>{text}</span>
        </div>
      ) : (
        <div className="app-icon">
          {badge && (
            <div className={`badge ${badge === "new" ? "new" : ""}`}>
              {badge}
            </div>
          )}
          {avatar ? (
            <img
              src={avatar}
              alt={label}
              className="icon-avatar"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            icon && <Icon icon={icon} width="28" color={color} />
          )}
        </div>
      )}
      <div className="app-label">{label}</div>
    </div>
  );
};

interface DockItemProps {
  icon: string;
  color?: string;
  avatar?: string;
  onClick?: () => void;
}

/**
 * Mobile Dock Component
 */
const MobileDock: React.FC<{
  deviceType: "ios" | "android";
  dockItems: DockItemProps[];
}> = ({ deviceType, dockItems }) => {
  return (
    <div className="mobile-dock">
      {dockItems.map((item, index) => (
        <div key={index} className="dock-item" onClick={item.onClick}>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt="User"
              className="dock-avatar"
              style={{
                width: deviceType === "ios" ? "36px" : "32px",
                height: deviceType === "ios" ? "36px" : "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Icon
              icon={item.icon}
              width={deviceType === "ios" ? "28" : "24"}
              color={item.color}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/**
 * Weather Widget Component
 */
const MobileWeather: React.FC<{
  deviceType: "ios" | "android";
  weather: MobileInterfaceProps["weather"];
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

  // Define app icons with links
  const appIcons: AppIconProps[] = [
    {
      id: 1,
      label: "Projects",
      icon: "logos:javascript",
      badge: "8+",
      color: "#54C5F8",
      onClick: () => openLink("https://github.com/softtunex"),
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
      onClick: () => openLink("https://calendly.com/olatunjibuari8/30min"),
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

  // Define dock items based on device type
  const dockItems: DockItemProps[] = [
    {
      icon: deviceType === "ios" ? "mdi:phone" : "mdi:phone",
      color: deviceType === "ios" ? "#34C759" : "#3DDC84",
    },
    {
      icon: deviceType === "ios" ? "mdi:safari" : "mdi:google-chrome",
      color: deviceType === "ios" ? "#1C9CF6" : "#4285F4",
      onClick: () => openLink("https://buariolatunji.netlify.app/"),
    },
    {
      icon: "mdi:post-outline",
      color: deviceType === "ios" ? "#1A9DFB" : "#EA4335",
      onClick: () => openLink("https://medium.com/@olatunjibuari8"),
    },
    {
      icon: "mdi:github",
      color: deviceType === "ios" ? undefined : "#FFFFFF",
      onClick: () => openLink("https://github.com/softtunex"),
    },
  ];

  return (
    <div className={`mobile-interface ${deviceType}`}>
      <div className="mobile-background">
        {deviceType === "ios" ? renderSafariInterface() : renderStatusBar()}

        {renderNotificationOverlay()}
        <MobileWeather deviceType={deviceType} weather={weather} />

        <div className="app-grid">
          {appIcons.map((app) => (
            <MobileIcon
              key={app.id}
              id={app.id}
              label={app.label}
              icon={app.icon}
              badge={app.badge}
              color={app.color}
              specialIcon={app.specialIcon}
              avatar={app.avatar}
              day={app.day}
              text={app.text}
              onClick={app.onClick}
            />
          ))}
        </div>

        <MobileDock deviceType={deviceType} dockItems={dockItems} />

        <div className={`made-with-badge ${deviceType}`}>
          <Icon
            icon="simple-icons:react"
            width="16"
            style={{ marginRight: "6px" }}
            color="#61DAFB"
          />
          <span>Made with React</span>
        </div>
      </div>
    </div>
  );
};

export default MobileInterface;
