import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import ExpandedService from "./ExpandedService";

const ServicesGrid = ({ secondaryServices }) => {
  const [openSecondary, setOpenSecondary] = useState(null);

  const rows = [];

  for (let i = 0; i < secondaryServices.length; i += 3) {
    rows.push(secondaryServices.slice(i, i + 3));
  }

  return (
    <div className="space-y-6">
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {row.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isOpen={openSecondary === service.id}
                onToggle={() =>
                  setOpenSecondary(
                    openSecondary === service.id
                      ? null
                      : service.id
                  )
                }
              />
            ))}
          </div>

          {row.some((s) => s.id === openSecondary) && (
            <ExpandedService
              service={row.find(
                (s) => s.id === openSecondary
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServicesGrid;