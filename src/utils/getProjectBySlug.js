export const normalizeProject = (project) => ({
  ...project,

  tags: Array.isArray(project.tags)
    ? project.tags
    : typeof project.tags === "string"
      ? project.tags.split(",").map((t) => t.trim())
      : [],
});

export const getProjectBySlug = (projectsRaw, slug) => {
  if (!Array.isArray(projectsRaw)) return null;

  const projects = projectsRaw.map(normalizeProject);

  return projects.find((p) => p.slug === slug);
};