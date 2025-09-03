// Updated StartMenu.tsx - Key changes shown
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./StartMenu.css";
import { UserInfo } from "../../shared/userConfig";
import { LINKS, openExternalLink } from "../../shared/linksConfig"; // Import shared links
import { colors } from "../../shared/themeConfig";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: (projectId: string) => void;
  userInfo: UserInfo;
}

const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
  userInfo,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Function to open link in a new tab using shared helper
  const openLink = (url: string) => {
    openExternalLink(url);
    onClose();
  };

  // Function to handle app shortcut clicks - updated to use shared links
  const handleAppShortcutClick = (id: number) => {
    switch (id) {
      case 1: // Projects
        onOpenProjectModal("projects");
        break;
      case 2: // Buy Me A Coffee
        openLink(LINKS.BUY_ME_COFFEE);
        break;
      case 3: // Github
        openLink(LINKS.GITHUB);
        break;
      case 4: // LinkedIn
        openLink(LINKS.LINKEDIN);
        break;
      case 5: // Calendar
        openLink(LINKS.CALENDAR);
        break;
      default:
        break;
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (!isOpen) return null;

  return (
    <div className={`start-menu-popup ${expanded ? "expanded" : ""}`}>
      <div className="start-menu-apps">
        <div
          className="app-shortcut badge-container"
          onClick={() => handleAppShortcutClick(1)}
        >
          <Icon icon="logos:javascript" width="32" />
          <div className="icon-badge">8+</div>
          <span>Projects</span>
        </div>
        <div
          className="app-shortcut badge-container"
          onClick={() => handleAppShortcutClick(2)}
        >
          <Icon icon="mdi:coffee" width="32" color="#FFCA28" />
          <div className="icon-badge new">New</div>
          <span>Buy Me A Coffee</span>
        </div>
        <div
          className="app-shortcut badge-container"
          onClick={() => handleAppShortcutClick(3)}
        >
          <Icon icon="mdi:github" width="32" />
          <div className="icon-badge">10+</div>
          <span>Github</span>
        </div>
        <div
          className="app-shortcut badge-container"
          onClick={() => handleAppShortcutClick(4)}
        >
          <Icon
            icon="mdi:linkedin"
            width="32"
            color={colors.projects.linkedin}
          />
          <div className="icon-badge">4K+</div>
          <span>LinkedIn</span>
        </div>
        <div className="app-shortcut" onClick={() => handleAppShortcutClick(5)}>
          <Icon icon="mdi:calendar" width="32" color="#4DB6E5" />
          <span>Calendar</span>
        </div>
      </div>

      {/* Rest of component remains the same... */}
      {expanded && (
        <div className="expanded-content">
          <div className="info-section">
            <div className="info-row">
              <div className="info-label">Phone</div>
              <div className="info-value">{userInfo.phone}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Email</div>
              <div className="info-value">{userInfo.email}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Website</div>
              <div className="info-value">{userInfo.website}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Experience</div>
              <div className="info-value">{userInfo.experience}</div>
            </div>
            <div className="info-row skills-row">
              <div className="info-label">Skills</div>
              <div className="info-value skills-list">
                {userInfo.skills.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="start-menu-user-info">
        <div className="user-profile">
          <img
            src={userInfo.avatar}
            alt="User profile"
            className="user-avatar"
          />
          <div className="user-details">
            <div className="user-name">{userInfo.name}</div>
            <div className="user-title">{userInfo.title}</div>
          </div>
        </div>

        <button className="see-more-button" onClick={toggleExpanded}>
          {expanded ? "See less" : "See more"}
        </button>
      </div>

      {expanded && (
        <div className="action-buttons">
          <div
            className="action-button"
            onClick={() => window.open(LINKS.PHONE)}
          >
            <Icon icon="mdi:phone" width="20" />
          </div>
          <div
            className="action-button"
            onClick={() => window.open(LINKS.EMAIL)}
          >
            <Icon icon="mdi:email" width="20" />
          </div>
          <div className="action-button">
            <Icon icon="mdi:block-helper" width="20" />
          </div>
          <div className="action-button">
            <Icon icon="mdi:share" width="20" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StartMenu;
