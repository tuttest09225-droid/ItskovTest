// ProjectDetails.jsx

import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IoArrowBackSharp } from "react-icons/io5";
import TagButton from "../project/ProjectTag";

const ProjectDetails = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  // Load projects
  const projectsRaw = t("projects.allProjects", {
    returnObjects: true,
  });

  // Find project by slug
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
    if (!Array.isArray(projects)) return null;

    return projects.find((p) => p.slug === slug);
  }, [projectsRaw, slug]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (imageRefs.current[0]) {
      imageRefs.current[0].scrollIntoView({
        behavior: "instant",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);
  // Invalid slug
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const goTo = (index) => {
    const container = scrollRef.current;

    if (!container) return;

    const imageWidth = container.children[index].offsetWidth;
    const gap = 16;

    container.scrollTo({
      left: index * (imageWidth + gap),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container || !container.children.length) return;

    const imageWidth = container.children[0].offsetWidth + 16;

    const index = Math.round(container.scrollLeft / imageWidth);

    setActiveIndex(index);
  };

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />

        <title>{project.title} | Itskov Stroy</title>

        <meta name="description" content={project.description} />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href={`https://itskovstroy.com/projects/${project.slug}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={project.title} />

        <meta property="og:description" content={project.description} />

        <meta property="og:image" content={project.mainImage} />

        <meta
          property="og:url"
          content={`https://itskovstroy.com/projects/${project.slug}`}
        />
      </Helmet>

      <div className="w-full max-w-7xl mx-auto md:px-8 pt-32 mb-12">
        {/* Back button */}
        <Link
          to="/projects"
          className="text-2xl flex mb-6 px-4 py-2 gap-2 bg-white text-neutral hover:underline hover:underline-offset-8 hover:text-accent transition"
        >
          <IoArrowBackSharp className="text-3xl place-self-center" />
          {t("projects.backToProjects")}
        </Link>

        {/* Hero image */}
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-[40vh] lg:h-[65vh] object-cover lg:rounded-xl shadow-2xl cursor-pointer"
          onClick={() =>
            setSelectedImage({
              src: project.mainImage,
              alt: project.title,
            })
          }
        />

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl text-neutral font-semibold my-5 mx-3 lg:my-10 lg:mx-6 text-center font-pf">
          {project.title}
        </h1>

        {/* Metadata */}
        <div className="flex justify-between mx-6 md:gap-6 flex-col md:flex-row">
          {/* Tags */}
          <div className="rounded-xl p-2 lg:p-6 flex-1">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-ms">
              {project.tagsTitle}
            </h2>

            <div className="text-lg lg:text-xl flex flex-wrap mt-2 lg:mt-4 gap-2">
              {project.tags.map((tag, i) => (
                <TagButton
                  key={i}
                  tag={tag}
                  onClick={() =>
                    navigate("/projects", {
                      state: { selectedTag: tag },
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="rounded-xl p-2 lg:p-6  flex-1">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-ms">
              {project.timeTitle}
            </h2>

            <div className="text-lg lg:text-xl mt-4">{project.time}</div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-7xl mx-auto">
          <p className="text-base lg:text-lg xl:text-2xl leading-relaxed indent-4 p-8 lg:p-10 lg:mx-6 my-10 whitespace-normal bg-base-100 font-ns">
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        <div className="lg:mx-6 mb-4">
          {/* Mobile carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scroll-smooth scrollbar-hide"
          >
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                onClick={() => setSelectedImage(img)}
                className="snap-center shrink-0 w-[100vw] h-64 md:h-[50vw] object-cover cursor-pointer"
              />
            ))}
          </div>

          {/* Dots */}
          <div className="lg:hidden mt-3 flex justify-center items-center gap-3">
            {project.images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full border-2 border-neutral transition-all duration-300
                ${
                  i === activeIndex ? "bg-neutral scale-110" : "bg-transparent"
                }`}
              />
            ))}
          </div>

          {/* Desktop gallery */}
          <div className="hidden lg:block">
            <div className="lg:columns-3 md:columns-2 gap-6 space-y-6 mt-10">
              {project.images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal / Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[90vh] max-w-[90vw] lg:rounded-2xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
