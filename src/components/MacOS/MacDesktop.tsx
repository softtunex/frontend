import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./Mac.css";
import ProjectModal from "../ProjectModal/ProjectModal";
import MacWindow from "./MacWindow";
import MacFinder from "./MacFinder";
import MenuDropdown from "./MenuDropdown";
import AboutMeModal from "./AboutMeModal";
import ContactModal from "./ContactModal";
import { userConfig, getContactInfo } from "../../shared/userConfig";
import { useTheme } from "../../hooks/useTheme";
import { colors } from "../../shared/themeConfig";
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
  const theme = useTheme();
  const [showNotification, setShowNotification] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(weather);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Add state for project modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);

  // Windows state
  const [windows, setWindows] = useState<WindowObject[]>([]);

  // Menu state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Handle apple menu click

  // Define menu options
  const appleMenuOptions = [
    { id: "about-me", label: "About Me" },
    { id: "contact", label: "Contact" },
    { id: "divider-1", divider: true },
    { id: "projects", label: "Projects" },
    { id: "buy-me-coffee", label: "BuyMeACoffee", icon: "mdi:coffee" },
  ];

  // Add contact info

  const userInfo = userConfig;

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

  // Detect clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        activeMenu &&
        !target.closest(".mac-menu-dropdown") &&
        !target.closest(".menu-item")
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

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

  // Function to fetch weather data based on geolocation
  const fetchWeatherData = () => {
    setIsLoading(true);
    setError(null);

    // Mock data for demonstration
    setTimeout(() => {
      setCurrentWeather({
        temperature: 29,
        condition: "Clear",
        high: 32,
        low: 24,
      });
      setIsLoading(false);
    }, 1000);
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

  // Create MacFinder for windows
  const createMacFinder = (
    title: string,
    description: string,
    url: string,
    icon: string,
    type: "portfolio" | "blog" | "resume" | "github" | "linkedin",
    iconColor?: string
  ) => {
    return (
      <MacFinder
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
    const randomY = Math.floor(Math.random() * 60) + 50;

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

  // Function to handle opening the project modal
  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  // Function to handle opening windows for each desktop icon
  const handleOpenWindow = (id: string) => {
    // Create window based on id
    switch (id) {
      case "portfolio":
        createWindow(
          "portfolio",
          "Portfolio",
          "mdi:web",
          createMacFinder(
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
          createMacFinder(
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
          createMacFinder(
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
          createMacFinder(
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
          createMacFinder(
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
      case "windows":
        if (onSwitchToWindows) onSwitchToWindows();
        break;
      default:
        break;
    }
  };

  // Function to open link in a new tab
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const contactInfo = getContactInfo();

  // Function to toggle menu dropdown
  const handleAppleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    setMenuPosition({
      x: rect.left,
      y: rect.bottom,
    });

    setActiveMenu(activeMenu === "apple" ? null : "apple");
  };

  // Handle menu item select
  const handleMenuItemSelect = (id: string) => {
    setActiveMenu(null);

    switch (id) {
      case "about-me":
        setShowAboutMe(true);
        break;
      case "contact":
        setShowContact(true);
        break;
      case "projects":
        handleOpenProjectModal("projects");
        break;
      case "buy-me-coffee":
        window.open(LINKS.BUY_ME_COFFEE, "_blank");
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
      color: colors.projects.portfolio,
      onClick: () => handleOpenWindow("portfolio"),
    },
    {
      id: 3,
      label: "Blog",
      icon: "mdi:post-outline",
      badge: "3",
      color: colors.projects.blog,
      onClick: () => handleOpenWindow("blog"),
    },
    {
      id: 4,
      label: "Windows mode",
      icon: "mdi:microsoft-windows",
      color: undefined,
      onClick: () => handleOpenWindow("windows"),
    },
    {
      id: 5,
      label: "Résumé",
      icon: "mdi:file-pdf-box",
      color: colors.projects.resume,
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
      color: colors.projects.linkedin,
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

  // Define dock items
  const dockItems = [
    {
      id: "finder",
      icon: "mdi:folder",
      color: colors.platforms.mac.accent,
      onClick: () => {},
    },
    {
      id: "portfolio",
      avatar: userInfo.avatar,
      color: colors.platforms.mac.accent,
      onClick: () => handleOpenWindow("portfolio"),
      isOpen: windows.some((w) => w.id === "portfolio" && !w.isMinimized),
    },
    {
      id: "mail",
      icon: "mdi:email",
      color: colors.platforms.mac.accent,
      onClick: () => openLink(LINKS.EMAIL),
    },
    {
      id: "projects",
      icon: "logos:javascript",
      badge: "8+",
      onClick: () => handleOpenProjectModal("projects"),
    },
    {
      id: "user",
      icon: "mdi:account-circle",
      color: colors.platforms.mac.accent,
      onClick: () => setShowAboutMe(true),
    },
  ];

  return (
    <div className="mac-desktop">
      <div className="desktop-background">
        <div className="menu-bar">
          <div className="menu-bar-left">
            <div className="apple-logo" onClick={handleAppleMenuClick}>
              <Icon icon="mdi:apple" width={theme.getIconSize("small")} />
            </div>
            <div className="menu-item">Finder</div>
            <div className="menu-item" onClick={() => setShowAboutMe(true)}>
              About Me
            </div>
            <div className="menu-item" onClick={() => setShowContact(true)}>
              Contact
            </div>
            <div
              className="menu-item"
              onClick={() => handleOpenProjectModal("projects")}
            >
              Projects
            </div>
          </div>
          <div className="menu-bar-right">
            <div className="menu-item">
              <Icon icon="mdi:wifi" width={theme.getIconSize("small")} />
            </div>
            <div className="menu-item">
              <Icon icon="mdi:battery" width={theme.getIconSize("small")} />
            </div>
            <div className="menu-item">EN</div>
            <div className="menu-item">{`${formattedDate} ${time}`}</div>
          </div>
        </div>

        {/* Apple Menu Dropdown */}
        {activeMenu === "apple" && (
          <MenuDropdown
            options={appleMenuOptions}
            position={menuPosition}
            isOpen={true}
            onClose={() => setActiveMenu(null)}
            onSelect={handleMenuItemSelect}
          />
        )}

        {showNotification && (
          <div className="notification">
            <div className="notification-icon">
              <Icon icon="mdi:lightbulb-on-outline" width="24" />
            </div>
            <div className="notification-content">
              <div className="notification-title">Did you know?</div>
              <div className="notification-message">
                This portfolio mimics both Windows and macOS interfaces. Try
                them both!
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
              <div key={icon.id} className="icon" onClick={icon.onClick}>
                {icon.badge && <div className="icon-badge">{icon.badge}</div>}
                <div className="icon-img">
                  {icon.avatar ? (
                    <img
                      src={icon.avatar}
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
                      icon={icon.icon || ""}
                      width={theme.getIconSize("large")}
                      color={icon.color}
                    />
                  )}
                  {/* <Icon icon={icon.icon} width={theme.getIconSize('large')} color={icon.color} /> */}
                </div>
                <div className="icon-label">{icon.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Render all windows using MacWindow component */}
        {windows.map((window) => (
          <MacWindow
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
          </MacWindow>
        ))}

        {/* About Me Modal */}
        <AboutMeModal
          isOpen={showAboutMe}
          onClose={() => setShowAboutMe(false)}
          userInfo={userInfo}
          onProjectsClick={() => {
            setShowAboutMe(false);
            handleOpenProjectModal("projects");
          }}
          onContactClick={() => {
            setShowAboutMe(false);
            setShowContact(true);
          }}
        />

        {/* Contact Modal */}
        <ContactModal
          isOpen={showContact}
          onClose={() => setShowContact(false)}
          contactInfo={contactInfo}
          onAboutMeClick={() => {
            setShowContact(false);
            setShowAboutMe(true);
          }}
        />

        {/* Weather Widget */}
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
          {dockItems.map((item) => (
            <div
              key={item.id}
              className={`dock-item ${
                windows.some((w) => w.id === item.id && !w.isMinimized)
                  ? "active"
                  : ""
              }`}
              onClick={item.onClick}
            >
              {item.badge && <div className="dock-badge">{item.badge}</div>}

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
                  width={theme.getIconSize("large")}
                  color={item.color}
                />
              )}
              {/* Indicator for open windows */}
              {windows.some((w) => w.id === item.id && !w.isMinimized) && (
                <div className="dock-dot"></div>
              )}
            </div>
          ))}

          {/* Add minimized windows to the dock */}
          {windows.map((window) => {
            // Skip windows that are already in dockItems
            if (!dockItems.some((item) => item.id === window.id)) {
              return (
                <div
                  key={window.id}
                  className={`dock-item ${!window.isMinimized ? "active" : ""}`}
                  onClick={() =>
                    window.isMinimized
                      ? handleRestoreWindow(window.id)
                      : handleWindowActivate(window.id)
                  }
                >
                  <Icon
                    icon={window.icon}
                    width={theme.getIconSize("large")}
                    color={window.iconColor}
                  />
                  {!window.isMinimized && <div className="dock-dot"></div>}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Made with banner */}
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
