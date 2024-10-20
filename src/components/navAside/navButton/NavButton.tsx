import { Button, theme } from "antd";
import "./nav-button.scss";
import type { PropsType } from "./props";

const { useToken } = theme;

export default function NavButton(props: PropsType) {
  const { token } = useToken();
  const { text, active, icon } = props;
  return (
    <Button
      className={`nav-button${active ? " active" : ""}`}
      type="text"
      icon={icon}
      style={
        active
          ? {
              backgroundColor: "red",
            }
          : {}
      }
    >
      {text}
    </Button>
  );
}
