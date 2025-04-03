import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import "./MenuDropdown.css";

export interface MenuOption {
  id: string;
  label?: string;
  icon?: string;
  divider?: boolean;
}

interface MenuDropdownProps {
  options: MenuOption[];
  position: { x: number; y: number };
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  options,
  position,
  isOpen,
  onClose,
  onSelect,
}) => {
  // Hook must be defined before any return statements
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen) onClose();
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Stop propagation to prevent immediate closing
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="menu-dropdown"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      onClick={handleMenuClick}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.id}>
          {option.divider ? (
            <div className="menu-divider"></div>
          ) : (
            <div
              className="menu-item-dropdown"
              onClick={() => onSelect(option.id)}
            >
              {option.icon && (
                <Icon icon={option.icon} width="16" className="menu-icon" />
              )}
              <span className="menu-label">{option.label}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuDropdown;
