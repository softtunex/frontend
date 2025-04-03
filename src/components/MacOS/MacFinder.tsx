import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./MacFinder.css";

interface MacFinderProps {
  title: string;
  description: string;
  url: string;
  icon: string;
  iconColor?: string;
  type: "portfolio" | "blog" | "resume" | "github" | "linkedin";
  files?: Array<{
    name: string;
    icon: string;
    type: string;
    date: string;
    size?: string;
    isFolder?: boolean;
  }>;
}

const MacFinder: React.FC<MacFinderProps> = ({
  title,
  description,
  url,
  icon,
  iconColor,
  type,
}) => {
  const [viewMode, setViewMode] = useState<
    "icon" | "list" | "column" | "gallery"
  >("list");
  const [sidebarWidth, setSidebarWidth] = useState(180);

  const handleRedirect = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Format the current date for display
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get the formatted file name based on type
  const getFormattedFileName = () => {
    switch (type) {
      case "portfolio":
        return "Portfolio Website";
      case "blog":
        return "Blog Articles";
      case "resume":
        return "Resume.pdf";
      case "github":
        return "GitHub Repository";
      case "linkedin":
        return "LinkedIn Profile";
      default:
        return title;
    }
  };

  // Get the appropriate icon based on content type
  const getTypeIcon = () => {
    switch (type) {
      case "portfolio":
        return "mdi:web";
      case "blog":
        return "mdi:post-outline";
      case "resume":
        return "mdi:file-pdf-box";
      case "github":
        return "mdi:github";
      case "linkedin":
        return "mdi:linkedin";
      default:
        return icon;
    }
  };

  // Get sample file size
  const getFileSize = () => {
    const sizes = ["245 KB", "316 KB", "178 KB", "422 KB"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  return (
    <div className={`mac-finder ${type}`}>
      {/* Finder Toolbar */}
      <div className="mac-finder-toolbar">
        <div className="mac-finder-navigation">
          <button className="mac-finder-nav-button">
            <Icon icon="mdi:chevron-left" width="16" />
          </button>
          <button className="mac-finder-nav-button">
            <Icon icon="mdi:chevron-right" width="16" />
          </button>
        </div>
        <div className="mac-finder-view-options">
          <button
            className={`mac-finder-view-button ${
              viewMode === "icon" ? "active" : ""
            }`}
            onClick={() => setViewMode("icon")}
          >
            <Icon icon="mdi:view-grid-outline" width="16" />
          </button>
          <button
            className={`mac-finder-view-button ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            <Icon icon="mdi:format-list-bulleted" width="16" />
          </button>
          <button
            className={`mac-finder-view-button ${
              viewMode === "column" ? "active" : ""
            }`}
            onClick={() => setViewMode("column")}
          >
            <Icon icon="mdi:view-column-outline" width="16" />
          </button>
          <button
            className={`mac-finder-view-button ${
              viewMode === "gallery" ? "active" : ""
            }`}
            onClick={() => setViewMode("gallery")}
          >
            <Icon icon="mdi:view-gallery-outline" width="16" />
          </button>
        </div>
        <div className="mac-finder-path-indicator">
          <span>Documents</span>
        </div>
        <div className="mac-finder-search">
          <Icon icon="mdi:magnify" width="16" />
          <input type="text" placeholder="Search" readOnly />
        </div>
      </div>

      {/* Main Finder Content */}
      <div className="mac-finder-content">
        {/* Sidebar */}
        <div
          className="mac-finder-sidebar"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="mac-finder-sidebar-section">
            <div className="mac-finder-sidebar-item">
              <Icon icon="mdi:apple-icloud" width="16" color="#1D93EF" />
              <span>iCloud</span>
            </div>
            <div
              className="mac-finder-sidebar-item"
              style={{ paddingLeft: "20px" }}
            >
              <Icon icon="mdi:folder" width="16" color="#1D93EF" />
              <span>iCloud Drive</span>
            </div>
            <div
              className="mac-finder-sidebar-item"
              style={{ paddingLeft: "20px" }}
            >
              <Icon
                icon="mdi:file-document-outline"
                width="16"
                color="#1D93EF"
              />
              <span>Documents</span>
            </div>
          </div>

          <div className="mac-finder-sidebar-section">
            <div className="mac-finder-sidebar-header">Favourites</div>
            <div className="mac-finder-sidebar-item">
              <Icon icon="mdi:desktop-mac" width="16" color="#1D93EF" />
              <span>Desktop</span>
            </div>
            <div className="mac-finder-sidebar-item active">
              <Icon icon="mdi:folder" width="16" color="#1D93EF" />
              <span>Documents</span>
            </div>
            <div className="mac-finder-sidebar-item">
              <Icon
                icon="mdi:share-variant-outline"
                width="16"
                color="#1D93EF"
              />
              <span>Shared</span>
            </div>
          </div>
          <div className="mac-finder-sidebar-section">
            <div className="mac-finder-sidebar-header">Tags</div>
            <div className="mac-finder-sidebar-item">
              <div className="mac-finder-tag red"></div>
              <span>Red</span>
            </div>
            <div className="mac-finder-sidebar-item">
              <div className="mac-finder-tag orange"></div>
              <span>Orange</span>
            </div>
            <div className="mac-finder-sidebar-item">
              <div className="mac-finder-tag green"></div>
              <span>Green</span>
            </div>
          </div>
        </div>

        {/* Resize handle for sidebar */}
        <div
          className="mac-finder-resize-handle"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = sidebarWidth;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = startWidth + (moveEvent.clientX - startX);
              if (newWidth >= 120 && newWidth <= 300) {
                setSidebarWidth(newWidth);
              }
            };

            const handleMouseUp = () => {
              document.removeEventListener("mousemove", handleMouseMove);
              document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
          }}
        />

        {/* File Browser Area */}
        <div className="mac-finder-files">
          <div className="mac-finder-path-bar">
            <div className="mac-finder-path-item">
              <Icon icon="mdi:folder" width="14" color="#1D93EF" />
              <span>Documents</span>
            </div>
            <Icon icon="mdi:chevron-right" width="14" color="#888" />
            <div className="mac-finder-path-item">
              <Icon icon="mdi:folder" width="14" color="#1D93EF" />
              <span>Projects</span>
            </div>
            <Icon icon="mdi:chevron-right" width="14" color="#888" />
            <div className="mac-finder-path-item current">
              <Icon icon={getTypeIcon()} width="14" color={iconColor} />
              <span>{getFormattedFileName()}</span>
            </div>
          </div>

          <div className="mac-finder-files-container">
            {/* Gallery View */}
            {viewMode === "gallery" && (
              <div
                className="mac-finder-gallery-view"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div
                  className="mac-finder-gallery-item"
                  onClick={handleRedirect}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    gap: "20px",
                    backgroundColor: "#333333",
                    borderRadius: "12px",
                    maxWidth: "450px",
                    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div
                    className="mac-finder-preview"
                    style={{ textAlign: "center" }}
                  >
                    <Icon
                      icon={getTypeIcon()}
                      width="120"
                      color={iconColor || "#0066CC"}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 500,
                        color: "#ffffff",
                        marginBottom: "10px",
                      }}
                    >
                      {getFormattedFileName()}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#cccccc",
                        marginBottom: "20px",
                        lineHeight: "1.4",
                      }}
                    >
                      {description}
                    </div>
                    <a
                      href={url}
                      className="mac-finder-visit-button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRedirect();
                      }}
                      style={{
                        display: "inline-block",
                        padding: "10px 20px",
                        backgroundColor: "#0066CC",
                        color: "white",
                        borderRadius: "6px",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Visit {type.charAt(0).toUpperCase() + type.slice(1)}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="mac-finder-list-view">
                <div className="mac-finder-list-header">
                  <div className="mac-finder-list-col name">Name</div>
                  <div className="mac-finder-list-col date">Date Modified</div>
                  <div className="mac-finder-list-col size">Size</div>
                  <div className="mac-finder-list-col kind">Kind</div>
                </div>
                <div className="mac-finder-list-item" onClick={handleRedirect}>
                  <div className="mac-finder-list-col name">
                    <Icon icon={getTypeIcon()} width="16" color="#0066CC" />
                    <span style={{ marginLeft: "8px" }}>{title}</span>
                  </div>
                  <div className="mac-finder-list-col date">Apr 3, 2023</div>
                  <div className="mac-finder-list-col size">378 KB</div>
                  <div className="mac-finder-list-col kind">
                    {type === "portfolio"
                      ? "Website"
                      : type === "blog"
                      ? "Blog"
                      : type === "resume"
                      ? "PDF Document"
                      : type === "github"
                      ? "Repository"
                      : "Web Link"}
                  </div>
                </div>
              </div>
            )}

            {/* Icon View */}
            {viewMode === "icon" && (
              <div className="mac-finder-icon-view">
                <div className="mac-finder-icon-item" onClick={handleRedirect}>
                  <div className="mac-finder-icon">
                    <Icon icon={getTypeIcon()} width="60" color={iconColor} />
                  </div>
                  <div className="mac-finder-icon-name">
                    {getFormattedFileName()}
                  </div>
                </div>
              </div>
            )}

            {/* Column View */}
            {viewMode === "column" && (
              <div className="mac-finder-column-view">
                <div className="mac-finder-column">
                  <div className="mac-finder-column-header">Documents</div>
                  <div className="mac-finder-column-item active">
                    <Icon icon="mdi:folder" width="16" color="#1D93EF" />
                    <span>Projects</span>
                  </div>
                  <div className="mac-finder-column-item">
                    <Icon icon="mdi:folder" width="16" color="#1D93EF" />
                    <span>Personal</span>
                  </div>
                </div>
                <div className="mac-finder-column">
                  <div className="mac-finder-column-header">Projects</div>
                  <div className="mac-finder-column-item active">
                    <Icon icon={getTypeIcon()} width="16" color={iconColor} />
                    <span>{getFormattedFileName()}</span>
                  </div>
                </div>
                <div className="mac-finder-column mac-finder-preview-column">
                  <div className="mac-finder-preview-content">
                    <div className="mac-finder-preview-icon">
                      <Icon icon={getTypeIcon()} width="80" color={iconColor} />
                    </div>
                    <div className="mac-finder-preview-name">
                      {getFormattedFileName()}
                    </div>
                    <div className="mac-finder-preview-meta">
                      <div className="mac-finder-preview-item">
                        <span className="label">Kind:</span>
                        <span className="value">
                          {type === "portfolio"
                            ? "Website"
                            : type === "blog"
                            ? "Blog"
                            : type === "resume"
                            ? "PDF Document"
                            : type === "github"
                            ? "Repository"
                            : "Web Link"}
                        </span>
                      </div>
                      <div className="mac-finder-preview-item">
                        <span className="label">Size:</span>
                        <span className="value">{getFileSize()}</span>
                      </div>
                      <div className="mac-finder-preview-item">
                        <span className="label">Created:</span>
                        <span className="value">{getCurrentDate()}</span>
                      </div>
                      <div className="mac-finder-preview-item">
                        <span className="label">Modified:</span>
                        <span className="value">{getCurrentDate()}</span>
                      </div>
                      <div className="mac-finder-preview-item">
                        <span className="label">URL:</span>
                        <span className="value url">{url}</span>
                      </div>
                    </div>
                    <button
                      className="mac-finder-preview-button"
                      onClick={handleRedirect}
                    >
                      Open in Browser
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Finder Status Bar */}
      <div className="mac-finder-status-bar">
        <div className="mac-finder-status-item">1 item</div>
        <div className="mac-finder-status-spacer"></div>
        <div className="mac-finder-status-item">
          <Icon icon="mdi:dots-horizontal" width="16" />
        </div>
      </div>
    </div>
  );
};

export default MacFinder;
