// src/shared/projectsConfig.ts

export interface Project {
  id: string;
  name: string;
  company: string;
  category: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  videoUrl?: string;
  rating?: number; // Optional - not all projects have ratings
  downloads?: string; // Optional - not all projects have download stats
  size?: string; // Optional - not all projects have size info
  imageUrl: string;
  deviceType?: "mobile" | "web" | "desktop";
  screenshots: string[];
  bgColor: string;
  tools: string[];
  features: string[];
  role: string;
  year?: string;
  website?: string; // Optional - some projects don't have public websites (admin dashboards)
}

export interface Company {
  name: string;
  projects: Project[];
}

export const projectsConfig: Record<string, Project> = {
  "area-56": {
    id: "area-56",
    name: "Area 56 Restaurant App",
    company: "Danval Technologies Ltd",
    category: "Restaurant Mobile App",
    // year: "2023",
    role: "Senior Frontend Developer",
    description:
      "Mobile ordering platform for Area 56 Restaurant with QR-based table service",
    longDescription:
      "Area 56 is a comprehensive mobile ordering platform designed for Area 56 Restaurant and Bar. The app features QR code table scanning for seamless dining experiences, allowing customers to order directly from their tables. With an intuitive menu browsing system, real-time cart management, and integrated payment processing through Paystack and OPay, customers can enjoy a contactless dining experience. The app supports both guest users and registered accounts, with complete order tracking from placement to completion.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744412042/0e7700dc4e77661543c2bc20069ebb76_arvn8e.jpg",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205521/Screenshot_2025-09-06_224325_kbl7ct.png",
    deviceType: "mobile",
    videoUrl:
      "https://res.cloudinary.com/duwdwr0r9/video/upload/v1757203397/Area56Preview_u4ldhb.mp4",
    rating: 4.8,
    downloads: "1K+",
    size: "5.2 MB",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205521/Screenshot_2025-09-06_224325_kbl7ct.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205521/Screenshot_2025-09-07_001723_jrseek.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205522/Screenshot_2025-09-07_001848_oulzrt.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205522/Screenshot_2025-09-07_001959_fuynmq.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205526/Screenshot_2025-09-07_002118_mh0m37.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205522/Screenshot_2025-09-07_002218_zyo64p.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205525/Screenshot_2025-09-07_002454_kheqxq.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757205524/Screenshot_2025-09-07_002406_wxbtun.png",
    ],
    bgColor: "#D32F2F",
    tools: [
      "React",
      "TypeScript",
      "React Query",
      "Tailwind CSS",
      "Paystack API",
      "OPay API",
    ],
    features: [
      "QR code table scanning for contactless ordering",
      "Real-time menu browsing with categorized items",
      "Shopping cart management with quantity controls",
      "Multiple payment options (Paystack, OPay)",
      "Order tracking with status updates (Cart, Ongoing, Completed)",
      "Guest user support for quick ordering",
      "Table assignment and waiter communication system",
      "Search functionality for menu items",
      "Order history and reorder capabilities",
    ],
    website: "https://areafiftysix.com/?location_id=4&number=AS16",
  },

  "area-56-admin": {
    id: "area-56-admin",
    name: "Area 56 Admin Dashboard",
    company: "Danval Technologies Ltd",
    category: "Restaurant Management System",
    role: "Senior Frontend Developer",
    description:
      "Comprehensive admin dashboard for managing Area 56 Restaurant operations",
    longDescription:
      "The Area 56 Admin Dashboard is a powerful restaurant management system that provides complete operational control for Area 56 Restaurant and Bar. The platform features comprehensive sales analytics, real-time order management, staff scheduling, inventory control, and multi-location management. With advanced reporting capabilities, role-based permissions, and real-time notifications, restaurant managers can efficiently oversee all aspects of their business operations across multiple locations.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744412042/0e7700dc4e77661543c2bc20069ebb76_arvn8e.jpg",
    videoUrl:
      "https://res.cloudinary.com/duwdwr0r9/video/upload/v1757258799/8mb.video-wSv-hk5OJBtH_rnwprw.mp4",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
    deviceType: "desktop",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757252233/Screenshot_2025-04-09_103131_pm6npw.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251870/Screenshot_2025-09-07_134903_a02hrr.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251875/Screenshot_2025-09-07_134952_y3augw.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251877/Screenshot_2025-09-07_135135_esk8rc.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251880/Screenshot_2025-09-07_135222_phayzf.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251881/Screenshot_2025-09-07_135308_vrvlah.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251885/Screenshot_2025-09-07_135337_wdzswe.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251885/Screenshot_2025-09-07_135420_bvsyt7.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251887/Screenshot_2025-09-07_135444_vupltr.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251892/Screenshot_2025-09-07_135517_esiuse.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251893/Screenshot_2025-09-07_135547_s9jb5g.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251895/Screenshot_2025-09-07_140133_cxzuly.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757251898/Screenshot_2025-09-07_140149_hbvrvr.png",
    ],
    bgColor: "#1565C0",
    tools: ["React", "TypeScript", "React Query", "Tailwind CSS", "Chart.js"],
    features: [
      "Real-time sales analytics and reporting dashboard",
      "Comprehensive order management with status tracking",
      "Table management with QR code generation",
      "Multi-location restaurant management",
      "Staff scheduling and calendar management",
      "Inventory management with stock tracking",
      "User management and role-based permissions",
      "Payment processing and financial reporting",
      "Real-time notifications and alerts system",
      "Vendor management and procurement tracking",
      "Customer data management and analytics",
      "Advanced filtering and search capabilities",
    ],
    // No public website for admin dashboard
  },

  acadasuite: {
    id: "acadasuite",
    name: "Acadasuite",
    company: "Norak Technology",
    category: "Educational Platform",
    year: "2022",
    role: "Frontend Developer",
    description:
      "Comprehensive educational management suite for academic institutions",
    longDescription:
      "Acadasuite is an all-in-one educational management platform designed to handle everything from student enrollment to curriculum management. It provides administrators, teachers, and students with tools to streamline educational processes, track performance, and facilitate communication. The platform features a modern, intuitive interface that makes managing educational resources and activities simple and efficient.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/acadasuite-logo_f9jd5m.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283198/Screenshot_2025-04-10_115715_fl1dk8.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283198/Screenshot_2025-04-10_115715_fl1dk8.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283198/Screenshot_2025-04-10_115715_fl1dk8.png",
    ],
    bgColor: "#1976D2",
    tools: ["React", "Redux", "Material UI", "Node.js", "PostgreSQL", "AWS"],
    features: [
      "Student information management system",
      "Course scheduling and curriculum planning",
      "Grade tracking and report generation",
      "Attendance management",
      "Communication portal for students, parents, and teachers",
      "Resource sharing and assignment submission",
    ],
    website: "https://acadasuite.com/",
  },

  "myinvester-website": {
    id: "myinvester-website",
    name: "MyInvestar Website",
    company: "First Ally Asset Management",
    category: "Fintech",
    year: "2023",
    role: "Lead Frontend Developer",
    description:
      "Investment platform frontend for individual and institutional investors",
    longDescription:
      "MyInvestar is a cutting-edge investment platform providing individual and institutional investors with tools to manage their investment portfolios. The website features an elegant, user-friendly interface that simplifies complex financial data and investment options. Users can track portfolio performance, analyze potential investments, and make informed decisions with real-time market data.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/myinvestar-logo_k9cyej.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283711/Screenshot_2025-04-10_121309_cbo6su.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283711/Screenshot_2025-04-10_121309_cbo6su.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283711/Screenshot_2025-04-10_121309_cbo6su.png",
    ],
    bgColor: "#0288D1",
    tools: [
      "React",
      "NextJS",
      "Styled Components",
      "Chart.js",
      "RESTful APIs",
      "Auth0",
    ],
    features: [
      "Real-time portfolio tracking and visualization",
      "Investment opportunity discovery",
      "Secure account management",
      "Financial goal setting and tracking",
      "Document management for investments",
      "Investment performance analytics",
    ],
    website: "https://myinvestar.ng/",
  },

  "myinvester-admin": {
    id: "myinvester-admin",
    name: "MyInvestar Admin",
    company: "First Ally Asset Management",
    category: "Fintech Administration",
    year: "2023",
    role: "Frontend Developer",
    description:
      "Back office administration dashboard for the MyInvestar platform",
    longDescription:
      "The MyInvestar Admin dashboard provides administrators with comprehensive tools to manage the investment platform. The system enables staff to monitor user accounts, oversee investment products, track transactions, and generate reports. With its powerful analytics capabilities, administrators can gain insights into platform performance and user behavior to optimize operations.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/myinvestar-logo_k9cyej.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283912/Screenshot_2025-04-10_121734_nij8xd.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283912/Screenshot_2025-04-10_121734_nij8xd.png",
    ],
    bgColor: "#00ACC1",
    tools: [
      "React",
      "Redux",
      "TypeScript",
      "Ant Design",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "User management and administration",
      "Investment product management",
      "Transaction monitoring and approval",
      "Reporting and analytics dashboard",
      "Customer support ticketing system",
      "Audit logging and compliance tools",
    ],
    // No website for admin dashboard
  },

  "faam-website": {
    id: "faam-website",
    name: "FAAM Website",
    company: "First Ally Asset Management",
    category: "Corporate Website",
    year: "2022",
    role: "Frontend Developer",
    description: "Official website for First Ally Asset Management",
    longDescription:
      "The FAAM Website serves as the digital face of First Ally Asset Management, providing visitors with information about the company's investment services, team, and thought leadership. The responsive website features a modern design with smooth animations and intuitive navigation, making it easy for potential clients to learn about the company's offerings and get in touch.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/faam-logo_cwylfy.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284157/Screenshot_2025-04-10_122104_dzujhf.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284157/Screenshot_2025-04-10_122104_dzujhf.png",
    ],
    bgColor: "#00796B",
    tools: [
      "React",
      "NextJS",
      "Tailwind CSS",
      "Framer Motion",
      "Contentful CMS",
    ],
    features: [
      "Responsive design for all devices",
      "Interactive investment calculator",
      "Team member profiles",
      "Blog and publication section",
      "Service details and pricing",
      "Contact form and location map",
    ],
    website: "http://first-allyproperties.com/",
  },

  "first-ally-mfb": {
    id: "first-ally-mfb",
    name: "First Ally MFB",
    company: "First Ally Asset Management",
    category: "Banking",
    year: "2022",
    role: "Frontend Lead",
    description: "Landing page for First Ally Microfinance Bank",
    longDescription:
      "The First Ally MFB landing page is designed to introduce potential customers to First Ally Microfinance Bank's services and benefits. The page features a clean, professional design with clear calls to action, service descriptions, and testimonials. The responsive layout ensures a seamless experience across all devices, making it easy for visitors to learn about the bank's offerings and take the next step.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/firstally-logo_nxwjhr.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284906/Screenshot_2025-04-10_123411_ysillh.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284906/Screenshot_2025-04-10_123411_ysillh.png",
    ],
    bgColor: "#388E3C",
    tools: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GSAP Animations"],
    features: [
      "Responsive landing page design",
      "Service showcase section",
      "Testimonial carousel",
      "Contact form with validation",
      "Branch location map",
      "FAQ accordion section",
    ],
    website: "http://first-allymfb.com/",
  },

  "waec-hris": {
    id: "waec-hris",
    name: "WAEC HRIS",
    company: "Sidmach Technologies Ltd",
    category: "HR Management System",
    year: "2021",
    role: "Frontend Developer",
    description: "Complete human resource information system for WAEC",
    longDescription:
      "The WAEC HRIS is a comprehensive human resource information system developed for the West African Examinations Council. The system digitizes and streamlines HR processes including employee onboarding, performance management, leave administration, and payroll. The platform features an intuitive interface that allows HR administrators to efficiently manage employee data and processes while providing employees with self-service capabilities.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/waec-logo_qdbmff.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744288208/Screenshot_2022-06-15_194531_u551bg.jpg",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744288208/Screenshot_2022-06-15_194531_u551bg.jpg",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757268774/image_upvqhi.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757268773/image_dtbfsv.jpg",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757268774/image_2_menumf.png",
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1757268775/image_1_yzkowf.png",
    ],
    bgColor: "#689F38",
    tools: ["MVC .NET", "JavaScript", "JQuery", "Bootstrap"],
    features: [
      "Employee data management",
      "Leave and absence tracking",
      "Performance evaluation system",
      "Training and development tracking",
      "Payroll processing integration",
      "Customizable reporting dashboard",
    ],
    // No public website - internal WAEC system
  },

  youthplus: {
    id: "youthplus",
    name: "YouthPlus",
    company: "Sidmach Technologies Ltd",
    category: "Social Media",
    year: "2021",
    role: "Frontend Developer",
    description: "Social networking platform for young professionals",
    longDescription:
      "YouthPlus is a social networking platform designed specifically for young professionals to connect, collaborate, and advance their careers. The platform features profile creation, networking capabilities, job postings, skill endorsements, and learning resources. With its modern, intuitive interface, YouthPlus makes it easy for users to build their professional network and access opportunities for career growth.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/youthplus-logo_njhrr5.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744286847/Screenshot_2025-04-10_130557_rs1dje.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744286847/Screenshot_2025-04-10_130557_rs1dje.png",
    ],
    bgColor: "#AFB42B",
    tools: [
      "React",
      "Redux",
      "Socket.io",
      "Firebase",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "User profiles with skill showcasing",
      "Professional networking capabilities",
      "Job board and application system",
      "Skill endorsements and recommendations",
      "Learning resources and courses",
      "Event discovery and registration",
    ],
    website: "https://apps.youthplus.ng/",
  },

  "youthplus-admin": {
    id: "youthplus-admin",
    name: "YouthPlus Admin",
    company: "Sidmach Technologies Ltd",
    category: "Content Management",
    year: "2021",
    role: "Frontend Developer",
    description: "Administrative dashboard for managing the YouthPlus platform",
    longDescription:
      "The YouthPlus Admin dashboard provides platform administrators with tools to manage the YouthPlus social networking platform. The system enables content moderation, user management, analytics tracking, and configuration of platform features. With its comprehensive suite of tools, administrators can ensure the platform runs smoothly and provides a positive experience for all users.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/youthplus-logo_njhrr5.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/Screenshot_2025-04-11_222055_1_nk53ss.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/Screenshot_2025-04-11_222055_1_nk53ss.png",
    ],
    bgColor: "#FBC02D",
    tools: [
      "React",
      "Redux",
      "Material UI",
      "Chart.js",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "User management and moderation",
      "Content approval and moderation",
      "Analytics dashboard",
      "Job posting management",
      "Event administration",
      "System configuration and settings",
    ],
    // No website for admin dashboard
  },

  "approval-flow": {
    id: "approval-flow",
    name: "Approval Flow System",
    company: "Sidmach Technologies Ltd",
    category: "Business Process",
    year: "2020",
    role: "Frontend Developer",
    description:
      "Automated workflow for document and request approvals (inhouse)",
    longDescription:
      "The Approval Flow System is an internal tool developed for Sidmach Technologies to streamline approval processes for documents, requests, and workflows. The system allows for the creation of custom approval chains, role-based permissions, and automated notifications. With its flexible configuration options, the platform can accommodate various approval scenarios while maintaining transparency and accountability.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/approval-logo_qdbfgu.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/tinywow_remove_object_78634476_1_qmn5ni.png",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/tinywow_remove_object_78634476_1_qmn5ni.png",
    ],
    bgColor: "#512DA8",
    tools: ["React", "Redux", "Bootstrap", "Node.js", "Express", "MongoDB"],
    features: [
      "Customizable approval workflows",
      "Role-based permissions",
      "Document attachment and version tracking",
      "Email and in-app notifications",
      "Approval history and audit trail",
      "Dashboard with pending approvals and status tracking",
    ],
    // No website for internal system
  },

  "appraisal-system": {
    id: "appraisal-system",
    name: "Appraisal System",
    company: "Sidmach Technologies Ltd",
    category: "HR Software",
    year: "2020",
    role: "Frontend Developer",
    description: "Employee performance tracking and evaluation tool (inhouse)",
    longDescription:
      "The Appraisal System is an internal HR tool developed for Sidmach Technologies to manage employee performance evaluations. The platform facilitates goal setting, performance tracking, feedback collection, and evaluation reporting. With its comprehensive features, the system helps managers conduct fair, consistent performance reviews while giving employees visibility into their progress and areas for improvement.",
    logoUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/appraisal-logo_flhzna.png",
    imageUrl:
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/performance_iwvbff.jpg",
    screenshots: [
      "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/performance_iwvbff.jpg",
    ],
    bgColor: "#7B1FA2",
    tools: ["Angular", "TypeScript", "Bootstrap", ".NET Core", "SQL Server"],
    features: [
      "Goal setting and tracking",
      "Performance metrics and KPI management",
      "Self-assessment capabilities",
      "360-degree feedback collection",
      "Evaluation forms and templates",
      "Performance history and reporting",
    ],
    // No website for internal system
  },
};

// Helper functions and organized data structures
export const getProjectsByCompany = (): Company[] => {
  const companyOrder = [
    "Danval Technologies Ltd",
    "Sidmach Technologies Ltd",
    "First Ally Asset Management",
    "Norak Technology",
  ];

  return companyOrder
    .map((companyName) => ({
      name: companyName,
      projects: Object.values(projectsConfig).filter(
        (project) => project.company === companyName
      ),
    }))
    .filter((company) => company.projects.length > 0);
};

export const getAllProjects = (): Project[] => {
  return Object.values(projectsConfig);
};

export const getProjectById = (id: string): Project | undefined => {
  return projectsConfig[id];
};

export const getFeaturedProject = (): Project => {
  return projectsConfig["area-56"]; // Area 56 as featured project
};

export const getProjectsForModal = (): Project[] => {
  // Return projects organized for the modal display
  const companies = getProjectsByCompany();
  return companies.flatMap((company) => company.projects);
};

// Export project count for badges
export const projectCounts = {
  total: Object.keys(projectsConfig).length,
  javascript: Object.values(projectsConfig).filter(
    (p) => p.tools.includes("JavaScript") || p.tools.includes("React")
  ).length,
  github: 10, // Repositories count
  linkedin: "4K", // Connections count
  blog: 3, // Articles count
};
