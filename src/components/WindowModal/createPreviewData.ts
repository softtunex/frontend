// This file contains the data for different site previews

// Helper function to create folder and file data
const createPreviewData = (type: any) => {
  // Common files
  let commonFiles = [
    { name: "README.md", date: "Apr 2, 2025", type: "Markdown", size: "15 KB" },
    { name: "contact.json", date: "Apr 1, 2025", type: "JSON", size: "2 KB" },
  ];

  // Site-specific data
  switch (type) {
    case "portfolio":
      return {
        folders: [
          { name: "Projects", icon: "mdi:folder-open", color: "#1877f2" },
          { name: "Skills", icon: "mdi:folder-star", color: "#1877f2" },
          { name: "Education", icon: "mdi:folder-account", color: "#1877f2" },
          { name: "Contact", icon: "mdi:folder-phone", color: "#1877f2" },
        ],
        files: [
          ...commonFiles,
          {
            name: "portfolio.js",
            date: "Mar 29, 2025",
            type: "JavaScript",
            size: "34 KB",
          },
          {
            name: "App.tsx",
            date: "Mar 28, 2025",
            type: "TypeScript",
            size: "18 KB",
          },
          {
            name: "projects.json",
            date: "Mar 28, 2025",
            type: "JSON",
            size: "42 KB",
          },
          {
            name: "profile.jpg",
            date: "Mar 25, 2025",
            type: "JPEG Image",
            size: "102 KB",
          },
          {
            name: "styles.css",
            date: "Mar 20, 2025",
            type: "CSS",
            size: "24 KB",
          },
          {
            name: "index.html",
            date: "Mar 18, 2025",
            type: "HTML",
            size: "8 KB",
          },
        ],
      };

    case "blog":
      return {
        folders: [
          { name: "Posts", icon: "mdi:folder-text", color: "#44a8b3" },
          { name: "Drafts", icon: "mdi:folder-edit", color: "#44a8b3" },
          { name: "Images", icon: "mdi:folder-image", color: "#44a8b3" },
          { name: "Categories", icon: "mdi:folder-table", color: "#44a8b3" },
        ],
        files: [
          ...commonFiles,
          {
            name: "react-and-typescript.md",
            date: "Mar 28, 2025",
            type: "Markdown",
            size: "22 KB",
          },
          {
            name: "desktop-interfaces.md",
            date: "Feb 15, 2025",
            type: "Markdown",
            size: "18 KB",
          },
          {
            name: "advanced-css.md",
            date: "Jan 5, 2025",
            type: "Markdown",
            size: "16 KB",
          },
          {
            name: "blog-cover.jpg",
            date: "Mar 1, 2025",
            type: "JPEG Image",
            size: "154 KB",
          },
          {
            name: "article-stats.json",
            date: "Apr 1, 2025",
            type: "JSON",
            size: "7 KB",
          },
        ],
      };

    case "resume":
      return {
        folders: [
          { name: "Experience", icon: "mdi:folder-clock", color: "#f40f02" },
          { name: "Skills", icon: "mdi:folder-star", color: "#f40f02" },
          { name: "Education", icon: "mdi:folder-account", color: "#f40f02" },
          { name: "Certificates", icon: "mdi:folder-key", color: "#f40f02" },
        ],
        files: [
          ...commonFiles,
          {
            name: "resume.pdf",
            date: "Apr 1, 2025",
            type: "PDF Document",
            size: "485 KB",
          },
          {
            name: "OlatunjiBuari-CV.docx",
            date: "Mar 25, 2025",
            type: "Word Document",
            size: "375 KB",
          },
          {
            name: "profile-photo.jpg",
            date: "Mar 20, 2025",
            type: "JPEG Image",
            size: "105 KB",
          },
          {
            name: "experience.json",
            date: "Mar 15, 2025",
            type: "JSON",
            size: "12 KB",
          },
          {
            name: "skills-assessment.pdf",
            date: "Feb 10, 2025",
            type: "PDF Document",
            size: "220 KB",
          },
        ],
      };

    case "github":
      return {
        folders: [
          {
            name: "Repositories",
            icon: "mdi:source-repository",
            color: "#333",
          },
          { name: "Contributions", icon: "mdi:source-branch", color: "#333" },
          { name: "Stars", icon: "mdi:star", color: "#333" },
          { name: "Settings", icon: "mdi:cog", color: "#333" },
        ],
        files: [
          ...commonFiles,
          {
            name: "windows-portfolio.js",
            date: "Apr 1, 2025",
            type: "JavaScript",
            size: "56 KB",
          },
          {
            name: "react-taskbar.jsx",
            date: "Mar 20, 2025",
            type: "JSX",
            size: "34 KB",
          },
          {
            name: "drag-resize-react.ts",
            date: "Mar 10, 2025",
            type: "TypeScript",
            size: "28 KB",
          },
          {
            name: "package.json",
            date: "Apr 1, 2025",
            type: "JSON",
            size: "3 KB",
          },
          {
            name: "tsconfig.json",
            date: "Mar 25, 2025",
            type: "JSON",
            size: "2 KB",
          },
          {
            name: "github-stats.md",
            date: "Apr 1, 2025",
            type: "Markdown",
            size: "8 KB",
          },
          {
            name: "LICENSE",
            date: "Jan 1, 2025",
            type: "Text Document",
            size: "1 KB",
          },
        ],
      };

    case "linkedin":
      return {
        folders: [
          { name: "Profile", icon: "mdi:account", color: "#0A66C2" },
          { name: "Connections", icon: "mdi:account-group", color: "#0A66C2" },
          { name: "Recommendations", icon: "mdi:thumb-up", color: "#0A66C2" },
          { name: "Jobs", icon: "mdi:briefcase", color: "#0A66C2" },
        ],
        files: [
          ...commonFiles,
          {
            name: "profile-data.json",
            date: "Apr 1, 2025",
            type: "JSON",
            size: "24 KB",
          },
          {
            name: "connections.json",
            date: "Apr 1, 2025",
            type: "JSON",
            size: "142 KB",
          },
          {
            name: "professional-photo.jpg",
            date: "Mar 20, 2025",
            type: "JPEG Image",
            size: "125 KB",
          },
          {
            name: "experience.json",
            date: "Mar 15, 2025",
            type: "JSON",
            size: "18 KB",
          },
          {
            name: "skills.json",
            date: "Mar 10, 2025",
            type: "JSON",
            size: "8 KB",
          },
          {
            name: "recommendations.md",
            date: "Feb 28, 2025",
            type: "Markdown",
            size: "12 KB",
          },
        ],
      };

    default:
      return {
        folders: [],
        files: commonFiles,
      };
  }
};

export default createPreviewData;
