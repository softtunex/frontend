// src/components/Mobile/MobileInterface.tsx
import React, { useState } from "react";
import { Icon } from "@iconify/react";

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

  const renderStatusBar = () => {
    if (deviceType === "ios") {
      return (
        <div className="status-bar ios">
          <div className="status-left">
            <span>
              {currentDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="status-center">
            {deviceType === "ios" && <div className="notch"></div>}
          </div>
          <div className="status-right">
            <Icon icon="mdi:wifi" width="16" />
            <Icon icon="mdi:signal" width="16" />
            <Icon icon="mdi:battery" width="16" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="status-bar android">
          <div className="status-left">
            <Icon icon="mdi:wifi" width="16" />
            <Icon icon="mdi:signal" width="16" />
          </div>
          <div className="status-right">
            <span>
              {currentDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <Icon icon="mdi:battery" width="16" />
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`mobile-interface ${deviceType}`}>
      <div className="mobile-background">
        {renderStatusBar()}

        {showNotification && (
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
        )}

        <div className="weather-widget mobile">
          <div className="forecast">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="day">{day.day}</div>
                <div className="icon">
                  {day.condition === "Cloudy" ? (
                    <Icon icon="mdi:weather-cloudy" width="22" />
                  ) : (
                    <Icon icon="mdi:weather-sunny" width="22" />
                  )}
                </div>
                <div className="temp">{day.temperature}°</div>
              </div>
            ))}
          </div>
          <div className="label">Weather</div>
        </div>

        <div className="app-grid">
          <div className="app">
            <div className="app-icon">
              <div className="badge">8+</div>
              <Icon icon="simple-icons:flutter" width="28" color="#54C5F8" />
            </div>
            <div className="app-label">Projects</div>
          </div>
          <div className="app">
            <div className="app-icon">
              <div className="badge">3</div>
              <Icon
                icon="mdi:package-variant-closed"
                width="28"
                color="#44a8b3"
              />
            </div>
            <div className="app-label">Packages</div>
          </div>
          <div className="app">
            <div className="app-icon">
              <Icon icon="mdi:file-pdf-box" width="28" color="#f40f02" />
            </div>
            <div className="app-label">Résumé</div>
          </div>
          <div className="app">
            <div className="app-icon">
              <div className="badge">10+</div>
              <Icon icon="mdi:github" width="28" />
            </div>
            <div className="app-label">Github</div>
          </div>
          <div className="app">
            <div className="app-icon">
              <div className="badge">4K+</div>
              <Icon icon="mdi:linkedin" width="28" color="#0A66C2" />
            </div>
            <div className="app-label">LinkedIn</div>
          </div>
          <div className="app">
            <div className="app-icon calendar">
              <div className="calendar-day">{day}</div>
            </div>
            <div className="app-label">Calendar</div>
          </div>
          <div className="app">
            <div className="app-icon">
              <Icon icon="mdi:facebook" width="28" color="#1877f2" />
            </div>
            <div className="app-label">FaceFolio</div>
          </div>
          <div className="app">
            <div className="app-icon language">
              <span>EN</span>
            </div>
            <div className="app-label">Language</div>
          </div>
          {deviceType === "android" && (
            <div className="app">
              <div className="app-icon">
                <Icon icon="mdi:android" width="28" color="#3DDC84" />
              </div>
              <div className="app-label">Android</div>
            </div>
          )}
          <div className="app">
            <div className="app-icon">
              <div className="badge new">New</div>
              <Icon icon="mdi:coffee" width="28" color="#FFCA28" />
            </div>
            <div className="app-label">Buy Me A</div>
          </div>
        </div>

        <div className="mobile-dock">
          <div className="dock-item">
            <Icon
              icon="mdi:phone"
              width="28"
              color={deviceType === "ios" ? "#34C759" : "#3DDC84"}
            />
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
      </div>
      <div className="made-with mobile">
        <span>Made with </span>
        <Icon
          icon="ph:heart-fill"
          width="16"
          style={{ marginLeft: "4px", marginRight: "4px", color: "#F06292" }}
        />
        <span>Love</span>
      </div>
    </div>
  );
};

export default MobileInterface;
