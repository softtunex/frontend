// Updated AboutMeModal.tsx
import React from "react";
import "./Mac.css";
import { UserInfo } from "../../shared/userConfig"; // Import type

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo; // This will receive the shared config from parent
  onProjectsClick: () => void;
  onContactClick: () => void;
}

const AboutMeModal: React.FC<AboutMeModalProps> = ({
  isOpen,
  onClose,
  userInfo,
  onProjectsClick,
  onContactClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="mac-modal-overlay" onClick={onClose}>
      <div className="mac-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mac-modal-titlebar">
          <div className="mac-window-controls">
            <button
              className="mac-window-control close"
              onClick={onClose}
            ></button>
            <button className="mac-window-control minimize"></button>
            <button className="mac-window-control maximize"></button>
          </div>
          <div className="mac-modal-title">About Me</div>
        </div>

        <div className="about-me-content">
          <div className="about-me-avatar-container">
            <img
              src={userInfo.avatar}
              alt={userInfo.name}
              className="about-me-avatar"
            />
          </div>

          <h2 className="about-me-name">{userInfo.name}</h2>
          <p className="about-me-job-title">{userInfo.title}</p>

          <div className="about-me-details">
            <div className="about-me-detail">
              <div className="about-me-label">Experience</div>
              <div className="about-me-value">{userInfo.experience}</div>
            </div>

            <div className="about-me-detail">
              <div className="about-me-label">Skills</div>
              <div className="about-me-value">{userInfo.skills.join(", ")}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="mac-button" onClick={onProjectsClick}>
              My Projects
            </button>
            <button className="mac-button" onClick={onContactClick}>
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
