// src/components/shared/MobileIcon.tsx
import React from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "../../hooks/useTheme";

interface MobileIconProps {
  id: number;
  label: string;
  icon?: string;
  badge?: string;
  color?: string;
  specialIcon?: "calendar" | "language";
  avatar?: string;
  day?: number;
  text?: string;
  onClick?: () => void;
}

/**
 * Reusable Mobile Icon component for both iOS and Android interfaces
 */
const MobileIcon: React.FC<MobileIconProps> = ({
  label,
  icon,
  badge,
  color,
  specialIcon,
  avatar,
  day,
  text,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <div className="app" onClick={onClick}>
      {specialIcon === "calendar" ? (
        <div className="app-icon calendar">
          <div className="calendar-day">{day}</div>
        </div>
      ) : specialIcon === "language" ? (
        <div className="app-icon language">
          <span>{text}</span>
        </div>
      ) : (
        <div className="app-icon">
          {badge && (
            <div className={`badge ${badge === "new" ? "new" : ""}`}>
              {badge}
            </div>
          )}
          {avatar ? (
            <img
              src={avatar}
              alt={label}
              className="icon-avatar"
              style={{
                width: `${theme.getIconSize("desktop")}px`,
                height: `${theme.getIconSize("desktop")}px`,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            icon && <Icon icon={icon} width="28" color={color} />
          )}
        </div>
      )}
      <div className="app-label">{label}</div>
    </div>
  );
};

export default MobileIcon;
