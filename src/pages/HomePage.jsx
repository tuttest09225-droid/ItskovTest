import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import Hero from "../components/home/Hero";
import Slogan from "../components/home/Slogan";
import BrickSection from "../components/home/BrickSection";
import AboutUsSection from "../components/home/AboutUsSection";

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="font-bn">
      <Helmet>
        <html lang={lang} />
        <title>{t("site.pages.home.title")}</title>
        <meta name="description" content={t("site.pages.home.description")} />
        <meta name="keywords" content={t("site.pages.home.keywords")} />
        <meta name="author" content={t("site.author")} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={t("site.pages.home.canonical")} />

        {/* --- Open Graph --- */}
        <meta property="og:type" content={t("site.og.type")} />
        <meta property="og:site_name" content={t("site.og.site_name")} />
        <meta property="og:title" content={t("site.pages.home.title")} />
        <meta property="og:description" content={t("site.pages.home.description")} />
        <meta property="og:url" content={t("site.pages.home.canonical")} />
        <meta property="og:image" content={t("site.og.image")} />
        <meta property="og:image:alt" content={t("site.og.image_alt")} />

        {/* --- Twitter --- */}
        <meta name="twitter:card" content={t("site.twitter.card")} />
        <meta name="twitter:site" content={t("site.twitter.handle")} />
        <meta name="twitter:title" content={t("site.pages.home.title")} />
        <meta name="twitter:description" content={t("site.pages.home.description")} />
        <meta name="twitter:image" content={t("site.og.image")} />

        {/* --- Schema.org JSON-LD --- */}
        <script type="application/ld+json">
          {JSON.stringify(t("site.organization", { returnObjects: true }))}
        </script>
      </Helmet>

      <Hero />
      <Slogan />
      <BrickSection />
      <AboutUsSection />
    </div>
  );
};

export default Home;
