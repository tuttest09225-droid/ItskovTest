import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LightboxGallery from "../gallery/LightboxGallery";

const ServiceDetails = ({ service }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImages, setActiveImages] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const { t } = useTranslation();
  const { t: tServices } = useTranslation("services");
  const openGallery = (images, index = 0) => {
    setActiveImages(images);
    setInitialIndex(index);
    setLightboxOpen(true);
  };
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="lg:pl-6 pt-12">
      {/* SUB SERVICES */}
      <motion.div
        className=""
        variants={container}
        initial="hidden"
        animate="show"
      >
        {service.subServices.map((sub, idx) => (
          <div>
            {/* MAIN ROW */}
            <motion.div
              key={idx}
              variants={item}
              className="hidden lg:block border-t border-neutral/10 py-6"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: TEXT */}
                <div className="lg:col-span-7 h-full">
                  <div className="flex flex-col h-full">
                    {/* Top content */}
                    <div>
                      <h4 className="text-xl lg:text-2xl font-semibold text-neutral">
                        {sub.title}
                      </h4>

                      <p className="mt-3 text-neutral/70 text-sm lg:text-base leading-relaxed">
                        {sub.description}
                      </p>
                    </div>

                    {/* Bottom content */}
                    {sub.aspects?.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-neutral/10">
                        <div className="flex flex-wrap gap-2 text-sm lg:text-base text-neutral/60">
                          {sub.aspects.map((aspect, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-2 text-base lg:text-lg text-neutral/90"
                            >
                              <span className="w-1 h-1 rounded-full bg-accent/60" />
                              {aspect}
                            </span>
                          ))}
                          <span className="flex items-center gap-2 text-neutral/90">
                            <span className="w-1 h-1 rounded-full bg-accent/60" />
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="flex justify-end">
                    {/* IMAGE PANEL */}
                    <div
                      onClick={() => openGallery(sub.images, 0)}
                      className="relative w-[400px] h-[180px] cursor-pointer overflow-hidden rounded-xl group bg-neutral/5"
                    >
                      {/* PRIMARY IMAGE */}
                      {sub.images[0] && (
                        <img
                          src={sub.images[0].src}
                          alt={sub.images[0].alt}
                          className=" absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110  transition-transform duration-700"
                        />
                      )}

                      {/* SOFT EDITORIAL OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-black/5 to-black/40" />

                      {/* SECONDARY STRIP (more structured than floating image) */}
                      {sub.images[1] && (
                        <div className="absolute top-3 right-3 flex flex-col gap-1">
                          <img
                            src={sub.images[1].src}
                            alt={sub.images[1].alt}
                            className="w-16 h-16 object-cover rounded-md opacity-80 border border-white/10"
                          />

                          {sub.images[2] && (
                            <img
                              src={sub.images[2].src}
                              alt={sub.images[2].alt}
                              className="w-16 h-16 object-cover rounded-md opacity-60 border border-white/10"
                            />
                          )}
                        </div>
                      )}

                      {/* +X INDICATOR (cleaner placement) */}
                      {sub.images.length > 3 && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur text-white text-xs">
                            + {sub.images.length - 3} {tServices("more")}
                          </span>
                        </div>
                      )}

                      {/* HOVER HINT (subtle, not loud) */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white text-xs tracking-wider bg-black/30 px-3 py-1 rounded-full">
                          {tServices("viewGallery")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* MOBILE ROW */}
            <motion.div
              key={idx}
              variants={item}
              className="lg:hidden border-t border-neutral/10 p-4"
            >
              {/* Gallery First */}
              <div
                onClick={() => openGallery(sub.images, 0)}
                className="relative h-[220px] overflow-hidden rounded-xl cursor-pointer mb-5"
              >
                <img
                  src={sub.images?.[0]?.src}
                  alt={sub.images?.[0]?.alt}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {sub.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 text-white text-xs">
                    + {sub.images.length - 1} {tServices("more")}
                  </div>
                )}
              </div>

              <h4 className="text-2xl font-semibold font-pf mb-3">
                {sub.title}
              </h4>

              <p className="text-neutral/70 leading-relaxed mb-4">
                {sub.description}
              </p>

              {sub.steps?.length > 0 && (
                <div className="pt-4 mt-4 border-t border-neutral/10">
                  <div className="flex flex-wrap gap-2 text-sm lg:text-base text-neutral/60 justify-self-center">
                    {sub.steps.map((step, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-2 text-base lg:text-lg text-neutral/90"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/60" />
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="w-full justify-items-center lg:justify-self-start border-t border-neutral/10 py-4 lg:py-10 space-y-4">
        <h4 className="text-4xl font-semibold text-neutral">
          {t("cta.serviceTitle")}
        </h4>

        <p className="text-neutral/70 text-lg">{t("cta.serviceSubtitle")}</p>

        <div className="flex gap-4 flex-wrap">
          <a
            href={`mailto:${t("contacts.email.value1")}${t("contacts.email.value2")}@gmail.com?subject=${encodeURIComponent(
              service.title + " - " + t("cta.quoteRequest"),
            )}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-neutral text-white text-lg rounded-full hover:bg-accent transition-all duration-300"
          >
            {t("cta.quote.label")}
          </a>

          <Link
            to={t("cta.primaryAction.route")}
            className="inline-flex items-center justify-center px-6 py-3 bg-neutral text-white text-lg rounded-full hover:bg-accent transition-all duration-300"
          >
            {t("cta.primaryAction.label")}
          </Link>
        </div>
      </div>

      {/* LIGHTBOX */}
      <LightboxGallery
        images={activeImages}
        isOpen={lightboxOpen}
        initialIndex={initialIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default ServiceDetails;
