import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import FactorCard from "./FactorCard";
import useMediaQuery from "../../hooks/useMediaQuery.js";

const AboutUsSection = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const factors = Object.values(t("about.issues.factors", { returnObjects: true }));

  const heroDesktopVariants = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const heroMobileVariants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const cardDesktopVariants = { hidden: { opacity: 0, y: 20 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15 } }) };
  const cardMobileVariants = { hidden: { opacity: 0, y: 30 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }) };

  return (
    <div className="min-h-screen overflow-hidden pb-20 font-bn text-primary">
      {/* Intro */}
      <div className="relative flex flex-col md:flex-row items-start w-[90vw] justify-center justify-self-center gap-10">
        <motion.img
          src="./about.avif"
          alt="About us"
          className="w-screen md:w-1/2 max-h-[40vh] lg:max-h-[70vh] object-cover rounded-3xl shadow-xl border-4 border-secondary"
          variants={isDesktop ? heroDesktopVariants : heroMobileVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        />

        <motion.div
          className="lg:w-1/2 bg-secondary p-8 lg:p-12 lg:min-h-[70vh] rounded-3xl shadow-md border-4 border-neutral"
          variants={isDesktop ? heroDesktopVariants : heroMobileVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral mb-6 font-pf">{t("about.intro.title")}</h2>
          <p className="text-lg leading-relaxed mb-4 font-ns">{t("about.intro.paragraph.1")}</p>
          <p className="text-lg leading-relaxed mb-6 font-ns">{t("about.intro.paragraph.2")}</p>

          <h3 className="text-4xl lg:text-5xl font-bold text-neutral mb-6 font-pf">{t("about.intro.subtitle")}</h3>
          <ul className="space-y-2 text-lg font-ns">
            {[t("about.intro.points.1"), t("about.intro.points.2"), t("about.intro.points.3"), t("about.intro.points.4")].map((point, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <GiCheckMark className="text-accent text-xl min-h-5 min-w-5 transition-colors hover:text-neutral hover:scale-120" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Issues */}
      <div className="mt-12 w-[90vw] mx-auto">
        <h2 className="text-4xl lg:text-5xl text-center font-bold text-neutral mt-24 mb-12 font-pf">{t("about.issues.title")}</h2>
        <div className="min-w-[90vw] place-self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

export default AboutUsSection;
