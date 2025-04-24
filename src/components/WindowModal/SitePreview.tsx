import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./SitePreview.css";

interface WindowsListExplorerProps {
  title: string;
  description: string;
  url: string;
  icon: string;
  iconColor?: string;
  type: "portfolio" | "blog" | "resume" | "github" | "linkedin";
}

const WindowsListExplorer: React.FC<WindowsListExplorerProps> = ({
  title,
  description,
  url,
  icon,
  iconColor,
  type,
}) => {
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"details" | "list">("details");

  const handleRedirect = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Generate some mock date
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Generate file size based on type
  const getFileSize = () => {
    const sizes = ["109 KB", "245 KB", "316 KB", "178 KB", "422 KB"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  // Generate dimensions for image files
  const getDimensions = () => {
    const dimensions = [
      "1010 x 1010",
      "1920 x 1080",
      "800 x 600",
      "1200 x 630",
    ];
    return dimensions[Math.floor(Math.random() * dimensions.length)];
  };

  // Get file type based on link type
  const getFileType = () => {
    switch (type) {
      case "portfolio":
        return "HTML File";
      case "blog":
        return "Website Link";
      case "resume":
        return "PDF Document";
      case "github":
        return "Repository Link";
      case "linkedin":
        return "Profile Link";
      default:
        return "URL Link";
    }
  };

  // Get file icon based on type
  const getFileIcon = () => {
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

  // Format the URL for display
  const formatFileName = () => {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace("www.", "");

    switch (type) {
      case "portfolio":
        return `Olatunji_${title.split(" ")[0]}`;
      case "blog":
        return `${domain}-articles`;
      case "resume":
        return `Olatunji_${title.split(" ")[0]}.pdf`;
      case "github":
        return `My_${title.split(" ")[0]}`;
      case "linkedin":
        return `My_LinkedIn`;
      default:
        return domain;
    }
  };

  return (
    <div className={`windows-list-explorer ${type}`}>
      {/* Explorer Ribbon */}
      <div className="explorer-ribbon">
        <div className="ribbon-tabs">
          <div className="ribbon-tab active">Home</div>
          <div className="ribbon-tab">Share</div>
          <div className="ribbon-tab">View</div>
        </div>
        <div className="ribbon-actions">
          <div className="ribbon-button" onClick={handleRedirect}>
            <Icon icon="mdi:open-in-app" width="16" />
            <span>Open</span>
          </div>
          <div className="ribbon-button">
            <Icon icon="mdi:content-copy" width="16" />
            <span>Copy</span>
          </div>
          <div className="ribbon-divider"></div>
          <div className="ribbon-button">
            <Icon
              icon="mdi:view-list"
              width="16"
              onClick={() =>
                setViewMode(viewMode === "details" ? "list" : "details")
              }
            />
            <span>View</span>
          </div>
        </div>
      </div>

      {/* Explorer Navigation */}
      <div className="explorer-navigation">
        <div className="navigation-toolbar">
          <div className="nav-button disabled">
            <Icon icon="mdi:arrow-left" width="16" />
          </div>
          <div className="nav-button disabled">
            <Icon icon="mdi:arrow-right" width="16" />
          </div>
          <div className="address-bar">
            <Icon icon={icon} color={iconColor} width="16" />
            <span> {`Quick Access > ${title}`}</span>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" readOnly />
            <Icon icon="mdi:magnify" width="16" />
          </div>
        </div>
      </div>

      <div className="explorer-body">
        {/* Left sidebar */}
        <div className="explorer-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-header">
              <Icon icon="mdi:chevron-down" width="16" />
              <span>Quick access</span>
            </div>
            <div className="sidebar-item active">
              <Icon icon="mdi:desktop-mac-dashboard" width="16" />
              <span>Desktop</span>
            </div>
            <div className="sidebar-item">
              <Icon icon="mdi:download" width="16" />
              <span>Downloads</span>
            </div>
            <div className="sidebar-item">
              <Icon icon="mdi:file-document-multiple" width="16" />
              <span>Documents</span>
            </div>
            <div className="sidebar-item">
              <Icon icon="mdi:folder" width="16" />
              <span>Links</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-header">
              <Icon icon="mdi:chevron-down" width="16" />
              <span>This PC</span>
            </div>
            <div className="sidebar-item">
              <Icon icon="mdi:folder" width="16" />
              <span>Documents</span>
            </div>
            <div className="sidebar-item">
              <Icon icon="mdi:harddisk" width="16" />
              <span>Local Disk (C:)</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="explorer-content">
          <div className="files-header">
            <div className="file-header-name">Name</div>
            <div className="file-header-date">Date modified</div>
            <div className="file-header-type">Type</div>
            <div className="file-header-size">Size</div>
          </div>

          <div className="files-list">
            <div className="file-group-header">
              <Icon icon="mdi:chevron-down" width="16" />
              <span>Earlier this week</span>
            </div>

            {/* This is the file entry that looks like the reference image */}
            <div className="file-entry" onClick={handleRedirect}>
              <div className="file-name">
                <Icon icon={getFileIcon()} width="16" color={iconColor} />
                <span>{formatFileName()}</span>
              </div>
              <div className="file-date">{getCurrentDate()}</div>
              <div className="file-type">
                {getFileType()}
                {type === "portfolio" || type === "blog" ? (
                  <div className="file-dimensions">{getDimensions()}</div>
                ) : null}
              </div>
              <div className="file-size">{getFileSize()}</div>
            </div>

            {/* URL entry always at the bottom */}
            <div className="url-entry">
              <Icon icon="mdi:link-variant" width="16" />
              <span>{url}</span>
              <button className="visit-button" onClick={handleRedirect}>
                <Icon icon="mdi:open-in-new" width="16" />
                Visit
              </button>
            </div>
          </div>
        </div>

        {/* Details panel on the right */}
        {isDetailsPanelOpen && (
          <div className="explorer-details-panel">
            <div className="details-header">
              <Icon icon={getFileIcon()} width="32" color={iconColor} />
              <div className="details-title">{formatFileName()}</div>
            </div>

            <div className="details-section">
              <div className="details-row">
                <div className="details-label">Type</div>
                <div className="details-value">{getFileType()}</div>
              </div>
              <div className="details-row">
                <div className="details-label">Size</div>
                <div className="details-value">{getFileSize()}</div>
              </div>
              <div className="details-row">
                <div className="details-label">Date modified</div>
                <div className="details-value">{getCurrentDate()}</div>
              </div>
              <div className="details-row">
                <div className="details-label">URL</div>
                <div className="details-value">{url}</div>
              </div>

              <div className="details-description">
                <p>{description}</p>
              </div>

              <div className="details-actions">
                <button className="details-button" onClick={handleRedirect}>
                  <Icon icon="mdi:open-in-new" width="16" />
                  Open in browser
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="explorer-statusbar">
        <div className="status-items">1 item</div>
        <div
          className="details-toggle"
          onClick={() => setIsDetailsPanelOpen(!isDetailsPanelOpen)}
        >
          <Icon
            icon={isDetailsPanelOpen ? "mdi:chevron-right" : "mdi:chevron-left"}
            width="16"
          />
          {isDetailsPanelOpen ? "Hide" : "Show"} details pane
        </div>
      </div>
    </div>
  );
};

export default WindowsListExplorer;
