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

  const beforeSrc = beforeImage || before;

  const afterSrc = afterImage || after;

  if (!beforeSrc || !afterSrc) {
    return (
      <div className="relative flex items-center justify-center max-w-[95vw] max-h-[75vh] overflow-hidden">
        <img
          src={afterSrc || beforeSrc}
          alt={afterAlt}
          className="max-w-full max-h-[70vh] object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl max-w-[90vw] max-h-[70vh] lg:max-h-[80vh] ${className}`}
    >
      <img
        src={showAfter ? afterSrc : beforeSrc}
        alt={showAfter ? afterAlt : beforeAlt}
        className="max-w-full max-h-[75vh] lg:max-h-[80vh] object-contain"
      />

      {label && (
        <div className=" absolute bottom-4 left-4 z-40 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
          {label}
        </div>
      )}

      <div
        data-toggle-controls
        className=" absolute top-4 right-4 z-50 flex bg-black/70 backdrop-blur rounded-full p-1"
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
