import React, { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import LightboxGallery from "../gallery/LightboxGallery";

const ServiceAccordion = ({ service, isOpen, onToggle }) => {
  const { t } = useTranslation();
  const { t: tServices } = useTranslation("services");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImages, setActiveImages] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const galleryImages = service.images?.map((img) => ({
    ...img,
    src: img.src || img.after,
  }));
  const accordionRef = useRef(null);

  const scrollToAccordion = () => {
    if (!accordionRef.current) return;

    const y =
      accordionRef.current.getBoundingClientRect().top + window.scrollY - 96;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  const openGallery = (images, index = 0) => {
    setActiveImages(images);
    setInitialIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div ref={accordionRef} className="border-b border-neutral/10">
      {/* Header */}
      <button
        onClick={() => {
          const opening = !isOpen;

          onToggle();

          if (opening) {
            setTimeout(() => {
              scrollToAccordion();
            }, 350);
          }
        }}
        className="w-full py-4 flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4">
          <img
            src={service.image?.src || service.image?.after}
            alt={service.image?.alt}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div>
            <h3 className="font-pf text-2xl font-semibold text-neutral">
              {service.title}
            </h3>

            {service.introHook && (
              <p className="font-pf text-lg text-neutral/60">
                {service.introHook}
              </p>
            )}
          </div>
        </div>

        <FiChevronDown
          className={`text-4xl transition-transform duration-300 ${
            isOpen ? "rotate-180 text-accent" : "text-neutral"
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[1200px] pb-6" : "max-h-0"
        }`}
      >
        <div className="space-y-4">
          {service.description && (
            <p className="text-neutral/70 text-lg leading-relaxed">
              {service.description}
            </p>
          )}

          {service.aspects?.length > 0 && (
            <div className="pt-4 mt-4">
              <div className="flex flex-wrap gap-2 text-base text-neutral/60 justify-self-center">
                {service.aspects.map((aspect, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-base text-neutral/90"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {aspect}
                  </span>
                ))}
              </div>
            </div>
          )}

          {galleryImages?.length > 0 ? (
            <div
              onClick={() => openGallery(galleryImages, 0)}
              className="relative w-full h-56 cursor-pointer overflow-hidden rounded-xl group bg-neutral/5 "
            >
              {/* Main image */}
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-active:scale-105 "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/5 to-black/40" />

              {/* Preview strip */}
              {galleryImages[1] && (
                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-14 h-14 object-cover rounded-md border border-white/10 "
                  />

                  {galleryImages[2] && (
                    <img
                      src={galleryImages[2].src}
                      alt={galleryImages[2].alt}
                      className="w-14 h-14 object-cover rounded-md border border-white/10 opacity-80 "
                    />
                  )}
                </div>
              )}

              {/* Count */}
              {service.images.length > 3 && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-white text-xs">
                    +{service.images.length - 3}
                  </span>
                </div>
              )}

              {/* Gallery label */}
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white text-xs uppercase tracking-wider">
                  {tServices("viewGallery")}
                </span>
              </div>
            </div>
          ) : (
            <img
              src={service.image?.src}
              alt={service.image?.alt}
              className="w-full h-56 object-cover rounded-xl"
            />
          )}
          {service.emotionalHook && (
            <p className="italic text-lg text-neutral/60">
              {service.emotionalHook}
            </p>
          )}
          <div className="w-full justify-items-center lg:justify-self-start border-t border-neutral/10 py-4 lg:py-10 space-y-4">
            <h4 className="text-2xl font-semibold text-neutral">
              {t("cta.serviceTitle")}
            </h4>

            <p className="text-neutral/70 text-base">
              {t("cta.serviceSubtitle")}
            </p>

            <div className="flex gap-4 flex-wrap">
              <a
                href={`mailto:${t("contacts.email.value1")}${t("contacts.email.value2")}@gmail.com?subject=${encodeURIComponent(
                  service.title + " - Quote Request",
                )}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-neutral text-white text-base rounded-full hover:bg-accent transition-all duration-300"
              >
                {t("cta.quote.label")}
              </a>

              <Link
                to={t("cta.primaryAction.route")}
                className="inline-flex items-center justify-center px-4 py-2 bg-neutral text-white text-base rounded-full hover:bg-accent transition-all duration-300"
              >
                {t("cta.primaryAction.label")}
              </Link>
            </div>
            {/* <button
            onClick={onToggle}
            className="text-accent text-lg uppercase tracking-wider"
          >
            {tServices("hideDetails")}
          </button> */}
          </div>
        </div>
      </div>
      <LightboxGallery
        images={activeImages}
        isOpen={lightboxOpen}
        initialIndex={initialIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ServiceAccordion;
