import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Windows.css";
import Window from "../WindowModal/Window";
import ProjectModal from "../ProjectModal/ProjectModal";
import StartMenu from "../StartMenu/StartMenu";
import WindowsListExplorer from "../WindowModal/SitePreview";

// Define a Window object type
interface WindowObject {
  id: string;
  title: string;
  icon: string;
  iconColor?: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  content: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
}

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

  // Original ProjectModal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // Windows state
  const [windows, setWindows] = useState<WindowObject[]>([]);

  // User information to display in the start menu
  const userInfo = {
    name: "Olatunji Buari",
    title: "Senior Frontend Engineer",
    avatar:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1743427116/sticker_qg5max.png",
    phone: "+234 123 456 7890",
    email: "olatunjibuari8@gmail.com",
    website: "https://buariolatunji.netlify.app/",
    experience: "3+ years",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "HTML",
      "CSS",
      "CI/CD",
      "REST",
      "Git",
    ],
  };

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Detect clicks outside the start menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Close start menu if click is outside the start menu and not on the start button
      if (
        showStartMenu &&
        !target.closest(".start-menu-popup") &&
        !target.closest(".start-button") &&
        !target.closest(".taskbar-icon")
      ) {
        setShowStartMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStartMenu]);

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Function to fetch weather data based on geolocation - now using state setters
  const fetchWeatherData = () => {
    setIsLoading(true);
    try {
      // For brevity, using mock data
      setCurrentWeather({
        temperature: 29,
        condition: "Patchy light rain with thunder",
        high: 32,
        low: 24,
      });
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data");
      setIsLoading(false);
    }
  };

  // Create Windows List Explorer for windows
  const createWindowsListExplorer = (
    title: string,
    description: string,
    url: string,
    icon: string,
    type: "portfolio" | "blog" | "resume" | "github" | "linkedin",
    iconColor?: string
  ) => {
    return (
      <WindowsListExplorer
        title={title}
        description={description}
        url={url}
        icon={icon}
        iconColor={iconColor}
        type={type}
      />
    );
  };

  // Function to create a new window
  const createWindow = (
    id: string,
    title: string,
    icon: string,
    content: React.ReactNode,
    options = {}
  ) => {
    // Generate random initial position if not specified
    const randomX = Math.floor(Math.random() * 100) + 50;
    const randomY = Math.floor(Math.random() * 80) + 50;

    const defaultOptions = {
      iconColor: undefined,
      initialWidth: 800,
      initialHeight: 600,
      initialX: randomX,
      initialY: randomY,
    };

    // Check if window already exists
    const existingWindowIndex = windows.findIndex((w) => w.id === id);

    if (existingWindowIndex !== -1) {
      // Window exists, make it active or restore if minimized
      const updatedWindows = [...windows];
      updatedWindows.forEach((window, index) => {
        if (index === existingWindowIndex) {
          window.isActive = true;
          window.isMinimized = false;
        } else {
          window.isActive = false;
        }
      });

      setWindows(updatedWindows);
      return;
    }

    // Create new window
    const newWindow: WindowObject = {
      id,
      title,
      icon,
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      content,
      ...defaultOptions,
      ...options,
    };

    // Set all other windows as inactive
    const updatedWindows = windows.map((window) => ({
      ...window,
      isActive: false,
    }));

    setWindows([...updatedWindows, newWindow]);
  };

  // Handle window activation
  const handleWindowActivate = (id: string) => {
    const updatedWindows = windows.map((window) => ({
      ...window,
      isActive: window.id === id,
    }));

    setWindows(updatedWindows);
  };

  // Handle window close
  const handleWindowClose = (id: string) => {
    // Remove the window
    const remainingWindows = windows.filter((window) => window.id !== id);
    setWindows(remainingWindows);

    // If there are remaining windows, set the last one as active
    if (remainingWindows.length > 0) {
      const lastWindow = remainingWindows[remainingWindows.length - 1];

      const updatedWindows = remainingWindows.map((window) => ({
        ...window,
        isActive: window.id === lastWindow.id,
      }));

      setWindows(updatedWindows);
    }
  };

  // Handle window minimize
  const handleWindowMinimize = (id: string) => {
    const updatedWindows = windows.map((window) => {
      if (window.id === id) {
        return {
          ...window,
          isMinimized: true,
          isActive: false,
        };
      }
      return window;
    });

    setWindows(updatedWindows);

    // Find next window to activate
    const visibleWindows = updatedWindows.filter((w) => !w.isMinimized);
    if (visibleWindows.length > 0) {
      const nextActiveId = visibleWindows[visibleWindows.length - 1].id;
      handleWindowActivate(nextActiveId);
    }
  };

  // Handle window maximize
  const handleWindowMaximize = (id: string) => {
    const updatedWindows = windows.map((window) => {
      if (window.id === id) {
        return {
          ...window,
          isMaximized: !window.isMaximized,
          isActive: true,
        };
      } else {
        return {
          ...window,
          isActive: false,
        };
      }
    });

    setWindows(updatedWindows);
  };

  // Handle restore minimized window
  const handleRestoreWindow = (id: string) => {
    const updatedWindows = windows.map((window) => {
      if (window.id === id) {
        return {
          ...window,
          isMinimized: false,
          isActive: true,
        };
      } else {
        return {
          ...window,
          isActive: false,
        };
      }
    });

    setWindows(updatedWindows);
  };

  // Function to handle opening the project modal (original functionality)
  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
    // Close start menu if open
    if (showStartMenu) {
      setShowStartMenu(false);
    }
  };

  // Function to handle opening windows for each desktop icon
  const handleOpenWindow = (id: string) => {
    // Close the start menu if it's open
    if (showStartMenu) {
      setShowStartMenu(false);
    }

    // Create window based on id
    switch (id) {
      case "portfolio":
        createWindow(
          "portfolio",
          "Portfolio",
          "mdi:web",
          createWindowsListExplorer(
            "Portfolio - Olatunji Buari",
            "A showcase of my work, skills, and experience as a Senior Frontend Engineer with expertise in React, TypeScript, and modern web development.",
            "https://buariolatunji.netlify.app/",
            "mdi:web",
            "portfolio",
            "#1877f2"
          ),
          { iconColor: "#1877f2", initialWidth: 900, initialHeight: 600 }
        );
        break;
      case "blog":
        createWindow(
          "blog",
          "Blog",
          "mdi:post-outline",
          createWindowsListExplorer(
            "Medium Blog",
            "Read my articles on web development, frontend technologies, and software engineering best practices.",
            "https://medium.com/@olatunjibuari8",
            "mdi:post-outline",
            "blog",
            "#44a8b3"
          ),
          { iconColor: "#44a8b3", initialWidth: 900, initialHeight: 600 }
        );
        break;
      case "resume":
        createWindow(
          "resume",
          "Résumé",
          "mdi:file-pdf-box",
          createWindowsListExplorer(
            "Professional Résumé",
            "View my full professional résumé including my experience, skills, education, and achievements.",
            "https://drive.google.com/file/d/1b-5QtzA8b3ywoA6G-1wH8yajuekJtM3x/view",
            "mdi:file-pdf-box",
            "resume",
            "#f40f02"
          ),
          { iconColor: "#f40f02", initialWidth: 900, initialHeight: 600 }
        );
        break;
      case "github":
        createWindow(
          "github",
          "GitHub",
          "mdi:github",
          createWindowsListExplorer(
            "GitHub Profile",
            "Browse my open-source projects, contributions, and code repositories on GitHub.",
            "https://github.com/softtunex",
            "mdi:github",
            "github"
          ),
          { initialWidth: 900, initialHeight: 600 }
        );
        break;
      case "linkedin":
        createWindow(
          "linkedin",
          "LinkedIn",
          "mdi:linkedin",
          createWindowsListExplorer(
            "LinkedIn Profile",
            "Connect with me professionally and explore my work history, recommendations, and professional network.",
            "https://www.linkedin.com/in/olatunji-buari-a87031190/",
            "mdi:linkedin",
            "linkedin",
            "#0A66C2"
          ),
          { iconColor: "#0A66C2", initialWidth: 900, initialHeight: 600 }
        );
        break;
      case "fullscreen":
        toggleFullScreen();
        break;
      case "macos":
        if (onSwitchToMac) onSwitchToMac();
        break;
      default:
        break;
    }
  };

  // Define desktop icons data
  const desktopIcons = [
    {
      id: 1,
      label: "Projects",
      icon: "logos:javascript",
      badge: "8+",
      color: undefined,
      onClick: () => handleOpenProjectModal("projects"), // Original functionality
    },
    {
      id: 2,
      label: "Portfolio",
      avatar:
        "https://res.cloudinary.com/duwdwr0r9/image/upload/v1743427116/sticker_qg5max.png",
      color: "#1877f2",
      onClick: () => handleOpenWindow("portfolio"),
    },
    {
      id: 3,
      label: "Blog",
      icon: "mdi:post-outline",
      badge: "3",
      color: "#44a8b3",
      onClick: () => handleOpenWindow("blog"),
    },
    {
      id: 4,
      label: "macOS mode",
      icon: "mdi:apple",
      color: undefined,
      onClick: () => handleOpenWindow("macos"),
    },
    {
      id: 5,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: "#f40f02",
      onClick: () => handleOpenWindow("resume"),
    },
    {
      id: 6,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: undefined,
      onClick: () => handleOpenWindow("github"),
    },
    {
      id: 7,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: "#0A66C2",
      onClick: () => handleOpenWindow("linkedin"),
    },
    {
      id: 8,
      label: "Fullscreen",
      icon: isFullScreen ? "mdi:fullscreen-exit" : "mdi:fullscreen",
      color: undefined,
      onClick: () => handleOpenWindow("fullscreen"),
    },
  ];

  return (
    <div className="windows-desktop">
      <div className="desktop-background">
        <div className="desktop-icons-container">
          <div className="desktop-icons">
            {desktopIcons.map((icon) => (
              <div key={icon.id} className="icon" onClick={icon.onClick}>
                {icon.badge && <div className="icon-badge">{icon.badge}</div>}
                <div className="icon-img">
                  {icon.avatar ? (
                    <img
                      src={icon.avatar}
                      alt="User"
                      className="dock-avatar"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Icon
                      icon={icon.icon || ""}
                      width="28"
                      color={icon.color}
                    />
                  )}
                </div>
                <div className="icon-label">{icon.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Render all windows */}
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            iconColor={window.iconColor}
            isActive={window.isActive}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            initialWidth={window.initialWidth}
            initialHeight={window.initialHeight}
            initialX={window.initialX}
            initialY={window.initialY}
            onClose={handleWindowClose}
            onMinimize={handleWindowMinimize}
            onMaximize={handleWindowMaximize}
            onActivate={handleWindowActivate}
            className={window.id}
          >
            {window.content}
          </Window>
        ))}

        {/* Windows taskbar */}
        <div className="taskbar">
          {/* Weather information - on the left */}
          <div className="weather-widget taskbar-left">
            {!isLoading && !error && (
              <>
                <Icon
                  icon="mdi:weather-lightning-rainy"
                  width="16"
                  style={{ margin: "0 4px" }}
                  color="#FFD700"
                />
                <span className="temperature">
                  {currentWeather.temperature}°C
                </span>
                <span className="condition">{currentWeather.condition}</span>
              </>
            )}
            {isLoading && <span>Loading weather...</span>}
            {error && (
              <>
                <Icon
                  icon="mdi:weather-lightning-rainy"
                  width="16"
                  style={{ margin: "0 4px" }}
                  color="#FFD700"
                />
                <span style={{ color: "#fff" }}>
                  29°C Patchy light rain with thunder
                </span>
              </>
            )}
          </div>

          {/* Taskbar icons - centered with icons from the original design */}
          <div className="taskbar-icons">
            <div className="taskbar-icon">
              <Icon
                onClick={() => setShowStartMenu(!showStartMenu)}
                icon="mdi:microsoft-windows"
                width="22"
                color="#1E90FF"
              />
            </div>
            <div className="taskbar-icon">
              <img
                src={userInfo.avatar}
                alt="User"
                className="dock-avatar"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="taskbar-icon badge-container"
              onClick={() => handleOpenProjectModal("projects")}
            >
              <Icon icon="logos:javascript" width="22" />
              <div className="taskbar-badge">8+</div>
            </div>

            {/* Add the minimized windows to the taskbar */}
            {windows.map((window) => (
              <div
                key={window.id}
                className={`taskbar-icon ${window.isActive ? "active" : ""} ${
                  window.isMinimized ? "minimized" : ""
                }`}
                onClick={() =>
                  window.isMinimized
                    ? handleRestoreWindow(window.id)
                    : handleWindowActivate(window.id)
                }
                style={{
                  display:
                    window.id === "fullscreen" || window.id === "macos"
                      ? "none"
                      : "flex",
                }}
              >
                <Icon icon={window.icon} width="22" color={window.iconColor} />
                {window.isActive && !window.isMinimized && (
                  <div className="taskbar-indicator"></div>
                )}
              </div>
            ))}

            <div className="taskbar-icon">
              <Icon icon="mdi:email" width="22" color="#4DB6E5" />
            </div>
            <div className="taskbar-icon">
              <Icon icon="mdi:calendar" width="22" color="#4DB6E5" />
            </div>
          </div>

          {/* Right side of taskbar */}
          <div className="taskbar-right">
            {/* System tray icons */}
            <div className="notification-area">
              <Icon icon="mdi:wifi" width="16" color="#4CAF50" />
              <Icon icon="mdi:volume-high" width="16" color="#FFFFFF" />
              <Icon icon="mdi:battery" width="16" color="#FFFFFF" />
            </div>

            <div className="taskbar-divider"></div>

            {/* Time and language */}
            <div className="time-widget">
              <div className="time">{time}</div>
              <div className="language">ENG</div>
            </div>
          </div>
        </div>

        {/* Start Menu Component */}
        <StartMenu
          isOpen={showStartMenu}
          onClose={() => setShowStartMenu(false)}
          onOpenProjectModal={handleOpenProjectModal}
          userInfo={userInfo}
        />

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

        {/* Project Modal - original functionality */}
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
