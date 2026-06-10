export const getCTA = (t, type) => {
  const cta = t("cta", { returnObjects: true });

  const key = type?.toLowerCase();

  return (
    cta[key] ||
    cta.default
  );
};
