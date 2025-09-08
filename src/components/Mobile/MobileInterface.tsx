// src/components/Mobile/MobileInterface.tsx

import React, { useState } from "react";
import IOSInterface from "./iOSInterface";
import AndroidInterface from "./AndroidInterface";
// ProjectModal is no longer needed here, as it's rendered by the children.

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
  const [currentDeviceType, setCurrentDeviceType] = useState(initialDeviceType);

  // Modal state and handlers are now REMOVED from this parent component.
  // const [showProjectModal, setShowProjectModal] = useState(false);
  // const handleProjectClick = () => setShowProjectModal(true);
  // const handleCloseModal = () => setShowProjectModal(false);

  const handleSwitchOS = () => {
    setCurrentDeviceType(currentDeviceType === "ios" ? "android" : "ios");
  };

  // The osType is also no longer needed here.
  // const osType = currentDeviceType === "ios" ? "mac" : "windows";

  return (
    <>
      {currentDeviceType === "ios" ? (
        <IOSInterface
          weather={weather}
          // onProjectClick={handleProjectClick} // <-- REMOVED this line
          onSwitchOS={handleSwitchOS}
        />
      ) : (
        <AndroidInterface
          weather={weather}
          // onProjectClick={handleProjectClick} // <-- REMOVED this line
          onSwitchOS={handleSwitchOS}
        />
      )}

      {/* The ProjectModal is no longer rendered here. It's now rendered inside
          the AndroidInterface and IOSInterface components themselves. */}
    </>
  );
};

export default MobileInterface;
