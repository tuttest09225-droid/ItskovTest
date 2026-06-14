const ProjectTag = ({ tag, onClick, active = false, variant = "default" }) => {
  const variants = {
    default: "rounded-lg border-gray-200 bg-gray-200 text-gray-800",

    cinematic:
      "rounded-full border-accent/60 bg-transparent text-accent hover:bg-accent hover:text-neutral text-sm",

    editorial:
      "rounded-sm border-neutral/20 bg-transparent text-neutral hover:bg-neutral hover:text-white",

    compact:
      "rounded-md border-neutral/20 bg-neutral/5 text-neutral text-sm hover:border-neutral ",
    /* editorial:
      "rounded-sm border-neutral bg-transparent text-neutral hover:bg-neutral hover:text-white",

    compact: 
      "rounded-md border-neutral/20 bg-neutral/5 text-neutral text-sm hover:border-neutral ", */
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(tag);
      }}
      className={`
                  m-1 px-3 py-1 border-2 transition-colors
                  ${variants[variant]}
                  ${active ? "border-neutral text-neutral" : ""}
                `}
    >
      {tag}
    </button>
  );
};

export default ProjectTag;
