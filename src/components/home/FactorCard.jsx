import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

const FactorCard = ({ factor, idx, isDesktop, variants }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const showDetails = isDesktop ? hovered : expanded;
  const detailsId = `factor-details-${idx}`;

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="group relative p-4 border-4 border-neutral rounded-2xl bg-secondary shadow transition-transform hover:-translate-y-2 hover:border-accent/90 cursor-pointer overflow-hidden lg:min-h-[300px] flex flex-col justify-center"
      custom={idx}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      onClick={() => !isDesktop && setExpanded((prev) => !prev)}
      onMouseEnter={() => isDesktop && setHovered(true)}
      onMouseLeave={() => isDesktop && setHovered(false)}
      whileHover={isDesktop ? { scale: 1.03 } : {}}
      role="button"
      tabIndex={0}
      aria-expanded={showDetails}
      aria-controls={detailsId}
      onKeyDown={(e) => {
        if (!isDesktop && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setExpanded((prev) => !prev);
        }
      }}
    >
      {/* Title + Text */}
      <motion.div
        animate={
          isDesktop
            ? showDetails
              ? { y: -10, scale: 0.95, transition: { type: "spring", stiffness: 200, damping: 20 } }
              : { y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
            : {}
        }
        className="text-center"
      >
        <h6 className="text-xl lg:text-2xl font-bold mb-2 underline underline-offset-8 decoration-primary-content text-neutral drop-shadow-sm font-ms">
          {factor.title}
        </h6>
        <p className="text-md font-ns">{factor.text}</p>
      </motion.div>

      {/* Details block */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            id={detailsId}
            className="overflow-hidden"
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: 500, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }}
            exit={{ opacity: 0, maxHeight: 0, transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] } }}
            layout
          >
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-1 font-ns mt-4 lg:mt-0"
            >
              {factor.details.map((point, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm"
                >
                  <GiCheckMark className="text-accent min-w-4 min-h-4" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FactorCard;
