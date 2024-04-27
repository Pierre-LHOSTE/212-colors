import React from "react";
import "./content-card.scss";

function ContentCard({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="content-card-wrapper">
      <div className="content-card">{children}</div>
    </div>
  );
}

export default ContentCard;
