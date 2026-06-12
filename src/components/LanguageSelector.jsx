import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18next.language);
  const { i18n, t } = useTranslation();

  const handleLanguageChange = () => {
    const next = language === "en" ? "bg" : "en";

    setLanguage(next);
    i18next.changeLanguage(next);

    document.activeElement?.blur();
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.language]);

  return (
    <button
      onClick={handleLanguageChange}
      className="
        bg-transparent
        px-3 py-2
        text-primary
        rounded-lg
        hover:text-secondary
        hover:bg-neutral
        transition
      "
    >
      <span className="md:hidden uppercase">{language}</span>

      <span className="hidden md:flex items-center gap-2">
        {language === "en" ? "🇬🇧" : "🇧🇬"} {t(`language.${language}`)}
      </span>
    </button>
  );
};

export default LanguageSelector;
