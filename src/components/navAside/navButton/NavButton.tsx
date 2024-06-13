import { Button } from "antd";
import "./nav-button.scss";
import type { PropsType } from "./props";

export default function NavButton(props: PropsType) {
  const { text, active, icon } = props;
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
