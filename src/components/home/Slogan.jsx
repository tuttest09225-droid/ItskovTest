import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const sloganVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Slogan = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="text-center text-4xl sm:text-5xl text-neutral py-8 px-4 font-pf"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sloganVariants}
    >
      {t("home.slogan")}
    </motion.div>
  );
};

export default Slogan;
