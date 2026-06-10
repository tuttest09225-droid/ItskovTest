import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IoArrowBackSharp } from "react-icons/io5";

import LightboxImage from "../gallery/LightboxImage";
import LightboxGallery from "../gallery/LightboxGallery";
import TagButton from "../project/ProjectTag";

const CompactProjectLayout = ({ project }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {t: tProject} = useTranslation("projects");


  const [singleImage, setSingleImage] = useState(null);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <div className="bg-white text-neutral pt-24 lg:pt-28">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-neutral/70 hover:text-neutral text-xl transition mb-2 lg:mb-6"
          >
            <IoArrowBackSharp className="text-2xl" />
            {tProject("backToProjects")}
          </Link>

          <div className="flex flex-wrap gap-2 mb-2 lg:mb-6">
            {project.tags?.map((tag, index) => (
              <TagButton
                key={index}
                tag={tag}
                variant={project.layout}
                onClick={() =>
                  navigate("/projects", {
                    state: { selectedTag: tag },
                  })
                }
              />
            ))}
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl font-bold font-pf mb-6">
          {project.hero.title}
        </h1>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <img
            src={project.mainImage}
            alt={project.title}
            onClick={() =>
              setSingleImage({
                src: project.mainImage,
                alt: project.title,
              })
            }
            className="w-full h-[300px] lg:h-[500px] object-cover rounded-xl shadow-lg cursor-pointer"
          />

          {project.metrics?.length > 0 && (
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="backdrop-blur text-white/70 bg-black/30 px-3 py-1 lg:px-4 lg:py-2 lg:text-base rounded-lg text-sm font-medium"
                >
                  {metric.value}
                </div>
              ))}
            </div>
          )}
          <p className="lg:hidden absolute top-4 left-4 uppercase tracking-[0.25em] text-xs text-white/70 bg-black/30 px-3 py-1 rounded-lg backdrop-blur">
            {project.category}
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      {/* {project.metrics?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="border border-neutral/10 rounded-xl overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {project.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex justify-between lg:justify-around items-center p-5 border-b border-neutral/10 last:border-b-0"
                >
                  <span className="uppercase text-sm tracking-wider text-neutral/50">
                    {metric.label}
                  </span>

                  <span className="font-semibold text-lg">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* Description */}
      {project.overview.description && (
        <section className="max-w-7xl mx-auto px-6 py-5">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-neutral/75 font-ns">
              {project.overview.description}
            </p>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.images?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-5">
          <h2 className="text-2xl lg:text-3xl font-bold font-pf mb-8">
            Project Photos
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onClick={() => {
                  setGalleryIndex(index);
                  setGalleryOpen(true);
                }}
                className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-neutral/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 lg:py-10">
          <div className="max-w-2xl">
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

      <LightboxImage image={singleImage} onClose={() => setSingleImage(null)} />

      <LightboxGallery
        images={project.images || []}
        initialIndex={galleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

export default CompactProjectLayout;
