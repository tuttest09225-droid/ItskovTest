import React, { useState, useMemo, useEffect } from "react";
import i18n from "../i18n.jsx";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { IoArrowBackSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";

import ProjectCard from "../components/project/ProjectCard.jsx";
import ProjectPagination from "../components/project/ProjectPagination.jsx";

const ProjectsPage = () => {
  const { t } = useTranslation("translation");
  const { t: tProject } = useTranslation("projects");
  const lang = i18n.language;

  const location = useLocation();
  const projects = useMemo(() => {
    const projectsRaw = tProject("allProjects", {
      returnObjects: true,
    });

    return Array.isArray(projectsRaw)
      ? projectsRaw.map((p) => ({
          ...p,
          tags: Array.isArray(p.tags)
            ? p.tags
            : typeof p.tags === "string"
              ? p.tags.split(",").map((t) => t.trim())
              : [],
        }))
      : [];
  }, [t]);

  const [tagFilter, setTagFilter] = useState(
    location.state?.selectedTag || null,
  );
  useEffect(() => {
    if (location.state?.selectedTag) {
      setTagFilter(location.state.selectedTag);
      setCurrentPage(0);
    }
  }, [location.state]);
  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 6;

  const filteredProjects = useMemo(() => {
    if (!tagFilter) return projects;
    return projects.filter((p) => p.tags.includes(tagFilter));
  }, [projects, tagFilter]);

  const paginatedProjects = useMemo(() => {
    const start = currentPage * projectsPerPage;
    return filteredProjects.slice(start, start + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleTagClick = (tag) => {
    setTagFilter(tag);
    setCurrentPage(0);
  };

  return (
    <div className="font-pf">
      <Helmet>
        <html lang={lang} />
        <title>{t("site.pages.projects.title")}</title>
        <meta
          name="description"
          content={t("site.pages.projects.description")}
        />
        <meta name="keywords" content={t("site.pages.projects.keywords")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={t("site.pages.projects.canonical")} />

        {/* --- Open Graph --- */}
        <meta property="og:type" content={t("site.og.type")} />
        <meta property="og:site_name" content={t("site.og.site_name")} />
        <meta property="og:title" content={t("site.pages.projects.title")} />
        <meta
          property="og:description"
          content={t("site.pages.projects.description")}
        />
        <meta property="og:url" content={t("site.pages.projects.canonical")} />
        <meta property="og:image" content={t("site.og.image")} />
        <meta property="og:image:alt" content={t("site.og.image_alt")} />

        {/* --- Twitter --- */}
        <meta name="twitter:card" content={t("site.twitter.card")} />
        <meta name="twitter:site" content={t("site.twitter.handle")} />
        <meta name="twitter:title" content={t("site.pages.projects.title")} />
        <meta
          name="twitter:description"
          content={t("site.pages.projects.description")}
        />
        <meta name="twitter:image" content={t("site.og.image")} />

        {/* --- Schema.org JSON-LD --- */}
        <script type="application/ld+json">
          {JSON.stringify(t("site.organization", { returnObjects: true }))}
        </script>
      </Helmet>
      <div className="w-full max-w-7xl mx-auto md:px-8 pt-36 py-8">
        {tagFilter && (
          <button
            onClick={() => {
              setTagFilter(null);
              setCurrentPage(0);
            }}
            className="text-2xl flex mb-6 px-4 py-2 gap-2 bg-white text-neutral hover:underline hover:underline-offset-8 hover:text-accent transition"
          >
            <IoArrowBackSharp className="text-3xl place-self-center" />
            {tProject("allProjectsBtn")}
          </button>
        )}
        <h2 className="text-2xl lg:text-4xl font-semibold mb-6 mx-6 text-center">
          {tagFilter
            ? tProject("filteredByTag", { tag: tagFilter })
            : tProject("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6">
          {paginatedProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onTagClick={handleTagClick}
              tagFilter={tagFilter}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <ProjectPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
