import React from "react";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const LanguageSelector = () => {
  // Set the initial language from i18next's detected or default language
  const [language, setLanguage] = useState(i18next.language);

  const { i18n, t } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18next.changeLanguage(selectedLanguage); // Update language in i18next
    document.activeElement?.blur();
  };

  useEffect(() => {
    document.body.dir = i18n.dir(); //sets the body to ltr or rtl
  }, [i18n, i18n.language]);

  const languageOptions = [
    {
      language: t("language.en"),
      code: "en",
    },
    { language: t("language.bg"), code: "bg" },
  ];

  return (
    <button
      onClick={() =>
        handleLanguageChange({
          target: {
            value: languageOptions.find((option) => option.code !== language)
              ?.code,
          },
        })
      }
      className="bg-transparent px-4 py-2 text-primary rounded-b-none hover:text-secondary hover:bg-neutral transition-colors duration-200"
    >
      {languageOptions.find((option) => option.code !== language)?.language}
    </button>
  );
};

export default LanguageSelector;
