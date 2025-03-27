import React from "react";
import { Icon } from "@iconify/react";

interface WindowsDesktopProps {
  weather: {
    temperature: number;
    condition: string;
  };
}

const WindowsDesktop: React.FC<WindowsDesktopProps> = ({ weather }) => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Define desktop icons data
  const desktopIcons = [
    {
      id: 1,
      label: "Projects",
      icon: "simple-icons:flutter",
      badge: "8+",
      color: undefined,
    },
    {
      id: 2,
      label: "FaceFolio",
      icon: "mdi:facebook",
      color: "#1877f2",
    },
    {
      id: 3,
      label: "Packages",
      icon: "mdi:package-variant-closed",
      badge: "3",
      color: "#44a8b3",
    },
    {
      id: 4,
      label: "macOS mode",
      icon: "mdi:apple",
      color: undefined,
    },
    {
      id: 5,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: "#f40f02",
    },
    {
      id: 6,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: undefined,
    },
    {
      id: 7,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: "#0A66C2",
    },
    {
      id: 8,
      label: "Fullscreen",
      icon: "mdi:fullscreen",
      color: undefined,
    },
  ];

  return (
    <div className="windows-desktop">
      <div className="desktop-background">
        <div className="desktop-icons-container">
          <div className="desktop-icons">
            {desktopIcons.map((icon) => (
              <div key={icon.id} className="icon">
                {icon.badge && <div className="icon-badge">{icon.badge}</div>}
                <div className="icon-img">
                  <Icon icon={icon.icon} width="28" color={icon.color} />
                </div>
                <div className="icon-label">{icon.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="taskbar">
          <div className="start-button">
            <Icon icon="mdi:microsoft-windows" width="20" />
          </div>
          <div className="taskbar-icons">
            <div className="taskbar-icon">
              <Icon icon="mdi:microsoft-edge" width="22" />
            </div>
            <div className="taskbar-icon">
              <Icon icon="simple-icons:flutter" width="22" />
            </div>
            <div className="taskbar-icon badge-container">
              <Icon icon="mdi:email" width="22" />
              <div className="taskbar-badge">3</div>
            </div>
            <div className="taskbar-icon">
              <Icon icon="mdi:folder-outline" width="22" />
            </div>
          </div>
          <div className="taskbar-right">
            <div className="weather-widget">
              <span>{weather.temperature}°C</span>
              <div className="weather-condition">
                <Icon
                  icon="mdi:weather-lightning-rainy"
                  width="16"
                  style={{ marginRight: "4px" }}
                />
                <span>{weather.condition}</span>
              </div>
            </div>
            <div className="taskbar-divider"></div>
            <div className="time-widget">
              {time}
              <div className="language">ENG</div>
            </div>
            <div className="notification-area">
              <Icon icon="mdi:wifi" width="18" />
              <Icon icon="mdi:volume-high" width="18" />
              <Icon icon="mdi:battery" width="18" />
            </div>
          </div>
        </div>
      </div>
      <div className="made-with">
        <span>Made with </span>
        <Icon
          icon="simple-icons:flutter"
          width="16"
          style={{ marginRight: "4px", marginLeft: "4px" }}
        />
        <span>React</span>
      </div>
    </div>
  );
};

export default WindowsDesktop;
