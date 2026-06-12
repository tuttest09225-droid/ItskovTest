import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "text-neutral font-bold relative" : "relative";

  // Variants for staggered menu items

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Variants for staggered mobile nav items
  const mobileListVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed top-0 left-0 w-full z-50 shadow-md border-b-2 border-primary"
    >
      <motion.div
        animate={{
          backgroundColor:
            scrollY > 50 ? "rgba(245,245,245,1)" : "rgba(245,245,245,0.8)",
          backdropFilter: scrollY > 50 ? "blur(8px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className="navbar justify-between bg-secondary/80"
      >
        {/* Logo with build-up animation */}
        <div className="navbar-start aspect-[3/1] md:max-w-[180px] lg:max-w-[240px] min-w-[120px]">
          <Link to="/" className="block w-full h-full">
            <motion.img
              src={t("navbar.logo") || "./logo_bg.png"}
              alt="ITSKOV STROY logo"
              width="514"
              height="194"
              className="w-full h-full object-contain lg:ml-4"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>
        <div className="navbar-end px-1 lg:hidden">
              <LanguageSelector/>
        </div>
        {/* Desktop Nav Links */}
        <div className="navbar-end max-w-5xl hidden md:flex xl:me-20 2xl:me-40 font-pf">
          <motion.ul
            className="menu menu-horizontal md:text-l lg:text-xl text-primary items-center relative"
            initial="hidden"
            animate="show"
            variants={mobileListVariants}
          >
            {[
              { path: "/", label: t("navbar.home") },
              /* { path: "/about", label: t("navbar.about") }, */ //temporary disabled
              { path: "/services", label: t("navbar.services") },
              { path: "/projects", label: t("navbar.projects") },
              { path: "/contacts", label: t("navbar.contacts") },
            ].map(({ path, label }) => (
              <motion.li
                key={path}
                variants={mobileItemVariants}
                className="px-1 relative"
              >
                <Link
                  to={path}
                  className={`hover:bg-neutral hover:text-secondary focus:bg-transparent focus:text-neutral rounded-b-none px-2 py-1 transition-colors ${isActive(
                    path,
                  )}`}
                >
                  {label}

                  {location.pathname === path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-accent"
                    />
                  )}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={mobileItemVariants} className="px-1 hidden lg:block">
              <LanguageSelector/>
            </motion.li>
          </motion.ul>
        </div>

        {/* Mobile burger */}
        <div className="block md:hidden">
          <button
            className="relative z-50 p-2 border border-primary-content rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Morphing burger -> X */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                variants={{
                  closed: { d: "M4 6h16" },
                  open: { d: "M6 18L18 6" },
                }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                variants={{
                  closed: { d: "M4 12h16", opacity: 1 },
                  open: { opacity: 0 },
                }}
              />
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                variants={{
                  closed: { d: "M4 18h16" },
                  open: { d: "M6 6l12 12" },
                }}
              />
            </motion.svg>
          </button>

          {/* Backdrop + Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
                />

                {/* Dropdown menu */}
                <motion.ul
                  id="mobile-menu"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={menuVariants}
                  className="menu absolute top-[100%] right-0 bg-secondary/90 text-primary z-50 w-screen border border-primary p-0"
                >
                  {[
                    { path: "/", label: t("navbar.home") },
                    /* { path: "/about", label: t("navbar.about") }, */ //temporary disabled
                    { path: "/services", label: t("navbar.services") },
                    { path: "/projects", label: t("navbar.projects") },
                    { path: "/contacts", label: t("navbar.contacts") },
                  ].map(({ path, label }) => (
                    <motion.li
                      key={path}
                      variants={itemVariants}
                      className="border-b border-primary px-3 hover:bg-neutral hover:text-secondary"
                    >
                      <Link to={path}>{label}</Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
