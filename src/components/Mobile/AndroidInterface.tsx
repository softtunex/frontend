// AndroidInterface.tsx - Clean Minimal Design
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./Android.css";
import { userConfig } from "../../shared/userConfig";
import { LINKS, openExternalLink } from "../../shared/linksConfig";

interface AndroidProps {
  weather: {
    temperature: number;
    condition: string;
    forecast: Array<{
      day: number;
      temperature: number;
      condition: string;
    }>;
  };
  onProjectClick?: () => void;
  onSwitchOS?: () => void;
}

const AndroidInterface: React.FC<AndroidProps> = ({
  weather,
  onProjectClick,
  onSwitchOS,
}) => {
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Essential apps only - minimal and functional
  const apps = [
    {
      id: "projects",
      name: "Projects",
      icon: "mdi:folder-multiple",
      color: "#2196F3",
      onClick: onProjectClick,
    },
    {
      id: "portfolio",
      name: "Portfolio",
      icon: "mdi:briefcase",
      color: "#FF5722",
      onClick: () => openExternalLink(LINKS.PORTFOLIO),
    },
    {
      id: "github",
      name: "GitHub",
      icon: "mdi:github",
      color: "#333",
      onClick: () => openExternalLink(LINKS.GITHUB),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "mdi:linkedin",
      color: "#0077B5",
      onClick: () => openExternalLink(LINKS.LINKEDIN),
    },
    {
      id: "resume",
      name: "Resume",
      icon: "mdi:file-document",
      color: "#FF9800",
      onClick: () => openExternalLink(LINKS.RESUME),
    },
    {
      id: "gmail",
      name: "Gmail",
      icon: "mdi:gmail",
      color: "#EA4335",
      onClick: () => window.open(LINKS.EMAIL),
    },
    {
      id: "calendar",
      name: "Calendar",
      type: "calendar",
      day: currentDate.getDate(),
      color: "#4285F4",
      onClick: () => openExternalLink(LINKS.CALENDAR),
    },
    {
      id: "phone",
      name: "Phone",
      icon: "mdi:phone",
      color: "#4CAF50",
      onClick: () => window.open(LINKS.PHONE),
    },
    // --- ADDED APPS ---
    {
      id: "switch-os",
      name: "iOS Mode",
      icon: "mdi:apple",
      color: "#A9A9A9",
      onClick: onSwitchOS,
    },
    {
      id: "fullscreen",
      name: "Fullscreen",
      icon: isFullScreen ? "mdi:fullscreen-exit" : "mdi:fullscreen",
      color: "#808080",
      onClick: toggleFullScreen,
    },
  ];

  // Dock apps
  const dockApps = [
    {
      icon: "mdi:phone",
      color: "#4CAF50",
      onClick: () => window.open(LINKS.PHONE),
    },
    {
      icon: "mdi:gmail",
      color: "#EA4335",
      onClick: () => window.open(LINKS.EMAIL),
    },
    { icon: "mdi:message-text", color: "#4CAF50" },
    {
      icon: "mdi:google-chrome",
      color: "#4285F4",
      onClick: () => openExternalLink(LINKS.PORTFOLIO),
    },
  ];

  const AppIcon: React.FC<{ app: any; size?: string }> = ({
    app,
    size = "normal",
  }) => {
    if (app.type === "calendar") {
      return (
        <div className={`android-app ${size}`} onClick={app.onClick}>
          <div className="android-app-icon calendar-icon">
            <div className="calendar-header">
              <span>
                {currentDate
                  .toLocaleDateString("en", { month: "short" })
                  .toUpperCase()}
              </span>
            </div>
            <div className="calendar-day">{app.day}</div>
          </div>
          <div className="android-app-label">{app.name}</div>
        </div>
      );
    }

    return (
      <div className={`android-app ${size}`} onClick={app.onClick}>
        <div
          className="android-app-icon"
          style={{ backgroundColor: app.color }}
        >
          <Icon
            icon={app.icon}
            width={size === "small" ? "20" : "28"}
            color="white"
          />
        </div>
        <div className="android-app-label">{app.name}</div>
      </div>
    );
  };

  return (
    <div className="android-interface">
      {/* Status Bar */}
      <div className="android-status-bar">
        <div className="android-status-left">
          <span className="android-time">{time}</span>
        </div>
        <div className="android-status-right">
          <div className="android-signal">
            <div className="signal-bar"></div>
            <div className="signal-bar active"></div>
            <div className="signal-bar active"></div>
            <div className="signal-bar active"></div>
          </div>
          <Icon icon="mdi:wifi" width="14" color="white" />
          <div className="android-battery">
            <div className="battery-level"></div>
          </div>
          <span className="android-battery-text">87%</span>
        </div>
      </div>

      {/* Home Screen */}
      <div className="android-home">
        {/* Search Bar - REMOVED fullscreen and switcher from here */}
        <div
          className="android-search"
          onClick={() => setShowQuickSettings(true)}
        >
          <Icon icon="mdi:magnify" width="18" color="#666" />
          <span>Search apps & web</span>
          <div className="android-search-actions">
            <div className="android-mic">
              <Icon icon="mdi:microphone" width="16" color="#666" />
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="android-weather">
          <div className="weather-header">
            <Icon icon="mdi:map-marker" width="14" color="#666" />
            <span>Lagos, Nigeria</span>
            <span className="weather-time">{time}</span>
          </div>
          <div className="weather-content">
            <div className="weather-main">
              <div className="weather-temp">{weather.temperature}°</div>
              <div className="weather-info">
                <Icon
                  icon="mdi:weather-partly-cloudy"
                  width="32"
                  color="#666"
                />
                <div className="weather-condition">{weather.condition}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="android-apps-grid">
          {apps
            .filter((app) => (onSwitchOS ? true : app.id !== "switch-os")) // Conditionally render switch os icon
            .map((app) => (
              <AppIcon key={app.id} app={app} />
            ))}
        </div>

        {/* Dock */}
        <div className="android-dock">
          {dockApps.map((app, index) => (
            <div key={index} className="android-dock-app" onClick={app.onClick}>
              <Icon icon={app.icon} width="24" color="white" />
            </div>
          ))}
          <div
            className="android-app-drawer-btn"
            onClick={() => setShowAppDrawer(true)}
          >
            <div className="drawer-dots">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="drawer-dot"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="android-nav">
        <div className="nav-btn">
          <Icon icon="mdi:arrow-left" width="20" color="white" />
        </div>
        <div className="nav-btn home-btn">
          <div className="home-indicator"></div>
        </div>
        <div className="nav-btn">
          <Icon icon="mdi:menu" width="20" color="white" />
        </div>
      </div>

      {/* App Drawer */}
      {showAppDrawer && (
        <div
          className="android-drawer-overlay"
          onClick={() => setShowAppDrawer(false)}
        >
          <div className="android-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-handle"></div>
            <div className="drawer-header">
              <input
                type="text"
                placeholder="Search apps"
                className="drawer-search"
              />
            </div>
            <div className="drawer-content">
              <div className="drawer-apps-grid">
                {apps.map((app) => (
                  <AppIcon key={app.id} app={app} size="small" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Settings */}
      {showQuickSettings && (
        <div
          className="android-quick-overlay"
          onClick={() => setShowQuickSettings(false)}
        >
          <div className="android-quick" onClick={(e) => e.stopPropagation()}>
            <div className="quick-header">
              <div className="quick-user">
                <img
                  src={userConfig.avatar}
                  alt="User"
                  className="user-avatar"
                />
                <div className="user-info">
                  <div className="user-name">{userConfig.name}</div>
                  <div className="user-email">{userConfig.email}</div>
                </div>
              </div>
              <Icon icon="mdi:cog" width="20" color="#333" />
            </div>
            <div className="quick-toggles">
              <div className="quick-toggle active">
                <Icon icon="mdi:wifi" width="20" />
                <span>Wi-Fi</span>
              </div>
              <div className="quick-toggle active">
                <Icon icon="mdi:bluetooth" width="20" />
                <span>Bluetooth</span>
              </div>
              <div className="quick-toggle">
                <Icon icon="mdi:airplane" width="20" />
                <span>Airplane</span>
              </div>
              <div className="quick-toggle">
                <Icon icon="mdi:flashlight" width="20" />
                <span>Flashlight</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Made with React */}
      <div className="android-footer">
        <Icon
          icon="simple-icons:react"
          width="14"
          color="rgba(255,255,255,0.7)"
        />
        <span>Made with React</span>
      </div>
    </div>
  );
};

export default AndroidInterface;
