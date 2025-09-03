// src/shared/userConfig.ts

export interface UserInfo {
  name: string;
  title: string;
  avatar: string;
  phone: string;
  email: string;
  website: string;
  experience: string;
  skills: string[];
}

export const userConfig: UserInfo = {
  name: "Olatunji Buari",
  title: "Senior Frontend Engineer",
  avatar:
    "https://res.cloudinary.com/duwdwr0r9/image/upload/v1743427116/sticker_qg5max.png",
  phone: "+2348062387436",
  email: "buariolatunji@gmail.com",
  website: "https://buariolatunji.netlify.app/",
  experience: "4+ years",
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Flutter",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "HTML",
    "CSS",
    "CI/CD",
    "REST",
    "Git",
  ],
};

// Export individual properties for convenience
export const {
  name,
  title,
  avatar,
  phone,
  email,
  website,
  experience,
  skills,
} = userConfig;

// Helper functions for formatted display
export const getFormattedPhone = () => phone;
export const getFormattedEmail = () => email;
export const getSkillsString = () => skills.join(", ");
export const getContactInfo = () => ({
  name,
  title,
  avatar,
  phone,
  email,
  website,
});
