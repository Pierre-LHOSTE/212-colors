import React from "react";
import "./content-card-content.scss";

function ContentCardContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="content-card-content">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default ContentCardContent;
