import React, { useState, useEffect } from "react";
import "./UserGuide.css";
import { Icon } from "@iconify/react";

interface UserGuideProps {
  deviceType: "windows" | "macos" | "ios" | "android" | "unknown";
  onClose: () => void;
  avatarUrl: string;
}

const UserGuide: React.FC<UserGuideProps> = ({
  deviceType,
  onClose,
  avatarUrl,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Define guide steps based on device type
  const getGuideSteps = () => {
    const commonSteps = [
      {
        title: "Welcome to my Interactive Portfolio!",
        content:
          "I've designed this portfolio to mimic different operating systems. This isn't a glitch - it's intentional! Let me show you around.",
        position: "center",
      },
    ];

    // Desktop specific steps (Windows and macOS)
    const desktopSteps = [
      ...commonSteps,
      {
        title: "Desktop Interface",
        content: `You're currently viewing my portfolio in ${
          deviceType === "windows" ? "Windows" : "macOS"
        } mode. You can interact with icons just like a real desktop.`,
        position: "top",
        targetSelector: ".desktop-icons-container",
      },
      {
        title: "Open Applications",
        content:
          "Click on any desktop icon to open a window with that content. You can move, resize, minimize, and close windows.",
        position: "left",
        targetSelector:
          deviceType === "windows"
            ? ".windows-desktop .icon"
            : ".mac-desktop .icon",
      },
      {
        title: "System Controls",
        content:
          deviceType === "windows"
            ? "Use the Windows taskbar at the bottom to manage open windows and access more features."
            : "Use the dock at the bottom or the menu bar at the top to navigate and access features.",
        position: "bottom",
        targetSelector: deviceType === "windows" ? ".taskbar" : ".dock",
      },
      {
        title: "Switch Interfaces",
        content:
          deviceType === "windows"
            ? "Try macOS mode by clicking on the Apple icon on your desktop."
            : "Try Windows mode by clicking on the Windows icon on your desktop.",
        position: "right",
        targetSelector:
          deviceType === "windows"
            ? "[data-guide='macos-icon']"
            : "[data-guide='windows-icon']",
      },
    ];

    // Mobile specific steps (iOS and Android)
    const mobileSteps = [
      ...commonSteps,
      {
        title: "Mobile Interface",
        content: `You're viewing my portfolio in ${
          deviceType === "ios" ? "iOS" : "Android"
        } mode. It works just like a mobile home screen.`,
        position: "top",
      },
      {
        title: "App Icons",
        content:
          "Tap on any app icon to open that content. Each app represents a different section of my portfolio.",
        position: "center",
        targetSelector: ".app-grid",
      },
      {
        title: "System Controls",
        content:
          deviceType === "ios"
            ? "Use the dock at the bottom just like on an iPhone to access key features."
            : "Use the navigation bar at the bottom like on an Android device.",
        position: "bottom",
        targetSelector: ".mobile-dock",
      },
      {
        title: "Switch Interfaces",
        content:
          deviceType === "ios"
            ? "Try Android mode by tapping on the Android icon."
            : "Try iOS mode by tapping on the Apple icon.",
        position: "right",
      },
    ];

    return deviceType === "windows" || deviceType === "macos"
      ? desktopSteps
      : mobileSteps;
  };

  const steps = getGuideSteps();

  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, close guide
      handleClose();
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle closing the guide
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("portfolioGuideShown", "true");
    onClose();
  };

  // Only check localStorage when component first mounts
  // but don't close when reopened via help button
  useEffect(() => {
    // Only check on initial mount, not when reopened via help button
    if (localStorage.getItem("portfolioGuideShown") === "true" && !isVisible) {
      // This will prevent auto-show on first load but won't interfere
      // when manually opened via help button
      onClose();
    }
  }, []);

  // Exit if not visible
  if (!isVisible) return null;

  const currentStepData = steps[currentStep];

  // Get position class based on current step
  const getPositionClass = () => {
    switch (currentStepData.position) {
      case "top":
        return "guide-position-top";
      case "bottom":
        return "guide-position-bottom";
      case "left":
        return "guide-position-left";
      case "right":
        return "guide-position-right";
      default:
        return "guide-position-center";
    }
  };

  return (
    <div className="user-guide-overlay">
      <div className={`user-guide-container ${getPositionClass()}`}>
        <div className="guide-avatar-container">
          <img src={avatarUrl} alt="Guide Avatar" className="guide-avatar" />
        </div>
        <div className="guide-content">
          <h3 className="guide-title">{currentStepData.title}</h3>
          <p className="guide-text">{currentStepData.content}</p>

          <div className="guide-controls">
            <button
              className="guide-button previous"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <Icon icon="mdi:chevron-left" width="20" />
              Previous
            </button>

            <div className="guide-dots">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`guide-dot ${
                    index === currentStep ? "active" : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>

            <button className="guide-button next" onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <Icon icon="mdi:chevron-right" width="20" />
                </>
              ) : (
                <>
                  Got it!
                  <Icon icon="mdi:check" width="20" />
                </>
              )}
            </button>
          </div>
        </div>

        <button className="guide-close-button" onClick={handleClose}>
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>
    </div>
  );
};

export default UserGuide;
