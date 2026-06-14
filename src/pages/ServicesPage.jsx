import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import SecondaryServiceDetails from "../components/services/SecondaryServiceDetails";
import ServiceRow from "../components/services/ServiceRow";
import ServiceCard from "../components/services/ServiceCard";
import ServiceAccordion from "../components/services/ServiceAccordion";

const Services = () => {
  const { t, i18n } = useTranslation();
  const { t: tServices } = useTranslation("services");
  const lang = i18n.language;

  const servicesList = tServices("serviceList", {
    returnObjects: true,
  });

  const [openService, setOpenService] = useState(null);
  const [openSecondary, setOpenSecondary] = useState(null);

  if (!Array.isArray(servicesList)) return null;

  const primaryServices = servicesList.filter((s) => s.type === "primary");

  const secondaryServices = servicesList.filter((s) => s.type === "secondary");
  const rows = [];

  for (let i = 0; i < secondaryServices.length; i += 3) {
    rows.push(secondaryServices.slice(i, i + 3));
  }
  return (
    <div className="font-pf">
      <Helmet>
        <html lang={lang} />

        <title>{t("site.pages.services.title")}</title>
        <meta
          name="description"
          content={t("site.pages.services.description")}
        />
        <meta name="keywords" content={t("site.pages.services.keywords")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={t("site.pages.services.canonical")} />

        <meta property="og:type" content={t("site.og.type")} />
        <meta property="og:site_name" content={t("site.og.site_name")} />
        <meta property="og:title" content={t("site.pages.services.title")} />
        <meta
          property="og:description"
          content={t("site.pages.services.description")}
        />
        <meta property="og:url" content={t("site.pages.services.canonical")} />
        <meta property="og:image" content={t("site.og.image")} />
        <meta property="og:image:alt" content={t("site.og.image_alt")} />

        <meta name="twitter:card" content={t("site.twitter.card")} />
        <meta name="twitter:site" content={t("site.twitter.handle")} />
        <meta name="twitter:title" content={t("site.pages.services.title")} />
        <meta
          name="twitter:description"
          content={t("site.pages.services.description")}
        />
        <meta name="twitter:image" content={t("site.og.image")} />

        <script type="application/ld+json">
          {JSON.stringify(t("site.organization", { returnObjects: true }))}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative h-[100vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/services-hero.jpg)" }}
        />

        <motion.div
          className="absolute inset-0 bg-neutral/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl lg:text-6xl font-bold">
            {tServices("intro.title")}
          </h1>

          <p className="mt-6 text-xl lg:text-3xl max-w-2xl mx-auto">
            {tServices("intro.text")}
          </p>
        </div>
      </section>

      {/* PRIMARY */}
      <section className="max-w-7xl mx-auto px-2 lg:px-6 py-6 space-y-4">
        {primaryServices.map((service) => ( 
          <ServiceRow
            key={service.title}
            service={service}
            isOpen={openService === service.title}
            onToggle={() =>
              setOpenService(
                openService === service.title ? null : service.title,
              )
            }
          />
        ))}
      </section>

      {/* SECONDARY */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <h2 className="text-3xl font-semibold font-pf mb-8">
          {tServices("additionalServices")}
        </h2>

        <div className="hidden lg:block space-y-6">
          {rows.map((row, rowIndex) => {
            const expandedService = row.find((s) => s.id === openSecondary);

            return (
              <React.Fragment key={rowIndex}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {row.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isOpen={openSecondary === service.id}
                      onToggle={() =>
                        setOpenSecondary(
                          openSecondary === service.id ? null : service.id,
                        )
                      }
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {expandedService && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <SecondaryServiceDetails service={expandedService} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>
        <div className="lg:hidden">
          {secondaryServices.map((service) => (
            <ServiceAccordion
              key={service.id}
              service={service}
              isOpen={openSecondary === service.id}
              onToggle={() =>
                setOpenSecondary(
                  openSecondary === service.id ? null : service.id,
                )
              }
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral/10 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-semibold font-pf mb-4">
            {t("cta.title")}
          </h2>

          <p className="text-neutral/70 mb-8">{t("cta.description")}</p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={`mailto:${t("contacts.email.value1")}${t("contacts.email.value2")}@gmail.com?subject=${encodeURIComponent(
                t("cta.genericEmailSubject"),
              )}`}
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral text-white text-lg rounded-full hover:bg-accent transition-all duration-300"
            >
              {t("cta.quote.label")}
            </a>

            <Link
              to={t("cta.primaryAction.route")}
              className="inline-flex items-center justify-center px-6 py-3 bg-neutral text-white text-lg rounded-full hover:bg-accent transition-all duration-300"
            >
              {t("cta.primaryAction.label")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
