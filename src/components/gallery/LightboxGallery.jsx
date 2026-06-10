import { useEffect, useRef, useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import BeforeAfterToggle from "./BeforeAfterToggle";

import { motion } from "framer-motion";

const LightboxGallery = ({
  images = [],
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !images.length) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;

    const distance = Math.abs(touchStartX.current - touchEndX.current);

    if (distance > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) {
      return;
    }

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextImage();
    }

    if (distance < -50) {
      prevImage();
    }
  };
  const current = images[currentIndex];
  const hasComparison = current.before && current.after;

  return (
    <motion.div
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 z-[999] bg-black/95 flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between p-4 lg:p-6">
        <div className="text-white/70 text-sm lg:text-base">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          onClick={onClose}
          className="text-white hover:text-accent transition"
          aria-label="Close gallery"
        >
          <IoClose className="text-3xl" />
        </button>
      </div>

      {/* IMAGE */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* PREV DESKTOP */}
        <button
          onClick={prevImage}
          className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Previous image"
        >
          <IoChevronBack className="text-3xl" />
        </button>

        {/* MAIN IMAGE */}
        <div
          className="relative z-20"
          onClick={(e) => {
            // Ignore toggle buttons
            if (e.target.closest("button") || isSwiping.current) {
              return;
            }

            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;

            if (clickX < rect.width / 2) {
              prevImage();
            } else {
              nextImage();
            }
          }}
        >
          {hasComparison ? (
            <div>
              <BeforeAfterToggle
                before={current.before}
                after={current.after}
                label={current.alt}
                className="max-w-full max-h-[75vh] lg:max-h-[82vh] rounded-none lg:rounded-xl"
              />
            </div>
          ) : (
            <img
              src={current.src}
              alt={current.alt}
              className="max-w-full max-h-[75vh] lg:max-h-[82vh] object-contain lg:rounded-xl shadow-2xl"
            />
          )}
        </div>

        {/* NEXT DESKTOP */}
        <button
          onClick={nextImage}
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur items-center justify-center text-white hover:bg-white/20 transition"
          aria-label="Next image"
        >
          <IoChevronForward className="text-3xl" />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="w-full overflow-x-auto px-4 py-4 border-t border-white/10">
        <div className="flex gap-3 w-max mx-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition-all
                ${
                  currentIndex === index
                    ? "border-accent scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }
              `}
            >
              <img
                src={img.src || img.after}
                alt={img.alt}
                className="w-20 h-20 lg:w-24 lg:h-24 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LightboxGallery;
