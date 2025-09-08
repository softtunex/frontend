// iOSInterface.tsx - Authentic iPhone Design
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./iOS.css";
import { userConfig } from "../../shared/userConfig";
import { LINKS, openExternalLink } from "../../shared/linksConfig";
import ProjectModal from "../ProjectModal/ProjectModal"; // Import ProjectModal

interface IOSProps {
  weather: {
    temperature: number;
    condition: string;
    forecast: Array<{
      day: number;
      temperature: number;
      condition: string;
    }>;
  };
  onSwitchOS?: () => void;
}

const IOSInterface: React.FC<IOSProps> = ({ weather, onSwitchOS }) => {
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(
    !!document.fullscreenElement
  );

  // --- MODAL STATE handled internally, like MacDesktop.tsx ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenProjectModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

  const appPages = [
    [
      {
        id: "calendar",
        name: "Calendar",
        type: "calendar",
        day: currentDate.getDate(),
        onClick: () => openExternalLink(LINKS.CALENDAR),
      },
      {
        id: "portfolio",
        name: "Portfolio",
        icon: "mdi:briefcase",
        color: "#FF9500",
        onClick: () => openExternalLink(LINKS.PORTFOLIO),
      },
      {
        id: "projects",
        name: "Projects",
        icon: "mdi:folder-multiple",
        color: "#007AFF",
        onClick: handleOpenProjectModal, // Use internal handler
      },
      {
        id: "github",
        name: "GitHub",
        icon: "mdi:github",
        color: "#1F2328",
        onClick: () => openExternalLink(LINKS.GITHUB),
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        icon: "mdi:linkedin",
        color: "#0A66C2",
        onClick: () => openExternalLink(LINKS.LINKEDIN),
      },
      {
        id: "resume",
        name: "Resume",
        icon: "mdi:file-document",
        color: "#FF3B30",
        onClick: () => openExternalLink(LINKS.RESUME),
      },
      {
        id: "mail",
        name: "Mail",
        icon: "mdi:email",
        color: "#007AFF",
        onClick: () => window.open(LINKS.EMAIL),
      },
      {
        id: "phone",
        name: "Phone",
        icon: "mdi:phone",
        color: "#34C759",
        onClick: () => window.open(LINKS.PHONE),
      },
      {
        id: "switch-os",
        name: "Android Mode",
        icon: "mdi:android",
        color: "#A4C639",
        onClick: onSwitchOS,
      },
      {
        id: "fullscreen",
        name: "Fullscreen",
        icon: isFullScreen ? "mdi:fullscreen-exit" : "mdi:fullscreen",
        color: "#8E8E93",
        onClick: toggleFullScreen,
      },
    ],
  ];

  const dockApps = [
    {
      icon: "mdi:phone",
      color: "#34C759",
      name: "Phone",
      onClick: () => window.open(LINKS.PHONE),
    },
    {
      icon: "mdi:email",
      color: "#007AFF",
      name: "Mail",
      onClick: () => window.open(LINKS.EMAIL),
    },
    {
      icon: "mdi:compass",
      color: "#007AFF",
      name: "Safari",
      onClick: () => openExternalLink(LINKS.PORTFOLIO),
    },
    { icon: "mdi:music", color: "#FA2D48", name: "Music" },
  ];

  const AppIcon: React.FC<{ app: any }> = ({ app }) => {
    if (app.type === "calendar") {
      return (
        <div className="iphone-app" onClick={app.onClick}>
          <div className="iphone-app-icon calendar-icon">
            <div className="calendar-red-header">
              <div className="calendar-month">
                {currentDate
                  .toLocaleDateString("en", { month: "short" })
                  .toUpperCase()}
              </div>
            </div>
            <div className="calendar-day-number">{app.day}</div>
          </div>
          <div className="iphone-app-name">{app.name}</div>
        </div>
      );
    }

    return (
      <div className="iphone-app" onClick={app.onClick}>
        <div className="iphone-app-icon" style={{ backgroundColor: app.color }}>
          <Icon icon={app.icon} width="40" color="white" />
        </div>
        <div className="iphone-app-name">{app.name}</div>
      </div>
    );
  };

  return (
    <>
      <div className="iphone-container">
        <div className="iphone-frame">
          <div className="dynamic-island"></div>
          <div className="iphone-status-bar">
            <div className="status-left">
              <span className="current-time">{time}</span>
            </div>
            <div className="status-right">
              <div className="cellular-signal">
                <div className="signal-dot"></div>
                <div className="signal-dot"></div>
                <div className="signal-dot active"></div>
                <div className="signal-dot active"></div>
              </div>
              <Icon icon="mdi:wifi" width="17" color="white" />
              <div className="battery-indicator">
                <div className="battery-fill"></div>
              </div>
            </div>
          </div>
          <div className="iphone-home-screen">
            <div className="iphone-apps-container">
              <div className="iphone-apps-grid">
                {appPages[currentPage]
                  ?.filter((app) =>
                    onSwitchOS ? true : app.id !== "switch-os"
                  )
                  .map((app) => (
                    <AppIcon key={app.id} app={app} />
                  ))}
              </div>
            </div>
            <div className="page-indicators">
              <div className="page-dot active"></div>
              <div className="page-dot"></div>
            </div>
            <div className="iphone-dock">
              {dockApps.map((app, index) => (
                <div key={index} className="dock-app" onClick={app.onClick}>
                  <div
                    className="dock-app-icon"
                    style={{ backgroundColor: app.color }}
                  >
                    <Icon icon={app.icon} width="32" color="white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="home-indicator"></div>
        </div>
        {showSpotlight && (
          <div
            className="spotlight-overlay"
            onClick={() => setShowSpotlight(false)}
          >
            <div
              className="spotlight-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="spotlight-search-bar">
                <Icon icon="mdi:magnify" width="20" color="#666" />
                <input type="text" placeholder="Search" />
              </div>
              <div className="spotlight-results">
                <div
                  className="spotlight-result"
                  onClick={handleOpenProjectModal}
                >
                  <Icon icon="mdi:folder-multiple" width="24" color="#007AFF" />
                  <span>Projects</span>
                </div>
                <div
                  className="spotlight-result"
                  onClick={() => openExternalLink(LINKS.PORTFOLIO)}
                >
                  <Icon icon="mdi:briefcase" width="24" color="#FF9500" />
                  <span>Portfolio</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- RENDER MODAL HERE, like MacDesktop.tsx --- */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId="projects"
        osType="mac" // iOS UI uses macOS-style modal
      />
    </>
  );
};

export default IOSInterface;
