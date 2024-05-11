import { IconDots, IconPlus } from "@tabler/icons-react";
import React from "react";
import Button from "../../button/Button";
import "./main-card-section.scss";

const iconSize = 16;

function MainCardSection({
  title,
  children,
  createAction,
  showOptionAction,
}: {
  title?: string;
  children: React.ReactNode;
  createAction?: () => void;
  showOptionAction?: () => void;
}) {
  return (
    <section className="main-card-section">
      <header className="card-header">
        <h3>{title ? title : ""}</h3>
        <div className="card-actions">
          {showOptionAction ? (
            <Button icon={<IconDots size={iconSize} />} type="text" />
          ) : null}
          {createAction ? (
            <Button icon={<IconPlus size={iconSize} />} type="text" />
          ) : null}
        </div>
      </header>
      <div className="main-card-section-content">{children}</div>
    </section>
  );
}

export default MainCardSection;
