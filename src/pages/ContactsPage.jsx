import React from "react";
import { Helmet } from "react-helmet";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";

const Contacts = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [loadMap] = useState(true);

  const emailUser1 = t("footer.email.value1");
  const emailUser2 = t("footer.email.value2");
  const emailDomain = "gmail.com";
  const email = `${emailUser1}${emailUser2}@${emailDomain}`;

  // Detect screen size
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  // Variants
  const heroVariants = {
    hidden: { opacity: 0, y: isDesktop ? 0 : 40, x: isDesktop ? -50 : 0 },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8 } },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: isDesktop ? 0.95 : 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const listVariants = {
    show: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  

  return (
    <div className="overflow-hidden min-h-[80vh] font-pf text-primary content-center py-8">
      {/*SEO META DATA */}
      <Helmet>
        <html lang={lang} />
        <title>{t("site.pages.contacts.title")}</title>
        <meta
          name="description"
          content={t("site.pages.contacts.description")}
        />
        <meta name="keywords" content={t("site.pages.contacts.keywords")} />
        <meta name="author" content={t("site.author")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={t("site.pages.contacts.canonical")} />

        {/* --- Open Graph --- */}
        <meta property="og:type" content={t("site.og.type")} />
        <meta property="og:site_name" content={t("site.og.site_name")} />
        <meta property="og:title" content={t("site.pages.contacts.title")} />
        <meta
          property="og:description"
          content={t("site.pages.contacts.description")}
        />
        <meta property="og:url" content={t("site.pages.contacts.canonical")} />
        <meta property="og:image" content={t("site.og.image")} />
        <meta property="og:image:alt" content={t("site.og.image_alt")} />

        {/* --- Twitter --- */}
        <meta name="twitter:card" content={t("site.twitter.card")} />
        <meta name="twitter:site" content={t("site.twitter.handle")} />
        <meta name="twitter:title" content={t("site.pages.contacts.title")} />
        <meta
          name="twitter:description"
          content={t("site.pages.contacts.description")}
        />
        <meta name="twitter:image" content={t("site.og.image")} />

        {/* --- Schema.org JSON-LD --- */}
        <script type="application/ld+json">
          {JSON.stringify(t("site.organization", { returnObjects: true }))}
        </script>
      </Helmet>

      <div className="flex flex-col lg:flex-row bg-[radial-gradient(circle,theme(colors.secondary),theme(colors.white))] pt-20">
        {/* Contact details */}
        <motion.div
          className="min-h-[40vh] lg:w-1/2 text-center flex flex-col justify-center items-center p-6"
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-4xl lg:text-5xl font-bold">
            {t("contacts.title")}
          </h1>
          <b className="my-8 ml-2 text-2xl lg:text-3xl text-neutral font-ms font-black">
            {t("contacts.text.bold1")}, {t("contacts.text.bold2")}{" "}
            {t("contacts.text.bold3")}
          </b>
          <p className="text-lg lg:text-2xl max-w-[80vw] mb-6 font-ns">
            {t("contacts.text.normal")}
          </p>

          <motion.div
            className="flex flex-col gap-6 w-full max-w-lg"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h2
              className="text-lg lg:text-2xl flex items-center justify-center font-pf"
              variants={itemVariants}
            >
              <FiPhoneCall className="mx-2 text-neutral" />
              <b className="mx-2">{t("contacts.phone.note")}</b>
              {t("contacts.phone.value")}
            </motion.h2>

            <motion.h2
              className="text-lg lg:text-2xl flex items-center justify-center font-pf"
              variants={itemVariants}
            >
              <FiMail className="mx-2 text-neutral" />
              <b className="mx-2">{t("contacts.email.note")}</b>
              <a href={`mailto:${email}`} className="hover:underline break-all">
                {email}
              </a>
            </motion.h2>
          </motion.div>
        </motion.div>

        {/* Map */}
        <motion.div
          className="lg:w-1/2 w-full h-[300px] lg:h-auto lg:mx-10 mt-6 lg:mt-0"
          variants={mapVariants}
          initial="hidden"
          animate="show"
        >
          {loadMap ? (
            <iframe
              title="Business area"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93836.37935954207!2d23.241546740875236!3d42.69552878928868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia!5e0!3m2!1sen!2sbg!4v1755696992586!5m2!1sen!2sbg"
              loading="lazy"
              style={{ border: 0 }}
              width="100%"
              height="100%"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-500">
              Loading map…
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;
