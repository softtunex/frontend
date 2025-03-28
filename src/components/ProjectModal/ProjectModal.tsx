// src/components/ProjectModal/ProjectModal.tsx
import React, { useState, useEffect } from "react";
import "./ProjectModal.css";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  icon?: string;
  thumbnail?: string;
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

  useEffect(() => {
    if (isOpen && projectId) {
      // Simulate loading data
      setLoading(true);

      // Mock data fetch with your specific projects - same data for both OS types
      setTimeout(() => {
        // Set MyInvestar as the featured project
        setFeaturedProject({
          id: "myinvestar",
          name: "MyInvestar",
          category: "Fintech",
          description:
            "Investment management platform with comprehensive back office functionality",
          icon: "🏦", // Placeholder for actual icon path
        });

        // Set the projects list - same for both OS types
        setMyProjects([
          {
            id: "area-56",
            name: "Area 56",
            category: "Restaurant Web App",
            description:
              "Digital ordering and management system for restaurants",
            icon: "🍽️",
            thumbnail: "/area56-thumbnail.jpg",
          },
          {
            id: "myinvestar-backoffice",
            name: "MyInvestar Back Office",
            category: "Fintech Administration",
            description: "Administrative dashboard for the MyInvestar platform",
            icon: "📊",
            thumbnail: "/myinvestar-bo-thumbnail.jpg",
          },
          {
            id: "youthplus",
            name: "Youthplus",
            category: "Social Media",
            description: "Social networking platform for young professionals",
            icon: "👥",
            thumbnail: "/youthplus-thumbnail.jpg",
          },
          {
            id: "appraisal-system",
            name: "Appraisal System",
            category: "HR Software",
            description: "Employee performance tracking and evaluation tool",
            icon: "📈",
            thumbnail: "/appraisal-thumbnail.jpg",
          },
          {
            id: "approval-flow",
            name: "Approval Flow System",
            category: "Business Process",
            description:
              "Automated workflow for document and request approvals",
            icon: "✅",
            thumbnail: "/approval-flow-thumbnail.jpg",
          },
          {
            id: "waec-hris",
            name: "WAEC HRIS",
            category: "HR Management System",
            description: "Complete human resource information system for WAEC",
            icon: "👔",
            thumbnail: "/waec-hris-thumbnail.jpg",
          },
          {
            id: "edustat",
            name: "Edustat",
            category: "Education",
            description: "Educational statistics and analytics platform",
            icon: "📚",
            thumbnail: "/edustat-thumbnail.jpg",
          },
          {
            id: "first-ally",
            name: "First Ally Management",
            category: "Corporate Website",
            description: "Official website for First Ally Management company",
            icon: "🏢",
            thumbnail: "/first-ally-thumbnail.jpg",
          },
        ]);

        setLoading(false);
      }, 2000); // 2 second loading simulation
    }
  }, [isOpen, projectId]);

  if (!isOpen) return null;

  // Render with OS-specific styling
  if (osType === "mac") {
    // macOS modal UI
    return (
      <div className="modal-overlay mac">
        <div className="modal-container mac">
          {/* macOS window controls */}
          <div className="mac-window-controls">
            <div className="mac-control close" onClick={onClose}></div>
            <div className="mac-control minimize"></div>
            <div className="mac-control expand"></div>
          </div>

          {loading ? (
            <div className="loading-container mac">
              <div className="loading-spinner mac"></div>
              <div className="loading-text mac">LOADING</div>
            </div>
          ) : (
            <div className="modal-content mac">
              <section className="featured-section mac">
                <h2>Featured</h2>
                <hr />

                {featuredProject && (
                  <div className="featured-project mac">
                    <div className="project-info mac">
                      <h3>{featuredProject.name}</h3>
                      <p className="category mac">{featuredProject.category}</p>
                      <p className="description mac">
                        {featuredProject.description}
                      </p>
                      <button className="see-more-btn mac">See more</button>
                    </div>
                    <div className="project-preview mac">
                      <div
                        className="preview-image mac"
                        style={{
                          backgroundImage: `linear-gradient(to right, #0078d4, #005a9e)`,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="project-logo mac">
                          {featuredProject.name}
                        </span>
                        <div className="project-icon mac">
                          <span style={{ fontSize: "24px" }}>
                            {featuredProject.icon}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="my-projects-section mac">
                <h2>My Projects</h2>
                <hr />

                {/* Updated: Grid layout for Mac projects */}
                <div className="projects-grid mac">
                  {myProjects.map((project) => (
                    <div key={project.id} className="project-item mac">
                      <div className="project-item-content mac">
                        <div className="project-icon-small mac">
                          <span>{project.icon}</span>
                        </div>
                        <div className="project-details mac">
                          <h4>{project.name}</h4>
                          <p>{project.category}</p>
                        </div>
                        <button className="see-btn mac">See</button>
                      </div>
                      {project.thumbnail && (
                        <div
                          className="project-thumbnail mac"
                          style={{
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ color: "#666", fontSize: "12px" }}>
                            Project Preview
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    // Windows modal UI
    return (
      <div className="modal-overlay windows">
        <div className="modal-container windows">
          <button className="close-button windows" onClick={onClose}>
            <span>×</span>
          </button>

          {loading ? (
            <div className="loading-container windows">
              <div className="ms-store-icon">
                <svg width="80" height="80" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="9" height="9" fill="#f25022" />
                  <rect x="13" y="4" width="9" height="9" fill="#7fba00" />
                  <rect x="2" y="15" width="9" height="9" fill="#00a4ef" />
                  <rect x="13" y="15" width="9" height="9" fill="#ffb900" />
                </svg>
              </div>
              <div className="loading-spinner windows"></div>
            </div>
          ) : (
            <div className="modal-content windows">
              <section className="featured-section windows">
                <h2>Featured</h2>
                <hr />

                {featuredProject && (
                  <div className="featured-project windows">
                    <div className="project-info windows">
                      <h3>{featuredProject.name}</h3>
                      <p className="category windows">
                        {featuredProject.category}
                      </p>
                      <p className="description windows">
                        {featuredProject.description}
                      </p>
                      <button className="see-more-btn windows">See more</button>
                    </div>
                    <div className="project-preview windows">
                      <div
                        className="preview-image windows"
                        style={{
                          backgroundImage: `linear-gradient(to right, #0078d4, #005a9e)`,
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="project-logo windows">
                          {featuredProject.name}
                        </span>
                        <div className="project-icon windows">
                          <span style={{ fontSize: "24px" }}>
                            {featuredProject.icon}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              <section className="my-projects-section windows">
                <h2>My Projects</h2>
                <hr />

                <div className="projects-grid windows">
                  {myProjects.map((project) => (
                    <div key={project.id} className="project-item windows">
                      <div className="project-icon windows">
                        <span style={{ fontSize: "24px" }}>{project.icon}</span>
                      </div>
                      <div className="project-details windows">
                        <h4>{project.name}</h4>
                        <p>{project.category}</p>
                      </div>
                      {project.thumbnail && (
                        <div
                          className="project-thumbnail windows"
                          style={{
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ color: "#666", fontSize: "12px" }}>
                            Project Preview
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ProjectModal;
