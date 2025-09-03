// src/components/Mobile/MobileInterface.tsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Mobile.css";
import { LINKS, openExternalLink } from "../../shared/linksConfig";
import { useTheme } from "../../hooks/useTheme";
import { colors } from "../../shared/themeConfig";

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
  const theme = useTheme();
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
                width: `${theme.getIconSize("desktop")}px`,
                height: `${theme.getIconSize("desktop")}px`,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            icon && (
              <Icon
                icon={icon}
                width={theme.getIconSize("large")}
                color={color}
              />
            )
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
}> = ({ dockItems }) => {
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
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Icon icon={item.icon} width={"24"} color={item.color} />
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
  const theme = useTheme();

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
                  width={theme.getIconSize("medium")}
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
      onClick: () => openExternalLink(LINKS.GITHUB),
    },
    {
      id: 2,
      label: "Blog",
      icon: "mdi:post-outline",
      badge: "3",
      color: colors.projects.blog,
      onClick: () => openExternalLink(LINKS.MEDIUM),
    },
    {
      id: 3,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: colors.projects.resume,
      onClick: () => openExternalLink(LINKS.RESUME),
    },
    {
      id: 4,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: undefined,
      onClick: () => openExternalLink(LINKS.GITHUB),
    },
    {
      id: 5,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: colors.projects.linkedin,
      onClick: () => openExternalLink(LINKS.LINKEDIN),
    },
    {
      id: 6,
      label: "Calendar",
      specialIcon: "calendar",
      day: day,
      onClick: () => openExternalLink(LINKS.CALENDAR),
    },
    {
      id: 7,
      label: "Portfolio",
      icon: "mdi:web",
      color: colors.projects.portfolio,
      onClick: () => openExternalLink(LINKS.PORTFOLIO),
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
      onClick: () => window.open(LINKS.PHONE),
    },
    {
      icon: deviceType === "ios" ? "mdi:safari" : "mdi:google-chrome",
      color: deviceType === "ios" ? "#1C9CF6" : "#4285F4",
      onClick: () => openExternalLink(LINKS.PORTFOLIO),
    },
    {
      icon: "mdi:post-outline",
      color: deviceType === "ios" ? "#1A9DFB" : "#EA4335",
      onClick: () => openExternalLink(LINKS.MEDIUM),
    },
    {
      icon: "mdi:github",
      color: deviceType === "ios" ? undefined : "#FFFFFF",
      onClick: () => openExternalLink(LINKS.GITHUB),
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
