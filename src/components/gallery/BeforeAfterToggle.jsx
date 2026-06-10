import { useState } from "react";

const BeforeAfterToggle = ({
  before,
  after,
  beforeImage,
  afterImage,
  beforeAlt = "Before image",
  afterAlt = "After image",
  label,
  className = "",
}) => {
  const [showAfter, setShowAfter] = useState(true);

  // support both naming conventions
  const beforeSrc = beforeImage || before;
  const afterSrc = afterImage || after;

  if (!beforeSrc || !afterSrc) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <img
          src={afterSrc || beforeSrc}
          alt={afterAlt || beforeAlt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {/* IMAGE */}
      <img
        src={showAfter ? afterSrc : beforeSrc}
        alt={showAfter ? afterAlt : beforeAlt}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* LABEL */}
      {label && (
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur">
          {label}
        </div>
      )}

      {/* TOGGLE */}
      <div
        data-toggle-controls
        className="absolute top-4 right-4 flex items-center bg-black/70 backdrop-blur rounded-full p-1 border border-white/10"
      >
        <button
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setShowAfter(false);
          }}
          className={`px-4 py-2 text-sm rounded-full transition-all
            ${!showAfter ? "bg-white text-neutral" : "text-white/70 hover:text-white"}
          `}
        >
          Before
        </button>

        <button
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setShowAfter(true);
          }}
          className={`px-4 py-2 text-sm rounded-full transition-all
            ${showAfter ? "bg-white text-neutral" : "text-white/70 hover:text-white"}
          `}
        >
          After
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterToggle;
