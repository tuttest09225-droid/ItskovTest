import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const ServiceCard = ({ service }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="
        group
        border border-neutral/10
        rounded-xl
        overflow-hidden
        bg-white
        hover:shadow-lg
        transition-all duration-300
      "
    >
      {/* HEADER */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left"
      >
        <div className="overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="
              h-48 w-full object-cover
              transition-transform duration-700
              group-hover:scale-105
            "
          />
        </div>

        <div className="p-5">
          <h3 className="font-semibold text-xl mb-3">
            {service.title}
          </h3>

          <p className="text-sm text-neutral/70 leading-relaxed">
            {service.overview}
          </p>

          <p className="text-xs italic text-neutral/60 mt-4">
            {service.text}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <FiPlus
              className={`
                text-lg transition-transform duration-300
                ${isOpen ? "rotate-45" : ""}
              `}
            />

            <span className="text-sm text-neutral/70">
              {isOpen ? "Hide details" : "See more"}
            </span>
          </div>
        </div>
      </button>

      {/* EXPANDED CONTENT */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral/10 p-5">
              {/* DESCRIPTION */}
              <div className="space-y-4">
                <h4 className="font-semibold text-neutral">
                  Service Details
                </h4>

                <p className="text-sm text-neutral/70 leading-relaxed">
                  {service.overview}
                </p>
              </div>

              {/* GALLERY PREVIEW */}
              <div className="mt-6">
                <div className="flex gap-2">
                  {service.images?.slice(0, 3).map((img, index) => (
                    <div
                      key={index}
                      className="flex-1 overflow-hidden rounded-lg"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:itskovstroy@gmail.com?subject=${encodeURIComponent(
                    `${service.title} - Quote Request`
                  )}`}
                  className="
                    px-4 py-2
                    bg-neutral
                    text-white
                    rounded-full
                    text-sm
                    hover:bg-accent
                    transition
                  "
                >
                  Request Quote
                </a>

                <a
                  href={`mailto:itskovstroy@gmail.com?subject=${encodeURIComponent(
                    `${service.title} - Inquiry`
                  )}`}
                  className="
                    px-4 py-2
                    border border-neutral
                    rounded-full
                    text-sm
                    hover:border-accent
                    hover:text-accent
                    transition
                  "
                >
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCard;