const ServiceCard = ({ service, compact }) => {
  return (
    <div className={`border rounded-xl overflow-hidden bg-white hover:shadow-lg transition`}>

      {/* IMAGE */}
      <div className="h-48 bg-cover bg-center"
           style={{ backgroundImage: `url(${service.image})` }} />

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="text-xl font-bold mb-2">
          {service.left.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {service.left.description}
        </p>

        {!compact && (
          <ul className="text-sm space-y-1 mb-4">
            {service.right.tasks.slice(0, 3).map((t, i) => (
              <li key={i}>✓ {t}</li>
            ))}
          </ul>
        )}

        <button className="w-full bg-black text-white py-2 rounded-full">
          View Details
        </button>

      </div>
    </div>
  );
};

export default ServiceCard;