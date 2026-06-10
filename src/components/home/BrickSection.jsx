import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BsBricks } from "react-icons/bs";

const brickContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.4 } },
};
const brickVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const BrickSection = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col md:flex-row justify-center items-center text-3xl sm:text-4xl text-neutral gap-6 md:gap-12 px-4 md:px-0 pb-12 font-ms"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={brickContainer}
    >
      {[t("home.bold1"), t("home.bold2"), t("home.bold3")].map((txt, i) => (
        <motion.div key={i} className="flex items-center gap-4" variants={brickVariants}>
          <BsBricks /> {txt} <BsBricks />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BrickSection;
