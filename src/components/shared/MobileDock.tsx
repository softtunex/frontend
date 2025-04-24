// src/components/shared/MobileDock.tsx
import React from "react";
import { Icon } from "@iconify/react";

interface DockItemProps {
  icon: string;
  color?: string;
  avatar?: string;
  onClick?: () => void;
}

/**
 * Reusable Mobile Dock component for both iOS and Android interfaces
 */
const MobileDock: React.FC<{
  deviceType: "ios" | "android";
  dockItems: DockItemProps[];
}> = ({ deviceType, dockItems }) => {
  return (
    <div className="mobile-dock">
      {dockItems.map((item, index) => (
        <div key={index} className="dock-item" onClick={item.onClick}>
          {item.avatar ? (
            <img
              src={item.avatar}
              alt="User"
              className="dock-avatar"
              style={{
                width: deviceType === "ios" ? "36px" : "32px",
                height: deviceType === "ios" ? "36px" : "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <Icon
              icon={item.icon}
              width={deviceType === "ios" ? "28" : "24"}
              color={item.color}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MobileDock;
