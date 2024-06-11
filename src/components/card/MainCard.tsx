"use client";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
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
  dndAction?: SyntheticListenerMap;
}

interface MainCardProps extends MainCardBasicType {
  sections?: MainCardSectionType[];
  noPadding?: boolean;
  noScroll?: boolean;
  id?: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}

function MainCard({
  direction,
  sections,
  title,
  children,
  createAction,
  showOptionAction,
  dndAction,
  noPadding,
  noScroll,
  id,
  className,
}: MainCardProps): JSX.Element {
  return (
    <div
      id={id}
      className={`main-card${className ? ` ${className} ` : ""}${direction === "horizontal" ? " horizontal" : " vertical"}${noPadding ? " no-padding" : ""}`}
    >
      <div className={`main-card-wrapper`}>
        {noScroll ? (
          <div className="main-card-sections-scroll">
            {sections && sections.length > 0 ? (
              sections.map((content: MainCardSectionType, index: number) => (
                <MainCardSection
                  key={index}
                  title={content.title}
                  createAction={content.createAction}
                  showOptionAction={content.showOptionAction}
                  dndAction={dndAction}
                >
                  {content.children}
                </MainCardSection>
              ))
            ) : title || createAction || showOptionAction ? (
              <MainCardSection
                title={title}
                createAction={createAction}
                showOptionAction={showOptionAction}
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
                  dndAction={dndAction}
                >
                  {content.children}
                </MainCardSection>
              ))
            ) : title || createAction || showOptionAction ? (
              <MainCardSection
                title={title}
                createAction={createAction}
                showOptionAction={showOptionAction}
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

export default MainCard;
