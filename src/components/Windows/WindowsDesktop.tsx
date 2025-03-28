import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Windows.css";
import ProjectModal from "../ProjectModal/ProjectModal";

interface WindowsDesktopProps {
  weather: {
    temperature: number;
    condition: string;
    high: number;
    low: number;
  };
  onSwitchToMac?: () => void; // Optional prop for switching to Mac
}

const WindowsDesktop: React.FC<WindowsDesktopProps> = ({
  weather,
  onSwitchToMac,
}) => {
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
      icon: "logos:javascript", // Changed from Flutter to JavaScript
      badge: "8+",
      color: undefined,
      onClick: () => handleOpenProjectModal("projects"), // Open modal on click
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
      onClick: onSwitchToMac, // Add handler for macOS switch
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

        {/* Updated Windows taskbar with centered icons */}
        <div className="taskbar">
          {/* Windows start button - left aligned */}
          <div className="start-button">
            <Icon icon="mdi:microsoft-windows" width="20" />
          </div>

          {/* Taskbar icons - centered */}
          <div className="taskbar-icons">
            <div className="taskbar-icon">
              <Icon icon="mdi:microsoft-edge" width="22" />
            </div>
            <div className="taskbar-icon">
              <Icon icon="logos:javascript" width="22" />{" "}
              {/* Changed to JavaScript */}
            </div>
            <div className="taskbar-icon badge-container">
              <Icon icon="mdi:email" width="22" />
              <div className="taskbar-badge">3</div>
            </div>
            <div className="taskbar-icon">
              <Icon icon="mdi:folder-outline" width="22" />
            </div>
          </div>

          {/* Right side of taskbar */}
          <div className="taskbar-right">
            {/* Weather information - styled to match screenshot */}
            <div className="weather-widget">
              {!isLoading && !error && (
                <>
                  <span className="temperature">
                    {currentWeather.temperature}°C
                  </span>
                  <Icon
                    icon="mdi:weather-lightning-rainy"
                    width="16"
                    style={{ margin: "0 4px" }}
                  />
                  <span className="condition">
                    Patchy light rain with thunder
                  </span>
                </>
              )}
              {isLoading && <span>Loading weather...</span>}
              {error && <span>29°C Patchy light rain with thunder</span>}
            </div>

            <div className="taskbar-divider"></div>

            {/* System tray icons */}
            <div className="notification-area">
              <Icon icon="mdi:wifi" width="16" />
              <Icon icon="mdi:volume-high" width="16" />
              <Icon icon="mdi:battery" width="16" />
            </div>

            {/* Time and language */}
            <div className="time-widget">
              <div className="time">{time}</div>
              <div className="language">ENG</div>
            </div>
          </div>
        </div>

        {/* Made with banner */}
        <div className="made-with windows">
          <span>Made with </span>
          <Icon
            icon="simple-icons:react"
            width="16"
            style={{ margin: "0 4px" }}
          />
          <span>React</span>
        </div>

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={selectedProjectId}
          osType="windows"
        />
      </div>
    </div>
  );
};

export default WindowsDesktop;
