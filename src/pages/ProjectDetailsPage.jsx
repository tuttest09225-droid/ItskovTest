import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Navigate } from "react-router-dom";

import layouts from "../components/projectLayouts";
import ProjectSEO from "../components/project/ProjectSEO";

import { getProjectBySlug } from "../utils/getProjectBySlug";

const ProjectDetailsPage = () => {
  const { i18n } = useTranslation();

  const { t: tProject } = useTranslation("projects");

  const { slug } = useParams();

  const projectsRaw = tProject("allProjects", {
    returnObjects: true,
  });

  const project = useMemo(() => {
    return getProjectBySlug(projectsRaw, slug);
  }, [projectsRaw, slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const LayoutComponent =
    layouts[project.layout] || layouts.compact;

  return (
    <>
      <ProjectSEO
        project={project}
        language={i18n.language}
      />

      <LayoutComponent project={project} />
    </>
  );
};

export default ProjectDetailsPage;