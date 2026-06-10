import { useTranslation } from "react-i18next";

import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const { t } = useTranslation();
  const servicesList = t("services.serviceList", { returnObjects: true });

  const primary = servicesList.slice(0, 4);
  const secondary = servicesList.slice(4);

  return (
    <div className="font-pf">

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: "url(/services-hero.jpg)" }} />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white max-w-3xl px-6">
          <h1 className="text-5xl font-bold mb-4">
            {t("services.intro.title")}
          </h1>

          <p className="text-lg opacity-90">
            {t("services.intro.text")}
          </p>
        </div>
      </section>

      {/* PRIMARY SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Primary Services
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {primary.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </section>

      {/* SECONDARY SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 opacity-70">
          Supporting Services
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {secondary.map((service, i) => (
            <ServiceCard key={i} compact service={service} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Services;