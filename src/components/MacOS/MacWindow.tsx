import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./MacWindow.css";

interface MacWindowProps {
  id: string;
  title: string;
  icon: string;
  iconColor?: string;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onActivate: (id: string) => void;
  className?: string;
  children: React.ReactNode;
}

const MacWindow: React.FC<MacWindowProps> = ({
  id,
  title,
  icon,
  iconColor,
  isActive,
  isMinimized,
  isMaximized,
  initialWidth = 800,
  initialHeight = 600,
  initialX = 100,
  initialY = 100,
  onClose,
  onMinimize,
  onMaximize,
  onActivate,
  className = "",
  children,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const prevPosition = useRef({ x: initialX, y: initialY });
  const prevSize = useRef({ width: initialWidth, height: initialHeight });

  // Store previous position and size before maximizing
  useEffect(() => {
    if (isMaximized) {
      prevPosition.current = position;
      prevSize.current = size;
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 }); // 40px for menu bar
    } else if (!isMaximized && prevPosition.current) {
      setPosition(prevPosition.current);
      setSize(prevSize.current);
    }
    // eslint-disable-next-line
  }, [isMaximized]);

  // Handle window activation on click
  const handleWindowClick = (e: React.MouseEvent) => {
    if (!isActive) {
      onActivate(id);
    }
  };

  // Start dragging the window
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return; // Don't allow dragging in maximized state
    if (
      e.target instanceof HTMLElement &&
      e.target.closest(".mac-window-controls")
    ) {
      return; // Don't initiate drag if clicking on window controls
    }

    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    e.preventDefault(); // Prevent text selection during drag
  };

  // Handle dragging motion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Calculate new position
        const newX = Math.max(0, e.clientX - dragOffset.x);
        const newY = Math.max(0, e.clientY - dragOffset.y);

        // Apply bounds to keep window on screen
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height - 40; // 40px for menu bar

        setPosition({
          x: Math.min(newX, maxX),
          y: Math.min(newY, maxY),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, size]);

  // Window style based on state
  const windowStyle = {
    display: isMinimized ? "none" : "flex",
    width: isMaximized ? "100%" : `${size.width}px`,
    height: isMaximized ? `calc(100vh - 40px)` : `${size.height}px`,
    top: isMaximized ? "24px" : `${position.y}px`, // 24px for menu bar
    left: isMaximized ? "0" : `${position.x}px`,
    zIndex: isActive ? 10 : 5,
  };

  return (
    <div
      ref={windowRef}
      className={`mac-window ${isActive ? "active" : ""} ${className}`}
      style={windowStyle}
      onClick={handleWindowClick}
    >
      <div
        className="mac-window-titlebar"
        onMouseDown={handleDragStart}
        onDoubleClick={() => onMaximize(id)}
      >
        <div className="mac-window-controls">
          <button
            className="mac-window-control close"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
          >
            <span>×</span>
          </button>
          <button
            className="mac-window-control minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
          >
            <span>−</span>
          </button>
          <button
            className="mac-window-control maximize"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(id);
            }}
          >
            <span>+</span>
          </button>
        </div>
        <div className="mac-window-title">
          <Icon icon={icon} color={iconColor} width="16" />
          <span>{title}</span>
        </div>
      </div>
      <div className="mac-window-content">{children}</div>
    </div>
  );
};

export default MacWindow;
