import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Windows.css";
import Window from "../WindowModal/Window";
import ProjectModal from "../ProjectModal/ProjectModal";
import StartMenu from "../StartMenu/StartMenu";
import WindowsListExplorer from "../WindowModal/SitePreview";
import { userConfig } from "../../shared/userConfig";
import { useTheme } from "../../hooks/useTheme"; // Import the hook
import { colors } from "../../shared/themeConfig"; // Import colors directly
import { LINKS } from "../../shared/linksConfig";

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
  const theme = useTheme();
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

  const userInfo = userConfig;

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Define taskbar items - similar to Mac dock items
  const taskbarItems = [
    {
      id: "start",
      icon: "mdi:microsoft-windows",
      color: colors.platforms.windows.primary, // Use theme color
      onClick: () => setShowStartMenu(!showStartMenu),
    },
    {
      id: "user",
      avatar: userInfo.avatar,
      onClick: () => handleOpenWindow("portfolio"),
    },
    {
      id: "projects",
      icon: "logos:javascript",
      badge: "8+",
      onClick: () => handleOpenProjectModal("projects"),
    },
    {
      id: "email",
      icon: "mdi:email",
      color: colors.platforms.windows.accent, // Use theme color
      onClick: () => window.open(`mailto:${userInfo.email}`, "_blank"),
    },
    {
      id: "calendar",
      icon: "mdi:calendar",
      color: colors.platforms.windows.accent, // Use theme color
      onClick: () => window.open("https://calendar.google.com", "_blank"),
    },
  ];

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
      initialWidth: theme.getWindowDimensions("default").width,
      initialHeight: theme.getWindowDimensions("default").height,
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
            LINKS.PORTFOLIO,
            "mdi:web",
            "portfolio",
            colors.projects.portfolio
          ),
          {
            iconColor: colors.projects.portfolio,
            initialWidth: theme.getWindowDimensions("default").width,
            initialHeight: theme.getWindowDimensions("default").height,
          }
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
            LINKS.MEDIUM,
            "mdi:post-outline",
            "blog",
            colors.projects.blog
          ),
          {
            iconColor: colors.projects.blog,
            initialWidth: theme.getWindowDimensions("default").width,
            initialHeight: theme.getWindowDimensions("default").height,
          }
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
            LINKS.RESUME,
            "mdi:file-pdf-box",
            "resume",
            colors.projects.resume
          ),
          {
            iconColor: colors.projects.resume,
            initialWidth: theme.getWindowDimensions("default").width,
            initialHeight: theme.getWindowDimensions("default").height,
          }
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
            LINKS.GITHUB,
            "mdi:github",
            "github"
          ),
          {
            initialWidth: theme.getWindowDimensions("default").width,
            initialHeight: theme.getWindowDimensions("default").height,
          }
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
            LINKS.LINKEDIN,
            "mdi:linkedin",
            "linkedin",
            colors.projects.linkedin
          ),
          {
            iconColor: colors.projects.linkedin,
            initialWidth: theme.getWindowDimensions("default").width,
            initialHeight: theme.getWindowDimensions("default").height,
          }
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
      onClick: () => handleOpenProjectModal("projects"),
    },
    {
      id: 2,
      label: "Portfolio",
      avatar: userInfo.avatar,
      color: colors.projects.portfolio, // Use theme color
      onClick: () => handleOpenWindow("portfolio"),
    },
    {
      id: 3,
      label: "Blog",
      icon: "mdi:post-outline",
      badge: "3",
      color: colors.projects.blog, // Use theme color
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
      color: colors.projects.resume, // Use theme color
      onClick: () => handleOpenWindow("resume"),
    },
    {
      id: 6,
      label: "Github",
      icon: "mdi:github",
      badge: "10+",
      color: colors.projects.github, // Use theme color
      onClick: () => handleOpenWindow("github"),
    },
    {
      id: 7,
      label: "LinkedIn",
      icon: "mdi:linkedin",
      badge: "4K+",
      color: colors.projects.linkedin, // Use theme color
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
                        width: `${theme.getIconSize("desktop")}px`, // Use theme size
                        height: `${theme.getIconSize("desktop")}px`, // Use theme size
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Icon
                      icon={icon.icon || ""}
                      width={theme.getIconSize("large")}
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

          {/* Taskbar icons - centered with proper click handlers */}
          <div className="taskbar-icons">
            {/* Static taskbar items with proper onClick handlers */}
            {taskbarItems.map((item) => (
              <div
                key={item.id}
                className={`taskbar-icon ${item.badge ? "badge-container" : ""}`}
                onClick={item.onClick}
              >
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt="User"
                    className="dock-avatar"
                    style={{
                      width: `${theme.getIconSize("desktop")}px`,
                      height: `${theme.getIconSize("desktop")}px`,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Icon
                    icon={item.icon || ""}
                    width={theme.getIconSize("medium")}
                    color={item.color}
                  />
                )}
                {item.badge && (
                  <div className="taskbar-badge">{item.badge}</div>
                )}
              </div>
            ))}

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
                <Icon
                  icon={window.icon}
                  width={theme.getIconSize("medium")}
                  color={window.iconColor}
                />
                {window.isActive && !window.isMinimized && (
                  <div className="taskbar-indicator"></div>
                )}
              </div>
            ))}
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
