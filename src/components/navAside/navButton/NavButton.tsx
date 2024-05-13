import { Button } from "antd";
import "./nav-button.scss";

import React from "react";

function NavButton({
  text,
  icon,
  active,
}: {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Button
      className={`nav-button${active ? " active" : ""}`}
      type="text"
      icon={icon}
    >
      {text}
    </Button>
  );
}

export default NavButton;
