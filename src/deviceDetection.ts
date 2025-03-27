// src/deviceDetection.ts
export type DeviceType = "windows" | "macos" | "ios" | "android" | "unknown";

export const detectDevice = (): DeviceType => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.indexOf("win") !== -1) {
    return "windows";
  } else if (userAgent.indexOf("mac") !== -1) {
    return "macos";
  } else if (
    userAgent.indexOf("iphone") !== -1 ||
    userAgent.indexOf("ipad") !== -1
  ) {
    return "ios";
  } else if (userAgent.indexOf("android") !== -1) {
    return "android";
  }

  return "unknown";
};
