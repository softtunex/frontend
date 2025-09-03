// Updated ContactModal.tsx
import React from "react";
import { Icon } from "@iconify/react";
import "./Mac.css";

// Create a ContactInfo interface based on UserInfo
interface ContactInfo {
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
  website: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo; // This will receive the shared config from parent
  onAboutMeClick: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactInfo,
  onAboutMeClick,
}) => {
  if (!isOpen) return null;

  const handleCall = () => window.open(`tel:${contactInfo.phone}`);
  const handleMail = () => window.open(`mailto:${contactInfo.email}`);
  const handleWeb = () => window.open(contactInfo.website, "_blank");
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: contactInfo.name,
        text: `${contactInfo.name} - ${contactInfo.title}`,
        url: contactInfo.website,
      });
    }
  };

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
          <div className="mac-modal-title">Contact</div>
        </div>

        <div className="contact-content">
          <div className="contact-header">
            <img
              src={contactInfo.avatar}
              alt={contactInfo.name}
              className="contact-avatar"
            />
            <div className="contact-info">
              <h2 className="contact-name">{contactInfo.name}</h2>
              <p className="contact-title">{contactInfo.title}</p>
            </div>
          </div>

          <div className="contact-actions">
            <div className="contact-action" onClick={handleCall}>
              <div className="contact-action-button">
                <Icon icon="mdi:phone" />
              </div>
              <span>call</span>
            </div>
            <div className="contact-action" onClick={handleMail}>
              <div className="contact-action-button">
                <Icon icon="mdi:email" />
              </div>
              <span>mail</span>
            </div>
            <div className="contact-action" onClick={handleWeb}>
              <div className="contact-action-button">
                <Icon icon="mdi:web" />
              </div>
              <span>web</span>
            </div>
            <div className="contact-action" onClick={handleShare}>
              <div className="contact-action-button">
                <Icon icon="mdi:share" />
              </div>
              <span>share</span>
            </div>
          </div>

          <div className="contact-details">
            <div className="contact-detail">
              <div className="contact-detail-label">phone</div>
              <div className="contact-detail-value">{contactInfo.phone}</div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">email</div>
              <div className="contact-detail-value">{contactInfo.email}</div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-label">website</div>
              <div className="contact-detail-value">{contactInfo.website}</div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="mac-button" onClick={onAboutMeClick}>
              About Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
