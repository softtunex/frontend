// src/shared/themeConfig.ts

export interface ThemeColors {
  // Project category colors
  projects: {
    portfolio: string;
    blog: string;
    resume: string;
    github: string;
    linkedin: string;
    restaurant: string;
    education: string;
    fintech: string;
    banking: string;
    hr: string;
    social: string;
    business: string;
  };

  // Platform/OS specific colors
  platforms: {
    windows: {
      primary: string;
      accent: string;
      taskbar: string;
      background: string;
    };
    mac: {
      primary: string;
      accent: string;
      menuBar: string;
      background: string;
    };
    ios: {
      primary: string;
      accent: string;
      statusBar: string;
    };
    android: {
      primary: string;
      accent: string;
      statusBar: string;
    };
  };

  // Badge colors
  badges: {
    default: string;
    new: string;
    error: string;
    warning: string;
    success: string;
  };

  // System colors
  system: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
      disabled: string;
    };
    border: string;
    shadow: string;
    overlay: string;
  };
}

export interface ThemeDimensions {
  // Window dimensions
  windows: {
    default: { width: number; height: number };
    minimum: { width: number; height: number };
    maximum: { width: number; height: number };
  };

  // Icon sizes
  icons: {
    small: number;
    medium: number;
    large: number;
    desktop: number;
    dock: number;
  };

  // Component heights
  heights: {
    menuBar: number;
    taskbar: number;
    dock: number;
    statusBar: {
      ios: number;
      android: number;
    };
    titleBar: {
      windows: number;
      mac: number;
    };
  };

  // Spacing scale
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  // Border radius scale
  radius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
}

export interface ThemeAnimations {
  // Duration in milliseconds
  duration: {
    fast: number;
    medium: number;
    slow: number;
    window: {
      open: number;
      close: number;
      minimize: number;
      maximize: number;
    };
  };

  // Easing functions
  easing: {
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
}

export interface ThemeBreakpoints {
  mobile: {
    small: number; // 320px
    medium: number; // 480px
    large: number; // 768px
  };
  tablet: {
    small: number; // 769px
    large: number; // 1024px
  };
  desktop: {
    small: number; // 1025px
    medium: number; // 1200px
    large: number; // 1440px
    xlarge: number; // 1920px
  };
}

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  window: string;
  modal: string;
  dock: string;
}

export interface ThemeZIndex {
  base: number;
  content: number;
  header: number;
  modal: number;
  overlay: number;
  dropdown: number;
  tooltip: number;
  notification: number;
  maximum: number;
}

// Theme configuration object
export const themeConfig = {
  colors: {
    projects: {
      portfolio: "#1877f2",
      blog: "#44a8b3",
      resume: "#f40f02",
      github: "#333333",
      linkedin: "#0A66C2",
      restaurant: "#D32F2F",
      education: "#1976D2",
      fintech: "#0288D1",
      banking: "#388E3C",
      hr: "#689F38",
      social: "#AFB42B",
      business: "#512DA8",
    },

    platforms: {
      windows: {
        primary: "#0078d7",
        accent: "#1e90ff",
        taskbar: "#0d1117",
        background: "#f0f0f0",
      },
      mac: {
        primary: "#007aff",
        accent: "#1d93ef",
        menuBar: "rgba(20, 20, 70, 0.5)",
        background: "#f5f5f7",
      },
      ios: {
        primary: "#007aff",
        accent: "#1c9cf6",
        statusBar: "transparent",
      },
      android: {
        primary: "#4285f4",
        accent: "#3ddc84",
        statusBar: "rgba(0, 0, 0, 0.8)",
      },
    },

    badges: {
      default: "#e44d26",
      new: "#4caf50",
      error: "#f44336",
      warning: "#ff9800",
      success: "#4caf50",
    },

    system: {
      background: "#ffffff",
      surface: "#f8f9fa",
      primary: "#007bff",
      secondary: "#6c757d",
      accent: "#17a2b8",
      text: {
        primary: "#212529",
        secondary: "#6c757d",
        inverse: "#ffffff",
        disabled: "#adb5bd",
      },
      border: "#dee2e6",
      shadow: "rgba(0, 0, 0, 0.1)",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  } as ThemeColors,

  dimensions: {
    windows: {
      default: { width: 800, height: 600 },
      minimum: { width: 400, height: 300 },
      maximum: { width: 1200, height: 800 },
    },

    icons: {
      small: 16,
      medium: 24,
      large: 32,
      desktop: 50,
      dock: 60,
    },

    heights: {
      menuBar: 24,
      taskbar: 40,
      dock: 80,
      statusBar: {
        ios: 44,
        android: 28,
      },
      titleBar: {
        windows: 32,
        mac: 38,
      },
    },

    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },

    radius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
  } as ThemeDimensions,

  animations: {
    duration: {
      fast: 150,
      medium: 300,
      slow: 500,
      window: {
        open: 200,
        close: 150,
        minimize: 200,
        maximize: 200,
      },
    },

    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
  } as ThemeAnimations,

  breakpoints: {
    mobile: {
      small: 320,
      medium: 480,
      large: 768,
    },
    tablet: {
      small: 769,
      large: 1024,
    },
    desktop: {
      small: 1025,
      medium: 1200,
      large: 1440,
      xlarge: 1920,
    },
  } as ThemeBreakpoints,

  shadows: {
    none: "none",
    sm: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    md: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
    lg: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    xl: "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
    window: "0 10px 30px rgba(0, 0, 0, 0.5)",
    modal: "0 10px 25px rgba(0, 0, 0, 0.5)",
    dock: "0 5px 20px rgba(0, 0, 0, 0.2)",
  } as ThemeShadows,

  zIndex: {
    base: 0,
    content: 10,
    header: 100,
    modal: 1000,
    overlay: 1001,
    dropdown: 1002,
    tooltip: 1003,
    notification: 1004,
    maximum: 9999,
  } as ThemeZIndex,
};

// Helper functions
export const getProjectColor = (type: keyof ThemeColors["projects"]) => {
  return themeConfig.colors.projects[type];
};

export const getPlatformColor = (
  platform: keyof ThemeColors["platforms"],
  variant: string
) => {
  const platformColors = themeConfig.colors.platforms[platform] as any;
  return platformColors[variant];
};

export const getBreakpoint = (size: string) => {
  // Helper to get breakpoint values for media queries
  const [category, variant] = size.split(".");
  const breakpoints = themeConfig.breakpoints as any;
  return breakpoints[category]?.[variant] || 0;
};

export const createMediaQuery = (size: string) => {
  const breakpoint = getBreakpoint(size);
  return `@media (min-width: ${breakpoint}px)`;
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};

  // Colors
  Object.entries(themeConfig.colors.projects).forEach(([key, value]) => {
    cssVars[`--color-project-${key}`] = value;
  });

  Object.entries(themeConfig.colors.badges).forEach(([key, value]) => {
    cssVars[`--color-badge-${key}`] = value;
  });

  Object.entries(themeConfig.colors.system.text).forEach(([key, value]) => {
    cssVars[`--color-text-${key}`] = value;
  });

  // Dimensions
  Object.entries(themeConfig.dimensions.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = `${value}px`;
  });

  Object.entries(themeConfig.dimensions.radius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = `${value}px`;
  });

  // Heights
  cssVars["--height-menubar"] = `${themeConfig.dimensions.heights.menuBar}px`;
  cssVars["--height-taskbar"] = `${themeConfig.dimensions.heights.taskbar}px`;
  cssVars["--height-dock"] = `${themeConfig.dimensions.heights.dock}px`;

  // Shadows
  Object.entries(themeConfig.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });

  // Z-indices
  Object.entries(themeConfig.zIndex).forEach(([key, value]) => {
    cssVars[`--z-${key}`] = value.toString();
  });

  return cssVars;
};

// Export individual theme sections for convenience
export const colors = themeConfig.colors;
export const dimensions = themeConfig.dimensions;
export const animations = themeConfig.animations;
export const breakpoints = themeConfig.breakpoints;
export const shadows = themeConfig.shadows;
export const zIndex = themeConfig.zIndex;
