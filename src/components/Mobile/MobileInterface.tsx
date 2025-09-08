// src/components/Mobile/MobileInterface.tsx

import React, { useState } from "react";
import IOSInterface from "./iOSInterface";
import AndroidInterface from "./AndroidInterface";
import ProjectModal from "../ProjectModal/ProjectModal";

interface MobileInterfaceProps {
  deviceType: "ios" | "android";
  weather: {
    temperature: number;
    condition: string;
    forecast: Array<{
      day: number;
      temperature: number;
      condition: string;
    }>;
  };
}

const MobileInterface: React.FC<MobileInterfaceProps> = ({
  deviceType: initialDeviceType,
  weather,
}) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentDeviceType, setCurrentDeviceType] = useState(initialDeviceType);

  const handleProjectClick = () => {
    setShowProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowProjectModal(false);
  };

  const handleSwitchOS = () => {
    setCurrentDeviceType(currentDeviceType === "ios" ? "android" : "ios");
  };

  const osType = currentDeviceType === "ios" ? "mac" : "windows";

  return (
    <>
      {currentDeviceType === "ios" ? (
        <IOSInterface
          weather={weather}
          onProjectClick={handleProjectClick}
          onSwitchOS={handleSwitchOS}
        />
      ) : (
        <AndroidInterface
          weather={weather}
          onProjectClick={handleProjectClick}
          onSwitchOS={handleSwitchOS}
        />
      )}

      {/* 
        IMPORTANT FIX for Modal: 
        Ensure your ProjectModal component has a high z-index in its CSS. 
        For example, in your ProjectModal.css:
        
        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999; // <--- This is the key!
          display: flex;
          align-items: center;
          justify-content: center;
        }
      */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={handleCloseModal}
        projectId="projects"
        osType={osType}
      />
    </>
  );
};

export default MobileInterface;
