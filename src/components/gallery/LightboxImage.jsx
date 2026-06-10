// components/media/SingleImageLightbox.jsx

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import BeforeAfterToggle from "./BeforeAfterToggle";

const LightboxImage = ({
  image,
  onClose,
}) => {
  useEffect(() => {
    if (!image) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  const hasComparison = image.before && image.after;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:text-accent transition"
        aria-label="Close"
      >
        <IoClose className="text-3xl" />
      </button>

      {/* CONTENT */}
      <div
        className="max-w-[95vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {hasComparison ? (
          <BeforeAfterToggle
            before={image.before}
            after={image.after}
            alt={image.alt}
            mode="slider"
          />
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl"
          />
        )}
      </div>
    </div>
  );
};

export default LightboxImage;