import React from "react";
import "./content-card.scss";
import ContentCardContent from "./contentCardContent/ContentCardContent";

interface ContentCardType {
  title: string;
  children: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}

function ContentCard({
  sections,
}: {
  sections: ContentCardType[];
}): JSX.Element {
  return (
    <div className="content-card-wrapper">
      <div className="content-card">
        {sections.map((content: ContentCardType, index: number) => (
          <ContentCardContent
            key={index}
            title={content.title}
            createAction={content.createAction}
            showOptionAction={content.showOptionAction}
          >
            {content.children}
          </ContentCardContent>
        ))}
      </div>
    </div>
  );
}

export default ContentCard;
