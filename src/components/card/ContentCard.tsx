import React from "react";
import "./content-card.scss";
import ContentCardContent from "./contentCardContent/ContentCardContent";

interface ContentCardSectionType {
  title: string;
  children: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}
interface ContentCardBasicType {
  title?: string;
  children?: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}

interface ContentCardProps extends ContentCardBasicType {
  sections?: ContentCardSectionType[];
  noPadding?: boolean;
  id?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}

function ContentCard({
  direction,
  sections,
  title,
  children,
  createAction,
  showOptionAction,
  noPadding,
  id,
  className,
}: ContentCardProps): JSX.Element {
  return (
    <div
      id={id}
      className={`content-card-wrapper${className ? className : ""}${direction === "horizontal" ? " horizontal" : " vertical"}`}
    >
      <div className={`content-card${noPadding ? " no-padding" : ""}`}>
        {sections && sections.length > 0 ? (
          sections.map((content: ContentCardSectionType, index: number) => (
            <ContentCardContent
              key={index}
              title={content.title}
              createAction={content.createAction}
              showOptionAction={content.showOptionAction}
            >
              {content.children}
            </ContentCardContent>
          ))
        ) : title || createAction || showOptionAction ? (
          <ContentCardContent
            title={title}
            createAction={createAction}
            showOptionAction={showOptionAction}
          >
            {children}
          </ContentCardContent>
        ) : (
          <>{children}</>
        )}
      </div>
    </div>
  );
}

export default ContentCard;
