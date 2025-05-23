import React, { useState, useEffect } from "react";

interface ProjectDetail {
  id: string;
  name: string;
  company: string;
  category: string;
  description: string;
  longDescription?: string;
  logoUrl?: string;
  imageUrl?: string;
  screenshots?: string[];
  bgColor?: string;
  tools?: string[];
  features?: string[];
  role?: string;
  year?: string;
  website?: string;
}

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
  osType: "windows" | "mac";
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectId,
  onBack,
  osType,
}) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    // Simulate loading project details
    setLoading(true);

    // Fetch project details based on projectId
    setTimeout(() => {
      const projectDetails: Record<string, ProjectDetail> = {
        "area-56": {
          id: "area-56",
          name: "Area 56 Restaurant",
          company: "Danval Technologies Ltd",
          category: "Restaurant Web App",
          year: "2023",
          role: "Senior Frontend Developer",
          description:
            "Digital ordering and management system for Area 56 Restaurant/Bar",
          longDescription:
            "Area 56 is a comprehensive digital platform designed to streamline operations for Area 56 Restaurant and Bar. The system features an intuitive online ordering system, real-time inventory management, sales analytics, and staff management tools. The responsive design works across all devices, allowing customers to easily browse menus and place orders while giving staff powerful tools to manage the restaurant efficiently.",
          logoUrl:
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744412042/0e7700dc4e77661543c2bc20069ebb76_arvn8e.jpg",
          imageUrl:
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
          screenshots: [
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
          ],
          bgColor: "#D32F2F",
          tools: [
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "MongoDB",
            "Stripe API",
            "Firebase",
          ],
          features: [
            "Online ordering system with real-time updates",
            "Table reservation management",
            "Inventory tracking and management",
            "Staff scheduling and performance analytics",
            "Customer loyalty program integration",
            "Mobile-responsive design for all devices",
          ],
          website: "https://area56restaurant.com",
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
          tools: [
            "React",
            "Redux",
            "Material UI",
            "Node.js",
            "PostgreSQL",
            "AWS",
          ],
          features: [
            "Student information management system",
            "Course scheduling and curriculum planning",
            "Grade tracking and report generation",
            "Attendance management",
            "Communication portal for students, parents, and teachers",
            "Resource sharing and assignment submission",
          ],
          website: "https://acadasuite.com",
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
          website: "https://myinvestar.com",
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
          website: "https://admin.myinvestar.com",
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
          website: "https://firstallyassetmanagement.com",
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
          tools: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Bootstrap",
            "GSAP Animations",
          ],
          features: [
            "Responsive landing page design",
            "Service showcase section",
            "Testimonial carousel",
            "Contact form with validation",
            "Branch location map",
            "FAQ accordion section",
          ],
          website: "https://firstallymfb.com",
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
          ],
          bgColor: "#689F38",
          tools: [
            "Angular",
            "TypeScript",
            "NgRx",
            "Bootstrap",
            ".NET Core",
            "SQL Server",
          ],
          features: [
            "Employee data management",
            "Leave and absence tracking",
            "Performance evaluation system",
            "Training and development tracking",
            "Payroll processing integration",
            "Customizable reporting dashboard",
          ],
          website: "https://waec-hris.org",
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
          website: "https://youthplus.org",
        },
        "youthplus-admin": {
          id: "youthplus-admin",
          name: "YouthPlus Admin",
          company: "Sidmach Technologies Ltd",
          category: "Content Management",
          year: "2021",
          role: "Frontend Developer",
          description:
            "Administrative dashboard for managing the YouthPlus platform",
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
          website: "https://admin.youthplus.org",
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
          tools: [
            "React",
            "Redux",
            "Bootstrap",
            "Node.js",
            "Express",
            "MongoDB",
          ],
          features: [
            "Customizable approval workflows",
            "Role-based permissions",
            "Document attachment and version tracking",
            "Email and in-app notifications",
            "Approval history and audit trail",
            "Dashboard with pending approvals and status tracking",
          ],
          website: "https://internal.sidmach.com/approvals",
        },
        "appraisal-system": {
          id: "appraisal-system",
          name: "Appraisal System",
          company: "Sidmach Technologies Ltd",
          category: "HR Software",
          year: "2020",
          role: "Frontend Developer",
          description:
            "Employee performance tracking and evaluation tool (inhouse)",
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
          tools: [
            "Angular",
            "TypeScript",
            "Bootstrap",
            ".NET Core",
            "SQL Server",
          ],
          features: [
            "Goal setting and tracking",
            "Performance metrics and KPI management",
            "Self-assessment capabilities",
            "360-degree feedback collection",
            "Evaluation forms and templates",
            "Performance history and reporting",
          ],
          website: "https://internal.sidmach.com/appraisal",
        },
      };

      // Get project by ID
      const selectedProject = projectDetails[projectId];
      if (selectedProject) {
        setProject(selectedProject);
      }

      setLoading(false);
    }, 800);
  }, [projectId]);

  if (loading) {
    return (
      <div className={`project-details-container ${osType}`}>
        <div className={`project-details-loading ${osType}`}>
          <div className={`loading-spinner ${osType}`}></div>
          <div className="loading-text">Loading project details...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`project-details-container ${osType}`}>
        <div className={`project-not-found ${osType}`}>
          <h2>Project not found</h2>
          <button className={`back-button ${osType}`} onClick={onBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-details-container ${osType}`}>
      {/* Header with back button */}
      <div className={`project-details-header ${osType}`}>
        <button className={`back-button ${osType}`} onClick={onBack}>
          {osType === "windows" ? "←" : "‹"} Back
        </button>
      </div>

      {/* Project header section */}
      <div className={`project-hero ${osType}`}>
        <div className={`project-hero-content ${osType}`}>
          <div className={`project-logo-container ${osType}`}>
            <img
              src={project.logoUrl}
              alt={project.name}
              className={`project-logo ${osType}`}
            />
          </div>
          <div className={`project-hero-info ${osType}`}>
            <h1 className={`project-title ${osType}`}>{project.name}</h1>
            <p className={`project-subtitle ${osType}`}>{project.company}</p>
            <div className={`project-meta ${osType}`}>
              <span className={`project-category ${osType}`}>
                {project.category}
              </span>
              {project.year && (
                <span className={`project-year ${osType}`}>{project.year}</span>
              )}
              {project.role && (
                <span className={`project-role ${osType}`}>{project.role}</span>
              )}
            </div>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-website-button ${osType}`}
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project screenshots */}
      <div className={`project-screenshots ${osType}`}>
        <h2 className={`section-title ${osType}`}>Screenshots</h2>
        <div className={`screenshots-gallery ${osType}`}>
          {project.screenshots?.map((screenshot, index) => (
            <div key={index} className={`screenshot-item ${osType}`}>
              <img
                src={screenshot}
                alt={`${project.name} screenshot ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project description */}
      <div className={`project-description ${osType}`}>
        <h2 className={`section-title ${osType}`}>Description</h2>
        <p className={`description-text ${osType}`}>
          {project.longDescription}
        </p>
      </div>

      {/* Technologies used */}
      <div className={`project-technologies ${osType}`}>
        <h2 className={`section-title ${osType}`}>Technologies</h2>
        <div className={`technology-tags ${osType}`}>
          {project.tools?.map((tool, index) => (
            <span key={index} className={`technology-tag ${osType}`}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className={`project-features ${osType}`}>
        <h2 className={`section-title ${osType}`}>Key Features</h2>
        <ul className={`features-list ${osType}`}>
          {project.features?.map((feature, index) => (
            <li key={index} className={`feature-item ${osType}`}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetails;
