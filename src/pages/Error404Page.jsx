import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FiAlertCircle } from "react-icons/fi";

const Error404 = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center font-pf">
      <Helmet>
        <html lang={lang} />
        <title>{t("site.pages.404.title")}</title>
        <meta name="description" content={t("site.pages.404.description")} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={t("site.pages.404.canonical")} />

        {/* --- Open Graph --- */}
        <meta property="og:type" content={t("site.og.type")} />
        <meta property="og:site_name" content={t("site.og.site_name")} />
        <meta property="og:title" content={t("site.pages.404.title")} />
        <meta property="og:description" content={t("site.pages.404.description")} />
        <meta property="og:url" content={t("site.pages.404.canonical")} />
        <meta property="og:image" content={t("site.og.image")} />
        <meta property="og:image:alt" content={t("site.og.image_alt")} />

        {/* --- Twitter --- */}
        <meta name="twitter:card" content={t("site.twitter.card")} />
        <meta name="twitter:site" content={t("site.twitter.handle")} />
        <meta name="twitter:title" content={t("site.pages.404.title")} />
        <meta name="twitter:description" content={t("site.pages.404.description")} />
        <meta name="twitter:image" content={t("site.og.image")} />

        {/* --- Schema.org JSON-LD --- */}
        <script type="application/ld+json">
          {JSON.stringify(t("site.organization", { returnObjects: true }))}
        </script>
      </Helmet>

      <FiAlertCircle className="text-red-600 text-6xl mb-6" />
      <h1 className="text-7xl font-bold mb-4">{t("404page.title")}</h1>
      <h2 className="text-3xl font-semibold mb-2 font-ms">{t("404page.subtitle")}</h2>
      <p className="mb-6 text-gray-700 max-w-md font-ns">{t("404page.text")}</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 border-2 border-accent text-neutral rounded hover:text-accent transition"
      >
        {t("404page.btn")}
      </Link>
    </div>
  );
};

export default Error404;
