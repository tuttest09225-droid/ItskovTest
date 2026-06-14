import { Link } from "react-router-dom";
import TagButton from "./ProjectTag.jsx";

const ProjectCard = ({ project, onTagClick, tagFilter }) => (
  
  <div>
    <Link
      to={`/projects/${project.slug}`}
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition block"
    >
      <img
        src={project.mainImage}
        alt={project.hero.title}
        loading="lazy"
        className="w-full h-60 object-cover"
      />
    </Link>
    <div className="p-4">
      <Link
        to={`/projects/${project.slug}`}
      >
        <h3 className="text-2xl indent-2 font-pf font-semibold">
          {project.hero.title}
        </h3>

        <p className="text-sm text-gray-600">{project.time}</p>
      </Link>

      <div
        className="flex flex-wrap mt-2 font-ms"
        onClick={(e) => e.preventDefault()}
      >
        {project.tags.slice(0, 5).map((tag, i) => (
          <TagButton
            key={tag}
            tag={tag}
            active={tag === tagFilter}
            onClick={(clickedTag) => onTagClick(clickedTag)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default ProjectCard;
