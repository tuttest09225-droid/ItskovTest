import { Helmet } from "react-helmet";

const ProjectSEO = ({ project, language }) => {
  return (
    <Helmet>
      <html lang={language} />

      <title>{project.hero.title} | Itskov Stroy</title>

      <meta name="description" content={project.overview.description} />

      <meta name="robots" content="index, follow" />

      <link
        rel="canonical"
        href={`https://itskovstroy.com/projects/${project.slug}`}
      />

      <meta property="og:title" content={project.hero.title} />

      <meta property="og:description" content={project.overview.description} />

      <meta property="og:image" content={project.mainImage} />

      <meta
        property="og:url"
        content={`https://itskovstroy.com/projects/${project.slug}`}
      />
    </Helmet>
  );
};

export default ProjectSEO;