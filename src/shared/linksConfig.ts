// src/shared/linksConfig.ts

export interface ExternalLinks {
  social: {
    github: string;
    linkedin: string;
    medium: string;
    twitter?: string;
    instagram?: string;
  };
  portfolio: {
    website: string;
    resume: string;
    cv: string; // Alternative resume link if different
  };
  professional: {
    calendar: string;
    calendly: string; // More specific calendar booking
    email: string; // mailto link
    phone: string; // tel link
  };
  support: {
    buyMeACoffee: string;
    kofi?: string;
    patreon?: string;
  };
  work: {
    // Company/organization websites if relevant
    currentCompany?: string;
    personalBrand?: string;
  };
  external: {
    // External services
    googleCalendar: string;
    googleDrive: string;
    cloudinary: string; // For images
  };
}

export const linksConfig: ExternalLinks = {
  social: {
    github: "https://github.com/softtunex",
    linkedin: "https://www.linkedin.com/in/olatunji-buari-a87031190/",
    medium: "https://medium.com/@olatunjibuari8",
    // twitter: "https://twitter.com/yourusername",
    // instagram: "https://instagram.com/yourusername",
  },

  portfolio: {
    website: "https://buariolatunji.netlify.app/",
    resume:
      "https://drive.google.com/file/d/1b-5QtzA8b3ywoA6G-1wH8yajuekJtM3x/view",
    cv: "https://drive.google.com/file/d/1b-5QtzA8b3ywoA6G-1wH8yajuekJtM3x/view", // Same as resume for now
  },

  professional: {
    calendar: "https://calendly.com/olatunjibuari8/30min",
    calendly: "https://calendly.com/olatunjibuari8/30min",
    email: "mailto:buariolatunji@gmail.com",
    phone: "tel:+2348062387436",
  },

  support: {
    buyMeACoffee: "https://www.buymeacoffee.com/olatunjibuari",
    // kofi: "https://ko-fi.com/yourusername",
    // patreon: "https://patreon.com/yourusername",
  },

  work: {
    // currentCompany: "https://yourcompany.com",
    // personalBrand: "https://yourbrand.com",
  },

  external: {
    googleCalendar: "https://calendar.google.com",
    googleDrive: "https://drive.google.com",
    cloudinary: "https://res.cloudinary.com/duwdwr0r9",
  },
};

// Helper functions for easy access
export const getSocialLinks = () => linksConfig.social;
export const getPortfolioLinks = () => linksConfig.portfolio;
export const getProfessionalLinks = () => linksConfig.professional;
export const getSupportLinks = () => linksConfig.support;

// Helper function to open links in new tab
export const openExternalLink = (url: string, target: string = "_blank") => {
  window.open(url, target, "noopener,noreferrer");
};

// Helper function to create mailto links
export const createMailtoLink = (subject?: string, body?: string) => {
  let link = linksConfig.professional.email;
  const params = [];

  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  if (params.length > 0) {
    link += `?${params.join("&")}`;
  }

  return link;
};

// Helper function to create tel links
export const createPhoneLink = () => {
  return linksConfig.professional.phone;
};

// Helper to get specific link by key path
export const getLink = (path: string): string => {
  const keys = path.split(".");
  let current: any = linksConfig;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      throw new Error(`Link path "${path}" not found in linksConfig`);
    }
  }

  if (typeof current !== "string") {
    throw new Error(`Link path "${path}" does not point to a string URL`);
  }

  return current;
};

// Quick access constants for commonly used links
export const LINKS = {
  GITHUB: linksConfig.social.github,
  LINKEDIN: linksConfig.social.linkedin,
  MEDIUM: linksConfig.social.medium,
  PORTFOLIO: linksConfig.portfolio.website,
  RESUME: linksConfig.portfolio.resume,
  CALENDAR: linksConfig.professional.calendar,
  EMAIL: linksConfig.professional.email,
  PHONE: linksConfig.professional.phone,
  BUY_ME_COFFEE: linksConfig.support.buyMeACoffee,
} as const;

// Type for link categories for better IDE support
export type LinkCategory = keyof ExternalLinks;
export type SocialPlatform = keyof ExternalLinks["social"];
export type PortfolioLink = keyof ExternalLinks["portfolio"];
export type ProfessionalLink = keyof ExternalLinks["professional"];
