const ProjectPagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded border-2 ${i === currentPage
                            ? "border-neutral bg-neutral text-accent"
                            : "border-neutral bg-gray-200 hover:border-accent"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default ProjectPagination;