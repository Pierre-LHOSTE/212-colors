import React from "react";

function ContentCardContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h3>{title}</h3>
      <div>{children}</div>
    </>
  );
}

export default ContentCardContent;
