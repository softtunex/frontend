import React, { useState, useEffect } from "react";
import "./ProjectModal.css";
import ProjectDetails from "./ProjectDetails";
import {
  Project,
  getProjectsByCompany,
  getFeaturedProject,
} from "../../shared/projectsConfig";

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && projectId) {
      // Simulate loading data
      setLoading(true);

      // Reset selected project when modal opens
      setSelectedProject(null);

      // Use shared configuration instead of mock data
      setTimeout(() => {
        // Set featured project from shared config
        setFeaturedProject(getFeaturedProject());
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

  // Function to group projects by company using shared config
  const groupedProjects = getProjectsByCompany();

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

              {groupedProjects.map((company) => (
                <div key={company.name} className={`company-section ${osType}`}>
                  <h3 className={`company-name ${osType}`}>{company.name}</h3>
                  <div className={`projects-grid ${osType}`}>
                    {company.projects.map((project) => (
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
