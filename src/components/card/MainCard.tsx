import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";
import "./main-card.scss";
import MainCardSection from "./mainCardSection/MainCardSection";

interface MainCardSectionType {
  title: string;
  children: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}
interface MainCardBasicType {
  title?: string;
  children?: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}

interface MainCardProps extends MainCardBasicType {
  sections?: MainCardSectionType[];
  noPadding?: boolean;
  id?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
  innerRef?: (element: HTMLDivElement | null) => void;
  droppableProps: object;
}

function MainCard({
  direction,
  sections,
  title,
  children,
  createAction,
  showOptionAction,
  noPadding,
  id,
  className,
  innerRef,
  droppableProps,
}: MainCardProps): JSX.Element {
  return (
    <div
      ref={innerRef}
      {...droppableProps}
      id={id}
      className={`main-card${className ? className : ""}${direction === "horizontal" ? " horizontal" : " vertical"}`}
    >
      <div className={`main-card-wrapper${noPadding ? " no-padding" : ""}`}>
        <OverlayScrollbarsComponent
          className="main-card-sections-scroll"
          defer={true}
          options={
            {
              // scrollbars: { autoHide: "scroll" },
            }
          }
        >
          {sections && sections.length > 0 ? (
            sections.map((content: MainCardSectionType, index: number) => (
              <MainCardSection
                key={index}
                title={content.title}
                createAction={content.createAction}
                showOptionAction={content.showOptionAction}
              >
                {content.children}
              </MainCardSection>
            ))
          ) : title || createAction || showOptionAction ? (
            <MainCardSection
              title={title}
              createAction={createAction}
              showOptionAction={showOptionAction}
            >
              {children}
            </MainCardSection>
          ) : (
            <>{children}</>
          )}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}

export default MainCard;
