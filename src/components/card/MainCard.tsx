"use client";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import type React from "react";
import "./main-card.scss";
import MainCardSection from "./mainCardSection/MainCardSection";
import type { MainCardProps, MainCardSectionType } from "./props";

export default function MainCard(props: MainCardProps): JSX.Element {
  const {
    direction,
    sections,
    title,
    children,
    createAction,
    showEditAction,
    deleteAction,
    dndAction,
    noPadding,
    noScroll,
    id,
    className,
  } = props;
  return (
    <div
      id={id}
      className={`main-card${className ? ` ${className} ` : ""}${direction === "horizontal" ? " horizontal" : " vertical"}${noPadding ? " no-padding" : ""}`}
    >
      <div className="main-card-wrapper">
        {noScroll ? (
          <div className="main-card-sections-scroll">
            {sections && sections.length > 0 ? (
              sections.map((content: MainCardSectionType) => (
                <MainCardSection
                  key={content.title.toLocaleLowerCase().replace(" ", "-")}
                  title={content.title}
                  createAction={content.createAction}
                  showEditAction={content.showEditAction}
                  deleteAction={deleteAction}
                  dndAction={dndAction}
                >
                  {content.children}
                </MainCardSection>
              ))
            ) : title || createAction || showEditAction ? (
              <MainCardSection
                title={title}
                createAction={createAction}
                showEditAction={showEditAction}
                deleteAction={deleteAction}
                dndAction={dndAction}
              >
                {children}
              </MainCardSection>
            ) : (
              <>{children}</>
            )}
          </div>
        ) : (
          <OverlayScrollbarsComponent
            className="main-card-sections-scroll"
            defer={true}
          >
            {sections && sections.length > 0 ? (
              sections.map((content: MainCardSectionType) => (
                <MainCardSection
                  key={content.title.toLocaleLowerCase().replace(" ", "-")}
                  title={content.title}
                  createAction={content.createAction}
                  showEditAction={content.showEditAction}
                  deleteAction={deleteAction}
                  dndAction={dndAction}
                >
                  {content.children}
                </MainCardSection>
              ))
            ) : title || createAction || showEditAction ? (
              <MainCardSection
                title={title}
                createAction={createAction}
                showEditAction={showEditAction}
                deleteAction={deleteAction}
                dndAction={dndAction}
              >
                {children}
              </MainCardSection>
            ) : (
              <>{children}</>
            )}
          </OverlayScrollbarsComponent>
        )}
      </div>
    </div>
  );
}
