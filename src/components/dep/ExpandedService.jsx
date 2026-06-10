import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpandedService = ({ service }) => {
  if (!service) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        className="mt-8 border border-neutral/10 rounded-2xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-12">
          {/* IMAGE */}
          <div className="lg:col-span-5">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full min-h-[350px] object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-7 p-8 lg:p-12">
            <h2 className="text-4xl font-pf font-semibold mb-6">
              {service.title}
            </h2>

            <p className="text-lg text-neutral/70 leading-relaxed mb-8">
              {service.overview}
            </p>

            <p className="text-neutral/70 leading-relaxed">
              {service.text}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={`mailto:itskovstroy@gmail.com?subject=${encodeURIComponent(
                  `${service.title} - Quote Request`
                )}`}
                className="
                  px-6 py-3
                  bg-neutral
                  text-white
                  rounded-full
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
                  px-6 py-3
                  border
                  border-neutral
                  rounded-full
                  hover:border-accent
                  hover:text-accent
                  transition
                "
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpandedService;