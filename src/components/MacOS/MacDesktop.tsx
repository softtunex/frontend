// src/components/MacOS/MacDesktop.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface MacDesktopProps {
  weather: {
    temperature: number;
    condition: string;
    high: number;
    low: number;
  };
}

const MacDesktop: React.FC<MacDesktopProps> = ({ weather }) => {
  const [showNotification, setShowNotification] = useState(true);
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mac-desktop">
      <div className="desktop-background">
        <div className="menu-bar">
          <div className="menu-bar-left">
            <div className="apple-logo">
              <Icon icon="mdi:apple" width="18" />
            </div>
            <div className="menu-item">Finder</div>
            <div className="menu-item">About Me</div>
            <div className="menu-item">Contact</div>
            <div className="menu-item">Projects</div>
          </div>
          <div className="menu-bar-right">
            <div className="menu-item">
              <Icon icon="mdi:wifi" width="18" />
            </div>
            <div className="menu-item">
              <Icon icon="mdi:battery" width="18" />
            </div>
            <div className="menu-item">EN</div>
            <div className="menu-item">{time}</div>
          </div>
        </div>

        {showNotification && (
          <div className="notification">
            <div className="notification-icon">
              <Icon icon="mdi:lightbulb-on-outline" width="24" />
            </div>
            <div className="notification-content">
              <div className="notification-title">Did you know?</div>
              <div className="notification-message">
                This portfolio will also look great on mobile
              </div>
            </div>
            <button
              className="notification-button"
              onClick={() => setShowNotification(false)}
            >
              OK
            </button>
          </div>
        )}

        <div className="desktop-icons-container">
          <div className="desktop-icons">
            <div className="icon">
              <div className="icon-badge">8+</div>
              <div className="icon-img">
                <Icon icon="simple-icons:flutter" width="28" />
              </div>
              <div className="icon-label">Projects</div>
            </div>
            <div className="icon">
              <div className="icon-img">
                <Icon icon="mdi:fullscreen" width="28" />
              </div>
              <div className="icon-label">Fullscreen</div>
            </div>
            <div className="icon">
              <div className="icon-badge">3</div>
              <div className="icon-img">
                <Icon
                  icon="mdi:package-variant-closed"
                  width="28"
                  color="#44a8b3"
                />
              </div>
              <div className="icon-label">Packages</div>
            </div>
            <div className="icon">
              <div className="icon-img">
                <Icon icon="mdi:facebook" width="28" color="#1877f2" />
              </div>
              <div className="icon-label">FaceFolio</div>
            </div>
            <div className="icon">
              <div className="icon-img">
                <Icon icon="mdi:file-pdf-box" width="28" color="#f40f02" />
              </div>
              <div className="icon-label">Résumé</div>
            </div>
            <div className="icon">
              <div className="icon-img">
                <Icon icon="mdi:microsoft-windows" width="28" />
              </div>
              <div className="icon-label">Windows mode</div>
            </div>
            <div className="icon">
              <div className="icon-badge">10+</div>
              <div className="icon-img">
                <Icon icon="mdi:github" width="28" />
              </div>
              <div className="icon-label">Github</div>
            </div>
            <div className="icon">
              <div className="icon-badge">4K+</div>
              <div className="icon-img">
                <Icon icon="mdi:linkedin" width="28" color="#0A66C2" />
              </div>
              <div className="icon-label">LinkedIn</div>
            </div>
          </div>
        </div>

        <div className="weather-widget mac">
          <div className="location">
            <Icon
              icon="mdi:map-marker"
              width="16"
              style={{ marginRight: "4px" }}
            />
            <span>Lagos</span>
          </div>
          <div className="temperature">{weather.temperature}°</div>
          <div className="weather-condition">
            <Icon
              icon="mdi:weather-lightning-rainy"
              width="16"
              style={{ marginRight: "4px" }}
            />
            <span>{weather.condition}</span>
          </div>
          <div className="high-low">
            H: {weather.high}° L: {weather.low}°
          </div>
        </div>

        <div className="dock">
          <div className="dock-item">
            <Icon icon="mdi:folder" width="40" color="#1D93EF" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:safari" width="40" color="#1C9CF6" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:email" width="40" color="#1A9DFB" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:account-circle" width="40" color="#F57C00" />
          </div>
          <div className="dock-item">
            <Icon icon="simple-icons:flutter" width="40" color="#54C5F8" />
          </div>
        </div>
      </div>
      <div className="made-with mac">
        <span>Made with </span>
        <Icon
          icon="ph:heart-fill"
          width="16"
          style={{ marginLeft: "4px", marginRight: "4px", color: "#F06292" }}
        />
        <span>Care</span>
      </div>
    </div>
  );
};

export default MacDesktop;
