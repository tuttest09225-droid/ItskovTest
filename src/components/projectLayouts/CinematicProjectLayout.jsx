// CinematicProjectLayout.jsx

import { useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { IoArrowBackSharp } from "react-icons/io5";

import TagButton from "../project/ProjectTag";
import LightboxImage from "../gallery/LightboxImage";
import LightboxGallery from "../gallery/LightboxGallery";

const CinematicProjectLayout = () => {
  const { t, i18n } = useTranslation();
  const { t: tProject } = useTranslation("projects");

  const { slug } = useParams();

  const navigate = useNavigate();

  const galleryRef = useRef(null);

  const projectsRaw = tProject("allProjects", {
    returnObjects: true,
  });

  const project = useMemo(() => {
    const projects = Array.isArray(projectsRaw)
      ? projectsRaw.map((p) => ({
          ...p,
          tags: Array.isArray(p.tags)
            ? p.tags
            : typeof p.tags === "string"
              ? p.tags.split(",").map((t) => t.trim())
              : [],
        }))
      : [];

    return projects.find((p) => p.slug === slug);
  }, [projectsRaw, slug]);

  const images = project?.images || [];

  const [singleImage, setSingleImage] = useState(null);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />

        <title>{project.hero.title} | Itskov Stroy</title>

        <meta name="description" content={project.overview.description} />

        <meta
          property="og:url"
          content={`https://itskovstroy.com/projects/${project.slug}`}
        />

        <meta property="og:title" content={project.hero.title} />

        <meta
          property="og:description"
          content={project.overview.description}
        />

        <meta property="og:image" content={project.mainImage} />

        <link
          rel="canonical"
          href={`https://itskovstroy.com/projects/${project.slug}`}
        />
      </Helmet>

      <div className="bg-white text-neutral overflow-hidden">
        {/* HERO */}
        <section className="relative h-[100vh] min-h-[700px] w-full">
          <img
            src={project.mainImage}
            alt={project.title}
            className="absolute inset-0 w-full h-[100vh] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          {/* Back Button */}
          <div className="absolute top-6 left-4 lg:left-10 z-20 pt-20 lg:pt-28">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent/80 font-semibold hover:text-accent transition-all duration-300"
            >
              <IoArrowBackSharp className="text-3xl" />

              <span className="text-2xl">{tProject("backToProjects")}</span>
            </Link>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-8 lg:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.map((tag, i) => (
                    <TagButton
                      key={i}
                      tag={tag}
                      dark
                      variant={project.layout}
                      onClick={() =>
                        navigate("/projects", {
                          state: { selectedTag: tag },
                        })
                      }
                    />
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl xl:text-8xl text-accent/90 font-semibold leading-[0.95] max-w-5xl font-pf">
                  {project.hero.title}
                </h1>
                {/* Category + Date*/}
                <div className="mt-8 flex flex-wrap gap-6 text-white/80 text-xl font-ms">
                  <span>{project.hero.type}</span>
                  <span>-</span>
                  <span>{project.hero.year}</span>
                  <span>-</span>
                  <span>{project.hero.location}</span>
                </div>
                {/* <div className="hidden lg:block max-w-[90vw] mx-auto px-6 lg:px-12 pt-8 lg:pt-12">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {project.metrics?.map((metric, index) => (
                      <div key={index} className="text-center">
                        <p className="uppercase tracking-widest text-accent/70 mb-3">
                          {metric.label}
                        </p>

                        <p className="text-3xl lg:text-4xl font-semibold text-accent/90 font-pf">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div> */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        {/* <section className="w-full lg:max-w-[90vw] mx-auto lg:px-12 pt-8 lg:pt-12">
          {
            <div className="w-full mx-auto px-6 lg:px-12 py-6 lg:py-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                {project.metrics?.map((metric, index) => (
                  <div key={index} className="text-center">
                    <p className="uppercase tracking-widest text-neutral/70 mb-3 ">
                      {metric.label}
                    </p>

                    <p className="text-3xl lg:text-4xl font-semibold font-pf">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          }
        </section> */}
        <section className="w-full mx-auto">
          <div className="w-full overflow-hidden relative bg-neutral/5 border-y border-neutral/10">
            {/* FULL BAR GRADIENT OVERLAY */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-neutral/5 via-white/40 to-neutral/5 z-10" />

            <div className="flex w-max animate-scrollX">
              {[...project.metrics, ...project.metrics, ...project.metrics].map(
                (metric, index) => (
                  <div
                    key={index}
                    className="relative flex items-center px-16 py-8 min-w-[220px]"
                  >
                    {/* CONTENT */}
                    <div className="text-center relative z-10">
                      <p className="uppercase tracking-widest text-neutral/50 text-xs mb-2">
                        {metric.label}
                      </p>

                      <p className="text-3xl lg:text-4xl font-semibold font-pf text-neutral">
                        {metric.value}
                      </p>
                    </div>

                    {/* BLACK SEPARATOR LINE */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-neutral/20" />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        {/* PROJECT OVERVIEW */}
        <section className="w-full md:max-w-[80vw] lg:max-w-[90vw] mx-auto px-6 lg:px-12 py-6 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 justify-items-center">
            {/* Left */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <h2 className="text-3xl lg:text-4xl text-center lg:text-left  font-semibold leading-tight font-pf">
                  {project.overview.title}
                </h2>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-8 space-y-6 text-lg lg:text-xl leading-relaxed text-neutral/80 font-ns max-w-4xl">
              {project.overview.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURE IMAGE */}
        {/* {project.featuredImage && (
          <section className="py-12 lg:py-24">
            <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
              <motion.img
                initial={{ opacity: 0, scale: 1.03 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src={project.featuredImage}
                alt={project.featuredImageAlt}
                className="w-full h-[60vh] object-cover rounded-2xl cursor-pointer"
                onClick={() =>
                  setSingleImage({
                    src: project.featuredImage,
                    alt: project.featuredImageAlt,
                  })
                }
              />
            </div>
          </section>
        )} */}

        {/* GALLERY */}
        <section
          ref={galleryRef}
          className="w-full lg:max-w-[90vw] mx-auto lg:px-8 py-5 lg:py-8"
        >
          <div className="mb-8 lg:mb-20 max-w-[90vw] place-self-center lg:place-self-start">
            <p className="uppercase tracking-[0.3em] text-sm text-neutral/50 mb-4">
              {tProject("gallery")}
            </p>

            <h2 className="text-4xl lg:text-6xl font-semibold font-pf">
              {project.galleryTitle}
            </h2>
          </div>

          {/* MOBILE */}
          <div className="grid grid-cols-1 gap-1 lg:hidden">
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className="absolute inset-0 z-10"
                  onClick={() => {
                    setGalleryIndex(index);
                    setGalleryOpen(true);
                  }}
                />
                <div className="relative z-0">
                  <img
                    src={img.after || img.src}
                    className="w-full h-[40vh] object-cover lg:rounded-xl"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:grid grid-cols-12 gap-6 auto-rows-[300px]">
            {images.map((img, index) => {
              const large = index % 5 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group
                    ${large ? "col-span-8 row-span-2" : "col-span-4"}
                  `}
                >
                  <div
                    className="absolute inset-0 z-10"
                    onClick={() => {
                      setGalleryIndex(index);
                      setGalleryOpen(true);
                    }}
                  />
                  <div className="relative z-0">
                    <img
                      src={img.after || img.src}
                      className="w-full max-h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-neutral/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
            <div className="max-w-4xl">
              <p className="uppercase tracking-[0.3em] text-sm text-neutral/50 mb-6">
                {t("cta.subtitle")}
              </p>

              <h2 className="text-4xl lg:text-6xl font-semibold leading-tight font-pf mb-8">
                {t("cta.title")}
              </h2>

              <p className="text-lg lg:text-2xl text-neutral/70 leading-relaxed mb-10 font-ns">
                {t("cta.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={t("cta.primaryAction.route")}
                  className="inline-flex items-center justify-center px-8 py-4 bg-neutral text-white text-lg rounded-full hover:bg-accent transition-all duration-300"
                >
                  {t("cta.primaryAction.label")}
                </Link>

                <Link
                  to={t("cta.secondaryAction.route")}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral/50 text-neutral text-lg rounded-full hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {t("cta.secondaryAction.label")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SINGLE LIGHTBOX ================= */}
        <LightboxImage
          image={singleImage}
          onClose={() => setSingleImage(null)}
        />

        {/* ================= GALLERY LIGHTBOX ================= */}
        <LightboxGallery
          images={images}
          initialIndex={galleryIndex}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      </div>
    </>
  );
};

export default CinematicProjectLayout;
