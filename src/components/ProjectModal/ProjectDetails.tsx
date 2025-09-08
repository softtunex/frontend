import React, { useState, useEffect } from "react";
import "./ProjectDetails.css";
import { getProjectById } from "../../shared/projectsConfig";

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
  osType: "windows" | "mac";
}

const VideoPlayer: React.FC<{
  videoUrl: string;
  osType: "windows" | "mac";
}> = ({ videoUrl, osType }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`video-hero-container ${osType}`}>
      {!isPlaying ? (
        <div
          className={`video-hero-preview ${osType}`}
          onClick={() => setIsPlaying(true)}
        >
          <div className={`video-play-button ${osType}`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      ) : (
        <video
          controls
          autoPlay
          className={`video-hero-element ${osType}`}
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectId,
  onBack,
  osType,
}) => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] =
    useState<ReturnType<typeof getProjectById>>(undefined);

  useEffect(() => {
    // Simulate loading project details
    setLoading(true);

    // Get project from shared configuration
    setTimeout(() => {
      const selectedProject = getProjectById(projectId);
      setProject(selectedProject);
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

      {/* Project header section with video */}
      <div className={`project-hero ${osType}`}>
        <div className={`project-hero-content ${osType}`}>
          <div className={`project-hero-left ${osType}`}>
            {/* <div className={`project-logo-container ${osType}`}>
              <img
                src={project.logoUrl}
                alt={project.name}
                className={`project-logo ${osType}`}
              />
            </div> */}
            <div className={`project-hero-info ${osType}`}>
              <h1 className={`project-title ${osType}`}>{project.name}</h1>
              <p className={`project-subtitle ${osType}`}>{project.company}</p>
              <div className={`project-meta ${osType}`}>
                <span className={`project-category ${osType}`}>
                  {project.category}
                </span>
                {/* <span className={`project-year ${osType}`}>{project.year}</span> */}
                <span className={`project-role ${osType}`}>{project.role}</span>
              </div>
              {/* Only show website button if website exists (not for admin dashboards) */}
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

          {/* Video on the right side */}
          {project.videoUrl && (
            <div className={`project-hero-right ${osType}`}>
              <VideoPlayer videoUrl={project.videoUrl} osType={osType} />
            </div>
          )}
        </div>
      </div>

      {/* Project screenshots */}
      <div className={`project-screenshots ${osType}`}>
        <h2 className={`section-title ${osType}`}>Screenshots</h2>
        <div className={`screenshots-gallery ${osType}`}>
          {project.screenshots?.map((screenshot, index) => {
            const deviceType = project.deviceType || "desktop";

            return (
              <div
                key={index}
                className={`screenshot-item ${deviceType} ${osType}`}
              >
                <img
                  src={screenshot}
                  alt={`${project.name} screenshot ${index + 1}`}
                />
              </div>
            );
          })}
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
