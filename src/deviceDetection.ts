// src/deviceDetection.ts
export type DeviceType = "windows" | "macos" | "ios" | "android" | "unknown";

export const detectDevice = (): DeviceType => {
  const userAgent = navigator.userAgent.toLowerCase();

  // Check for iOS devices first (must come before Mac check)
  if (
    /iphone|ipad|ipod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) // Modern iPads report as "MacIntel"
  ) {
    return "ios";
  }
  // Check for Android devices
  else if (/android/.test(userAgent)) {
    return "android";
  }
  // Check for Windows devices
  else if (/win/.test(userAgent)) {
    return "windows";
  }
  // Check for Mac devices (after iOS check to avoid misidentification)
  else if (
    /macintosh|mac os x/.test(userAgent) &&
    navigator.maxTouchPoints <= 1
  ) {
    return "macos";
  }

  return "unknown";
};

// Optional debugging function
export const debugDeviceInfo = (): string => {
  return `
    User Agent: ${navigator.userAgent}
    Platform: ${navigator.platform}
    MaxTouchPoints: ${navigator.maxTouchPoints}
    Detected as: ${detectDevice()}
  `;
};

// For manual device type override in development
export const overrideDeviceType = (deviceType: DeviceType): void => {
  localStorage.setItem("overrideDeviceType", deviceType);
  window.location.reload();
};

// Check for manual override
export const getDeviceType = (): DeviceType => {
  const override = localStorage.getItem(
    "overrideDeviceType"
  ) as DeviceType | null;
  return override || detectDevice();
};
