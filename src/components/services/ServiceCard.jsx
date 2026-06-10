import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ service, isOpen, onToggle }) => {
  const { t: tServices } = useTranslation("services");

  return (
    <div className="group border border-neutral/10 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <button onClick={onToggle} className="hideen lg:block w-full text-left">
        <div className="overflow-hidden">
          <img
            src={service.image.src}
            alt={service.image.alt}
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-lg lg:text-xl mb-1">
            {service.title}
          </h3>

          <p className="text-base lg:text-lg text-neutral/70 leading-relaxed font-semibold">
            {service.introHook}
          </p>

          {service.aspects?.length > 0 && (
            <div className="mt-4 flex flex-col flex-wrap gap-3 text-sm lg:text-base text-neutral/80">
              {service.aspects.map((aspect, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  {aspect}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-2">
            <FiChevronDown
              className={`text-3xl transition-transform duration-300 ${
                isOpen ? "rotate-180 text-accent text-4xl" : "text-neutral"
              }`}
            />

            <span className="text-lg text-neutral/70">
              {isOpen ? tServices("hideDetails") : tServices("viewDetails")}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ServiceCard;
