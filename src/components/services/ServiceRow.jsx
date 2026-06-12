import React, { useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import ServiceDetails from "./ServiceDetails";
const ServiceRow = ({ service, isOpen, onToggle }) => {
  const detailsRef = useRef(null);
  const rowRef = useRef(null);

  const { t: tServices } = useTranslation("services");
  const scrollToRow = () => {
    if (!rowRef.current) return;

    const y =
      rowRef.current.getBoundingClientRect().top + window.pageYOffset - 96; // navbar offset

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };
  const handleToggle = () => {
  const opening = !isOpen;

  onToggle();

  if (opening) {
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 350);
  } else {
    scrollToRow();
  }
};

  return (
    <div 
    ref={rowRef}
    className="border-b border-neutral/10 py-4">
      {/* MAIN ROW */}
      <div
        onClick={handleToggle}
        className="hidden lg:grid lg:grid-cols-12 gap-10 items-center group"
      >
        {/* LEFT: TITLE BLOCK */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-semibold font-pf text-neutral leading-tight">
            {service.title}
          </h2>

          {service.introHook && (
            <p className="text-sm lg:text-base uppercase tracking-wider text-neutral/70 font-semibold">
              {service.introHook}
            </p>
          )}

          {service.emotionalHook && (
            <p className="text-base lg:text-lg italic text-neutral/60 leading-relaxed">
              {service.emotionalHook}
            </p>
          )}
        </div>

        {/* CENTER: OVERVIEW */}
        <div className="lg:col-span-5">
          <div className="space-y-6 text-neutral/70">
            {/* Main explanation */}
            <p className="leading-relaxed text-base md:text-lg">
              {service.overview}
            </p>

            {/* SUBSERVICE BULLETS */}
            {service.subServices?.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral/10">
                <p className="text-xs md:text-lg uppercase tracking-wider text-neutral/40">
                  {service.servicesInclude}
                </p>

                <ul className="space-y-2">
                  {service.subServices.slice(0, 4).map((sub, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />

                      <div className="leading-snug">
                        <p className="text-sm lg:text-base text-neutral/80">
                          {sub.title}
                        </p>

                        {/* {sub.description && (
                          <p className="text-xs text-neutral/50">
                            {sub.description}
                          </p>
                        )} */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: IMAGE + CTA BLOCK */}
        <div className="lg:col-span-4 flex flex-col items-center gap-4">
          {/* IMAGE */}
          <div className="relative w-[340px] h-[170px] overflow-hidden rounded-xl group">
            <img
              src={service.image}
              alt={service.title}
              className=" w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/30" />
          </div>

          {/* EXPAND BUTTON */}
          <button
            onClick={handleToggle}
            className="flex flex-col items-center text-neutral group"
          >
            <FiChevronDown
              className={` text-5xl transition-all duration-300 group-hover:-translate-y-1
        ${isOpen ? "rotate-180" : ""}
      `}
            />

            <span className="text-lg text-neutral/60 opacity-0 group-hover:opacity-100 transition">
              {isOpen ? tServices("hideDetails") : tServices("viewDetails")}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE ROW */}
      <div onClick={handleToggle} className="lg:hidden py-1 lg:py-4 space-y-4">
        <div className="relative h-[220px] overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 p-5">
            <h2 className="text-3xl font-pf text-white">{service.title}</h2>

            {service.introTag && (
              <p className="uppercase tracking-wider text-white/70 text-sm mt-1">
                {service.introTag}
              </p>
            )}
          </div>
        </div>
        <div className="mx-4">
          <p className="text-neutral/70 leading-relaxed">{service.overview}</p>
          {service.subServices.slice(0, 4).map((sub, idx) => (
            <li key={idx} className="flex gap-2 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0 self-center" />

              <div className="leading-snug">
                <p className="text-lg text-neutral/80">{sub.title}</p>
              </div>
            </li>
          ))}
        </div>
        <button className="mx-4 flex items-center gap-2 text-accent text-lg">
          <span>
            {isOpen ? tServices("hideDetails") : tServices("viewDetails")}
          </span>

          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* EXPANDED SECTION */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={detailsRef}
            key="service-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="overflow-hidden scroll-mt-24"
          >
            <ServiceDetails
              service={service}
              onClose={() => {
                onToggle();

                setTimeout(() => {
                  scrollToRow();
                }, 100);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceRow;
