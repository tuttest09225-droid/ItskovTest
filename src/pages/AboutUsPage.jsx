import React, { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import FactorCard from "../components/FactorCard";

const AboutUs = () => {
  const { t } = useTranslation();

  const factors = Object.values(t("about.issues.factors", { returnObjects: true }));


  // Variants
  const heroDesktopVariants = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const heroMobileVariants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const cardDesktopVariants = { hidden: { opacity: 0, y: 20 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15 } }) };
  const cardMobileVariants = { hidden: { opacity: 0, y: 30 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }) };

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  return (
    <div className="min-h-screen overflow-hidden pt-[15vh] pb-20 font-bn text-primary">
      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 px-6 lg:px-20">
        {/* Image */}
        <motion.img
          src="./aboutUs-solo.jpg"
          alt="About us"
          className="lg:w-1/3 max-h-[60vh] object-cover rounded-3xl shadow-xl border-4 border-secondary"
          variants={isDesktop ? heroDesktopVariants : heroMobileVariants}
          initial="hidden"
          animate="show"
        />

        {/* Text */}
        <motion.div
          className="lg:w-1/2 bg-secondary p-8 lg:p-12 rounded-3xl shadow-md border-4 border-neutral"
          variants={isDesktop ? heroDesktopVariants : heroMobileVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral mb-6">
            {t("about.intro.title")}
          </h1>
          <p className="text-lg leading-relaxed mb-4">{t("about.intro.paragraph.1")}</p>
          <p className="text-lg leading-relaxed mb-6">{t("about.intro.paragraph.2")}</p>

          <h3 className="text-2xl lg:text-3xl text-neutral mb-4">{t("about.intro.subtitle")}</h3>
          <ul className="space-y-2">
            {[t("about.intro.points.1"), t("about.intro.points.2"), t("about.intro.points.3"), t("about.intro.points.4")].map((point, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <GiCheckMark className="text-accent text-xl min-h-5 min-w-5 transition-colors hover:text-neutral hover:scale-120" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Issues Section */}
      <div className="mt-24">
        <h2 className="text-4xl lg:text-5xl text-center font-bold text-neutral mb-12">
          {t("about.issues.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {factors.map((factor, idx) => (
            <FactorCard
              key={idx}
              factor={factor}
              idx={idx}
              isDesktop={isDesktop}
              variants={isDesktop ? cardDesktopVariants : cardMobileVariants}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
