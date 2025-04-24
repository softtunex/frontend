import React, { useState, useEffect } from "react";
import "./ProjectModal.css";
import ProjectDetails from "./ProjectDetails";

interface Project {
  id: string;
  name: string;
  company: string;
  category: string;
  description?: string;
  logoUrl?: string;
  imageUrl?: string;
  bgColor?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  osType: "windows" | "mac"; // OS type for UI adaptation
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectId,
  osType,
}) => {
  const [loading, setLoading] = useState(true);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && projectId) {
      // Simulate loading data
      setLoading(true);

      // Reset selected project when modal opens
      setSelectedProject(null);

      // Mock data fetch with actual projects
      setTimeout(() => {
        // Set Area 56 as the featured project
        setFeaturedProject({
          id: "area-56",
          name: "Area 56 Restaurant",
          company: "Danval Technologies Ltd",
          category: "Restaurant Web App",
          description:
            "Digital ordering and management system for Area 56 Restaurant/Bar",
          logoUrl:
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744412042/0e7700dc4e77661543c2bc20069ebb76_arvn8e.jpg",
          imageUrl:
            "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
          bgColor: "#D32F2F",
        });

        // Set the projects list - organized by company
        setMyProjects([
          // Danval Technologies
          {
            id: "area-56",
            name: "Area 56 Restaurant",
            company: "Danval Technologies Ltd",
            category: "Restaurant Web App",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/area56-logo_zwv5pa.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744233065/Screenshot_2025-04-09_215933_q3a4my.png",
            bgColor: "#D32F2F",
          },

          // Norak Technology
          {
            id: "acadasuite",
            name: "Acadasuite",
            company: "Norak Technology",
            category: "Educational Platform",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/acadasuite-logo_f9jd5m.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283198/Screenshot_2025-04-10_115715_fl1dk8.png",
            bgColor: "#1976D2",
          },

          // First Ally Asset Management
          {
            id: "myinvester-website",
            name: "MyInvestar Website",
            company: "First Ally Asset Management",
            category: "Fintech",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/myinvestar-logo_k9cyej.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283711/Screenshot_2025-04-10_121309_cbo6su.png",
            bgColor: "#0288D1",
          },

          {
            id: "myinvester-admin",
            name: "MyInvestar Admin",
            company: "First Ally Asset Management",
            category: "Fintech Administration",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/myinvestar-logo_k9cyej.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744283912/Screenshot_2025-04-10_121734_nij8xd.png",
            bgColor: "#00ACC1",
          },

          {
            id: "faam-website",
            name: "FAAM Website",
            company: "First Ally Asset Management",
            category: "Corporate Website",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/faam-logo_cwylfy.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284157/Screenshot_2025-04-10_122104_dzujhf.png",
            bgColor: "#00796B",
          },

          {
            id: "first-ally-mfb",
            name: "First Ally MFB",
            company: "First Ally Asset Management",
            category: "Banking",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/firstally-logo_nxwjhr.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744284906/Screenshot_2025-04-10_123411_ysillh.png",
            bgColor: "#388E3C",
          },

          // Sidmach Technologies
          {
            id: "waec-hris",
            name: "WAEC HRIS",
            company: "Sidmach Technologies Ltd",
            category: "HR Management System",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/waec-logo_qdbmff.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744288208/Screenshot_2022-06-15_194531_u551bg.jpg",
            bgColor: "#689F38",
          },

          {
            id: "youthplus",
            name: "YouthPlus",
            company: "Sidmach Technologies Ltd",
            category: "Social Media",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/youthplus-logo_njhrr5.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744286847/Screenshot_2025-04-10_130557_rs1dje.png",
            bgColor: "#AFB42B",
          },

          {
            id: "youthplus-admin",
            name: "YouthPlus Admin",
            company: "Sidmach Technologies Ltd",
            category: "Content Management",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/youthplus-logo_njhrr5.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/Screenshot_2025-04-11_222055_1_nk53ss.png",
            bgColor: "#FBC02D",
          },

          {
            id: "approval-flow",
            name: "Approval Flow System",
            company: "Sidmach Technologies Ltd",
            category: "Business Process",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/approval-logo_qdbfgu.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744407358/tinywow_remove_object_78634476_1_qmn5ni.png",
            bgColor: "#512DA8",
          },

          {
            id: "appraisal-system",
            name: "Appraisal System",
            company: "Sidmach Technologies Ltd",
            category: "HR Software",
            logoUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/appraisal-logo_flhzna.png",
            imageUrl:
              "https://res.cloudinary.com/duwdwr0r9/image/upload/v1744108356/performance_iwvbff.jpg",
            bgColor: "#7B1FA2",
          },
        ]);

        setLoading(false);
      }, 800);
    }
  }, [isOpen, projectId]);

  if (!isOpen) return null;

  // If a project is selected, show its details
  if (selectedProject) {
    return (
      <div className={`modal-overlay ${osType}`}>
        <div className={`modal-container ${osType} modal-container-expanded`}>
          {/* OS-specific window controls */}
          {osType === "mac" ? (
            <div className="mac-window-controls">
              <div className="mac-control close" onClick={onClose}></div>
              <div className="mac-control minimize"></div>
              <div className="mac-control expand"></div>
            </div>
          ) : (
            <button className="close-button windows" onClick={onClose}>
              <span>×</span>
            </button>
          )}

          <ProjectDetails
            projectId={selectedProject}
            onBack={() => setSelectedProject(null)}
            osType={osType}
          />
        </div>
      </div>
    );
  }

  // Function to group projects by company
  const groupProjectsByCompany = () => {
    const companies: Record<string, Project[]> = {};

    myProjects.forEach((project) => {
      if (!companies[project.company]) {
        companies[project.company] = [];
      }
      companies[project.company].push(project);
    });

    return companies;
  };

  const groupedProjects = groupProjectsByCompany();

  // Handle project click to view details
  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  // Common modal design for both OS types
  return (
    <div className={`modal-overlay ${osType}`}>
      <div className={`modal-container ${osType}`}>
        {/* OS-specific window controls */}
        {osType === "mac" ? (
          <div className="mac-window-controls">
            <div className="mac-control close" onClick={onClose}></div>
            <div className="mac-control minimize"></div>
            <div className="mac-control expand"></div>
          </div>
        ) : (
          <button className="close-button windows" onClick={onClose}>
            <span>×</span>
          </button>
        )}

        {loading ? (
          <div className={`loading-container ${osType}`}>
            <div className={`loading-spinner ${osType}`}></div>
            {osType === "mac" && (
              <div className="loading-text mac">LOADING</div>
            )}
          </div>
        ) : (
          <div className={`modal-content ${osType}`}>
            <section className={`featured-section ${osType}`}>
              <h2>Featured</h2>
              <hr />

              {featuredProject && (
                <div
                  className={`featured-project ${osType}`}
                  onClick={() => handleProjectClick(featuredProject.id)}
                >
                  <div className={`project-info ${osType}`}>
                    <h3>{featuredProject.name}</h3>
                    <p className={`category ${osType}`}>
                      {featuredProject.category}
                    </p>
                    <p className={`description ${osType}`}>
                      {featuredProject.description}
                    </p>
                    <button className={`see-more-btn ${osType}`}>
                      See more
                    </button>
                  </div>
                  <div
                    className={`project-image ${osType}`}
                    style={{
                      backgroundImage: `url(${featuredProject.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="project-logo-container">
                      {featuredProject.logoUrl && (
                        <img
                          src={featuredProject.logoUrl}
                          alt={featuredProject.name}
                          className="project-logo-img"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className={`my-projects-section ${osType}`}>
              <h2>My Projects</h2>
              <hr />

              {Object.entries(groupedProjects).map(([company, projects]) => (
                <div key={company} className={`company-section ${osType}`}>
                  <h3 className={`company-name ${osType}`}>{company}</h3>
                  <div className={`projects-grid ${osType}`}>
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`project-item-card ${osType}`}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div className="project-item-header">
                          <div className="project-item-logo">
                            {project.logoUrl && (
                              <img
                                src={project.logoUrl}
                                alt={project.name}
                                className="project-logo-small"
                              />
                            )}
                          </div>
                          <div className="project-item-details">
                            <h4>{project.name}</h4>
                            <p>{project.category}</p>
                          </div>
                        </div>
                        <div
                          className="project-item-image"
                          style={{
                            backgroundImage: `url(${project.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
