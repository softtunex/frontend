import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "./StartMenu.css";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: (projectId: string) => void;
  userInfo: {
    name: string;
    title: string;
    avatar: string;
    phone?: string;
    email?: string;
    website?: string;
    experience?: string;
    skills?: string[];
  };
}

const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenProjectModal,
  userInfo,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Function to open link in a new tab
  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  // Function to handle app shortcut clicks
  const handleAppShortcutClick = (id: number) => {
    switch (id) {
      case 1: // Projects
        onOpenProjectModal("projects");
        break;
      case 2: // Buy Me A Coffee
        // Add your coffee link here
        openLink("https://www.buymeacoffee.com/");
        break;
      case 3: // Github
        openLink("https://github.com/softtunex");
        break;
      case 4: // LinkedIn
        openLink("https://www.linkedin.com/in/olatunji-buari-a87031190/");
        break;
      case 5: // Calendar
        openLink("https://calendly.com/olatunjibuari8/30min");
        // Calendar functionality
        break;
      default:
        break;
    }
  };

  // Toggle expanded mode when "See more" is clicked
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
          <Icon icon="mdi:linkedin" width="32" color="#0A66C2" />
          <div className="icon-badge">4K+</div>
          <span>LinkedIn</span>
        </div>
        <div className="app-shortcut" onClick={() => handleAppShortcutClick(5)}>
          <Icon icon="mdi:calendar" width="32" color="#4DB6E5" />
          <span>Calendar</span>
        </div>
      </div>

      {expanded ? (
        <div className="expanded-content">
          <div className="info-section">
            <div className="info-row">
              <div className="info-label">Phone</div>
              <div className="info-value">
                {userInfo.phone || "+234 8062387436"}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Email</div>
              <div className="info-value">
                {userInfo.email || "buariolatunji@gmail.com.com"}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Website</div>
              <div className="info-value">
                {userInfo.website || "https://buariolatunji.netlify.app/"}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Experience</div>
              <div className="info-value">
                {userInfo.experience || "4+ years"}
              </div>
            </div>
            <div className="info-row skills-row">
              <div className="info-label">Skills</div>
              <div className="info-value skills-list">
                {userInfo.skills
                  ? userInfo.skills.join(", ")
                  : "JavaScript, TypeScript, React, Node.js, Express, MongoDB, Firebase, HTML, CSS, CI/CD, REST, Git"}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="start-menu-user-info">
        <div className="user-profile">
          <img
            src={
              userInfo.avatar ||
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1743427116/sticker_qg5max.png"
            }
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
          <div className="action-button">
            <Icon icon="mdi:phone" width="20" />
          </div>
          <div className="action-button">
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
