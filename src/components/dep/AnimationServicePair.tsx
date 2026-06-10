import { motion, easeOut } from "framer-motion";
import { useTranslation } from "react-i18next";

const rubberBandSlideInFromLeft = {
  hidden: { opacity: 0 },
  visible: {
    x: ["-120%", "220%", "0%"],  // keyframe positions
    opacity: [0, 1, 1],          // opacity keyframes
    transition: {
      duration: 4,
      ease: easeOut,
      times: [0, 0.4, 1],       //keyframe percentages (0%, 40%, 100%)
    },
  },
};

const rubberBandSlideInFromRight = {
  visible: {
    x: ["120%", "-220%", "0%"],
    opacity: [0, 1, 1],
    transition: {
      duration: 4,
      ease: easeOut,
      times: [0, 0.4, 1],
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 3, ease: easeOut, delay: 1.7 } }
};

const bgFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 4.2 // AFTER the slide/fade animations complete
    }
  }
};
const ServicePair = ({
  index,
  leftKey,
  rightKey,
  image,
}: {
  index: number;
  leftKey: string;
  rightKey: string;
  image?: string;
}) => {
  const { t } = useTranslation();
  const isReversed = index % 2 !== 0;

  const leftContent = isReversed ? t(rightKey) : t(leftKey);
  const rightContent = isReversed ? t(leftKey) : t(rightKey);

  const leftVariant = isReversed ? fadeIn : rubberBandSlideInFromLeft;
  const rightVariant = isReversed ? rubberBandSlideInFromRight : fadeIn;

  const leftStyle = isReversed
    ? "font-normal bg-white z-9 justify-end"
    : "font-bold bg-accent z-10";
  const rightStyle = isReversed
    ? "font-bold bg-accent z-10"
    : "font-normal bg-white z-9 justify-end";

  return (
    <div className="relative w-full mb-6 min-h-[30vh]">
      {/* Background image layer */}
      <motion.div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat z-0 scale-100"
        style={{ backgroundImage: `url(${image || "/services-hero.jpg"})` }}
        variants={bgFadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      />

      {/* Foreground content */}
      <div className="relative flex flex-col md:flex-row w-full border-accent border-2 min-h-[30vh] items-stretch justify-between z-10">
        {/* Left trapezoid */}
        <div className="relative w-full md:w-1/2 lg:w-[40%] flex">
          <motion.div
            className={`clip-trapezoid-left h-full w-full text-primary px-8 py-6 text-xl flex flex-col items-start gap-3 ${leftStyle}`}
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {Array.isArray(leftContent) ? (
              <ul className="pr-8 list-disc list-inside">
                {leftContent.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="pr-8">{leftContent}</p>
            )}
          </motion.div>
        </div>

        {/* Right trapezoid */}
        <div className="relative w-full md:w-1/2 lg:w-[40%] flex">
          <motion.div
            className={`clip-trapezoid-right h-full w-full text-base-content px-8 py-6 text-lg flex flex-col items-end gap-3 ${rightStyle}`}
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {Array.isArray(rightContent) ? (
              <ul className="pl-8 list-disc list-inside">
                {rightContent.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="pl-8">{rightContent}</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicePair