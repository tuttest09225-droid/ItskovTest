import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoArrowBackSharp } from "react-icons/io5";

import { motion } from "framer-motion";

import LightboxImage from "../gallery/LightboxImage";
import LightboxGallery from "../gallery/LightboxGallery";
import TagButton from "../project/ProjectTag";
const EditorialProjectLayout = ({ project }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { t: tProject } = useTranslation("projects");

  const [singleImage, setSingleImage] = useState(null);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const images = project.images || [];

  const previewLimit = isMobile ? 3 : 8;

  const previewImages = images.slice(0, previewLimit);

  const remainingImages = images.length - previewLimit;

  return (
    <div className="bg-white text-neutral pt-28 sm:pt-36 md:pt-26">
      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-4 pb-2 lg:pb-4 lg:mb-4 border-b border-neutral/10">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-neutral/70 hover:text-neutral transition text-xl"
        >
          <IoArrowBackSharp className="text-2xl" />
          {tProject("backToProjects")}
        </Link>
      </section>
      <section className="lg:hidden max-w-7xl mx-auto pb-4">
        <div className="relative">
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-[35vh] lg:h-[60vh] object-cover shadow-lg cursor-pointer"
            onClick={() =>
              setSingleImage({
                src: project.mainImage,
                alt: project.title,
              })
            }
          />

          <p className="absolute top-4 left-4 uppercase tracking-[0.25em] text-xs text-white/70 bg-black/30 px-3 py-1 rounded-full backdrop-blur">
            {project.category}
          </p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 lg:pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-8">
            <p className="hidden lg:block uppercase tracking-[0.25em] text-sm text-neutral/50 mb-4 z-20">
              {project.category}
            </p>
            <h1 className="text-4xl lg:text-6xl leading-tight font-bold font-pf mb-8">
              {project.hero.title}
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-neutral/75 font-ns max-w-4xl">
              {project.overview?.description || project.description}
            </p>
          </div>
          {/* RIGHT */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="border border-neutral/10 rounded-2xl overflow-hidden">
              {project.metrics?.map((metric, index) => (
                <div
                  key={index}
                  className="p-6 border-b border-neutral/10 last:border-b-0"
                >
                  <p className="text-sm uppercase tracking-wider text-neutral/50 mb-2">
                    {metric.label}
                  </p>
                  <p className="text-xl font-semibold font-pf">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid lg:hidden grid-cols-2 gap-3">
            {project.metrics?.map((metric, index) => (
              <div
                key={index}
                className="p-4 border border-neutral/10 rounded-xl bg-white"
              >
                <p className="text-xs uppercase tracking-wider text-neutral/40 mb-2">
                  {metric.label}
                </p>
                <p className="text-lg font-semibold font-pf text-neutral">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MAIN IMAGE */}
      <section className="hidden lg:block max-w-7xl mx-auto px-6 pb-10">
        <img
          src={project.mainImage}
          alt={project.title}
          onClick={() =>
            setSingleImage({
              src: project.mainImage,
              alt: project.title,
            })
          }
          className="w-full h-[35vh] lg:h-[60vh] object-cover rounded-2xl shadow-lg cursor-pointer"
        />
      </section>
      {/* CONTENT */}
      <section className="lg:hidden max-w-7xl mx-auto px-6 py-5 my-5 border-t border-neutral/10">
        <div className="flex flex-wrap justify-center gap-3">
          {project.tags?.map((tag, index) => (
            <TagButton
              key={index}
              tag={tag}
              variant={project.layout}
              onClick={() =>
                navigate("/projects", { state: { selectedTag: tag } })
              }
            />
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <div className="space-y-6 lg:space-y-12">
          {project.sections?.map((section, index) => {
            const image = project.images?.[index];
            return (
              <div
                key={index}
                className="grid lg:grid-cols-12 gap-4 lg:gap-10 items-start border-t border-neutral/10 pt-4 lg:pt-10"
              >
                {/* SECTION TITLE */}
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-32">
                    <p className="text-sm uppercase tracking-[0.25em] text-neutral/40 mb-4">
                      {project.stage} {index + 1}
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight font-pf">
                      {section.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral/80 font-ns mt-8">
                      {section.text}
                    </p>
                  </div>
                </div>
                {/* CONTENT */}
                <div className="lg:col-span-8">
                  <div className="space-y-8">
                    {/* INLINE SUPPORT IMAGE */}
                    {image && (
                      <img
                        src={image.after || image.src}
                        alt={image.alt}
                        onClick={() => {
                          setSingleImage({
                            src: image.after || image.src,
                            alt: image.alt,
                          });
                        }}
                        className="w-full h-[300px] lg:h-[450px] object-cover rounded-xl shadow-md cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* TECHNICAL DETAILS */}
      {/* <section className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral/10">
        <div className="mb-12">
          <p className="uppercase tracking-[0.25em] text-sm text-neutral/40 mb-4">
            Technical Information
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold font-pf">
            Project Details
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral/10">
          {project.metrics?.map((metric, index) => (
            <div key={index} className="bg-white p-8">
              <p className="text-sm uppercase tracking-wider text-neutral/50 mb-3">
                {metric.label}
              </p>
              <p className="text-2xl font-semibold font-pf">{metric.value}</p>
            </div>
          ))}
        </div>
      </section> */}
      {/* SUPPORTING GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-4 lg:py-10 border-t border-neutral/10">
        <div className="flex items-end justify-between mb-4 lg:mb-10">
          <div>
            {/* <p className="uppercase tracking-[0.25em] text-sm text-neutral/40 mb-4">
              Documentation
            </p> */}
            <h2 className="text-4xl lg:text-5xl font-bold font-pf">
              {project.galleryTitle}
            </h2>
          </div>
        </div>
        {/* MOBILE */}
        <div className="grid grid-cols-1 gap-1 md:hidden">
          {previewImages.map((img, index) => (
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
                {index === previewImages.length - 1 && remainingImages > 0 && (
                  <div
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 text-white text-xl font-semibold"
                    onClick={() => {
                      setGalleryIndex(previewLimit);
                      setGalleryOpen(true);
                    }}
                  >
                    +{remainingImages} {tProject("more")}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden xl:block columns-3 gap-6">
          {previewImages.map((img, index) => (
            <div
              key={index}
              className="mb-6 break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => {
                setGalleryIndex(index);
                setGalleryOpen(true);
              }}
            >
              <img
                src={img.after || img.src}
                className="w-full object-cover rounded-2xl"
              />

              {index === previewImages.length - 1 && remainingImages > 0 && (
                <div className="absolute bottom-3 right-3 z-20">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-white text-xs">
                    +{remainingImages}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* TABLET */}
        <div className="hidden md:grid xl:hidden grid-cols-2 gap-4">
          {previewImages.map((img, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
              onClick={() => {
                setGalleryIndex(index);
                setGalleryOpen(true);
              }}
            >
              <img
                src={img.after || img.src}
                className="w-full h-full object-cover"
              />

              {index === previewImages.length - 1 && remainingImages > 0 && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-white text-xs">
                    +{remainingImages}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* TAGS */}
      <section className="hidden lg:block max-w-7xl mx-auto px-6 py-10 border-t border-neutral/10">
        <div className="flex flex-wrap justify-center gap-3">
          {project.tags?.map((tag, index) => (
            <TagButton
              key={index}
              tag={tag}
              variant={project.layout}
              onClick={() =>
                navigate("/projects", { state: { selectedTag: tag } })
              }
            />
          ))}
        </div>
      </section>
      {/* CTA */} {/* CTA */}
      <section className="border-t border-neutral/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-5 pb-10">
          <div className="max-w-3xl">
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
      {/* LIGHTBOX */}
      <LightboxImage image={singleImage} onClose={() => setSingleImage(null)} />
      <LightboxGallery
        images={images}
        initialIndex={galleryIndex}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};
export default EditorialProjectLayout;
