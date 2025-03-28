import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Mac.css";
import ProjectModal from "../ProjectModal/ProjectModal";

interface MacDesktopProps {
  weather: {
    temperature: number;
    condition: string;
    high: number;
    low: number;
  };
  onSwitchToWindows?: () => void; // Optional prop for switching to Windows
}

const MacDesktop: React.FC<MacDesktopProps> = ({
  weather,
  onSwitchToWindows,
}) => {
  const [showNotification, setShowNotification] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(weather);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add state for project modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format the date for display in menu bar as "Thu, Mar 27"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Function to fetch weather data based on geolocation
  const fetchWeatherData = () => {
    setIsLoading(true);
    setError(null);

    // First, try to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Using OpenWeatherMap API as an example (you'll need your own API key)
          const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Weather data not available");
              }
              return response.json();
            })
            .then((data) => {
              setCurrentWeather({
                temperature: Math.round(data.main.temp),
                condition: data.weather[0].main,
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
              });
              setIsLoading(false);
            })
            .catch((err) => {
              console.error("Error fetching weather:", err);
              setError("Could not fetch weather data");
              setIsLoading(false);
            });
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Location access denied");
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
      setIsLoading(false);
    }
  };

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    // Map weather conditions to appropriate icons
    const conditionMap: Record<string, string> = {
      Clear: "mdi:weather-sunny",
      Clouds: "mdi:weather-cloudy",
      Rain: "mdi:weather-rainy",
      Drizzle: "mdi:weather-partly-rainy",
      Thunderstorm: "mdi:weather-lightning-rainy",
      Snow: "mdi:weather-snowy",
      Mist: "mdi:weather-fog",
      Fog: "mdi:weather-fog",
      Haze: "mdi:weather-hazy",
      Dust: "mdi:weather-dust",
      Smoke: "mdi:weather-dust",
      Tornado: "mdi:weather-tornado",
    };

    return conditionMap[condition] || "mdi:weather-partly-cloudy";
  };

  // Function to handle opening the project modal
  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  // Define desktop icons data
  const desktopIcons = [
    {
      id: 1,
      label: "Projects",
      icon: "logos:javascript", // Changed to JavaScript
      badge: "8+",
      color: undefined,
      onClick: () => handleOpenProjectModal("projects"), // Open modal on click
    },
    {
      id: 2,
      label: "Fullscreen",
      icon: "mdi:fullscreen",
      color: undefined,
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
      label: "FaceFolio",
      icon: "mdi:facebook",
      color: "#1877f2",
    },
    {
      id: 5,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: "#f40f02",
    },
    {
      id: 6,
      label: "Windows mode",
      icon: "mdi:microsoft-windows",
      color: undefined,
      onClick: onSwitchToWindows, // Add handler for Windows switch
    },
    {
      id: 7,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: undefined,
    },
    {
      id: 8,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: "#0A66C2",
    },
  ];

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
            <div className="menu-item">{`${formattedDate} ${time}`}</div>
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
            {desktopIcons.map((icon) => (
              <div
                key={icon.id}
                className="icon"
                onClick={icon.onClick} // Handle click if defined
              >
                {icon.badge && <div className="icon-badge">{icon.badge}</div>}
                <div className="icon-img">
                  <Icon icon={icon.icon} width="28" color={icon.color} />
                </div>
                <div className="icon-label">{icon.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Updated Weather Widget matching the design in the image */}
        <div className="weather-widget mac">
          <div className="location">
            <Icon
              icon="mdi:map-marker"
              width="16"
              style={{ marginRight: "4px" }}
            />
            <span>{error ? "Location" : "Lagos"}</span>
          </div>
          <div className="temperature">
            {isLoading ? "..." : `${currentWeather.temperature}°`}
          </div>
          <div className="weather-condition">
            {!isLoading && (
              <>
                <Icon
                  icon={getWeatherIcon(currentWeather.condition)}
                  width="20"
                  style={{ marginRight: "6px" }}
                />
                <span>
                  {currentWeather.condition === "Clear"
                    ? "Sunny"
                    : currentWeather.condition === "Clouds"
                    ? "Partly Cloudy"
                    : currentWeather.condition}
                </span>
              </>
            )}
          </div>
          <div className="high-low">
            H: {currentWeather.high}° L: {currentWeather.low}°
          </div>
          {error && (
            <div className="weather-error">{error} - Using default data</div>
          )}
        </div>

        <div className="dock">
          <div className="dock-item">
            <Icon icon="mdi:folder" width="28" color="#1D93EF" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:safari" width="28" color="#1C9CF6" />
          </div>
          <div className="dock-item">
            <Icon icon="mdi:email" width="28" color="#1A9DFB" />
          </div>
          <div className="dock-item badge-container">
            <Icon icon="logos:javascript" width="28" />{" "}
            {/* Changed to JavaScript */}
            <div className="dock-badge">8+</div>
          </div>
          <div className="dock-item">
            <Icon icon="mdi:account-circle" width="28" color="#F57C00" />
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
        <span>Love</span>
      </div>

      {/* Add the ProjectModal component */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectId={selectedProjectId}
        osType="mac" // Pass "mac" to ensure macOS styling
      />
    </div>
  );
};

export default MacDesktop;
