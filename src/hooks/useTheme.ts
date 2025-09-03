// src/hooks/useTheme.ts - Simplified version without JSX/Context

import { useMemo } from "react";
import {
  themeConfig,
  getProjectColor,
  getPlatformColor,
  createMediaQuery,
} from "../shared/themeConfig";

export const useTheme = () => {
  const theme = useMemo(
    () => ({
      colors: themeConfig.colors,
      dimensions: themeConfig.dimensions,
      animations: themeConfig.animations,
      breakpoints: themeConfig.breakpoints,
      shadows: themeConfig.shadows,
      zIndex: themeConfig.zIndex,

      // Helper functions
      getProjectColor,
      getPlatformColor,
      createMediaQuery,

      // Quick access to common values
      spacing: themeConfig.dimensions.spacing,
      radius: themeConfig.dimensions.radius,

      // Platform-specific helpers
      getPlatformColors: (platform: "windows" | "mac" | "ios" | "android") =>
        themeConfig.colors.platforms[platform],

      getWindowDimensions: (
        type: "default" | "minimum" | "maximum" = "default"
      ) => themeConfig.dimensions.windows[type],

      // Icon size helper
      getIconSize: (size: "small" | "medium" | "large" | "desktop" | "dock") =>
        themeConfig.dimensions.icons[size],

      // Animation helper
      getAnimationDuration: (type: "fast" | "medium" | "slow") =>
        themeConfig.animations.duration[type],

      // Breakpoint helpers
      isMobile: (width: number) =>
        width <= themeConfig.breakpoints.mobile.large,
      isTablet: (width: number) =>
        width > themeConfig.breakpoints.mobile.large &&
        width <= themeConfig.breakpoints.tablet.large,
      isDesktop: (width: number) =>
        width > themeConfig.breakpoints.tablet.large,
    }),
    []
  );

  return theme;
};

// Hook for responsive breakpoints
export const useBreakpoint = () => {
  const theme = useTheme();

  const getBreakpoint = () => {
    const width = window.innerWidth;

    if (width <= theme.breakpoints.mobile.small) return "mobile-small";
    if (width <= theme.breakpoints.mobile.medium) return "mobile-medium";
    if (width <= theme.breakpoints.mobile.large) return "mobile-large";
    if (width <= theme.breakpoints.tablet.small) return "tablet-small";
    if (width <= theme.breakpoints.tablet.large) return "tablet-large";
    if (width <= theme.breakpoints.desktop.small) return "desktop-small";
    if (width <= theme.breakpoints.desktop.medium) return "desktop-medium";
    if (width <= theme.breakpoints.desktop.large) return "desktop-large";
    return "desktop-xlarge";
  };

  return {
    current: getBreakpoint(),
    isMobile: theme.isMobile(window.innerWidth),
    isTablet: theme.isTablet(window.innerWidth),
    isDesktop: theme.isDesktop(window.innerWidth),
  };
};

// CSS-in-JS style object creator
export const createStyles = () => {
  const theme = themeConfig;

  return {
    // Common button styles
    button: {
      primary: {
        backgroundColor: theme.colors.system.primary,
        color: theme.colors.system.text.inverse,
        padding: `${theme.dimensions.spacing.sm}px ${theme.dimensions.spacing.md}px`,
        borderRadius: theme.dimensions.radius.md,
        border: "none",
        cursor: "pointer",
        transition: `all ${theme.animations.duration.fast}ms ${theme.animations.easing.ease}`,
        boxShadow: theme.shadows.sm,
      },
    },

    // Modal styles
    modal: {
      overlay: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.system.overlay,
        zIndex: theme.zIndex.overlay,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };
};
