import { IconDeviceDesktop, IconInfoCircle } from "@tabler/icons-react";
import NavButton from "../navButton/NavButton";
import "./button-list.scss";

const iconSize = 24;

function ButtonList() {
  return (
    <div id="button-list">
      <NavButton
        icon={<IconDeviceDesktop size={iconSize} />}
        text="Vue d'ensemble"
        active={false}
      />
      <NavButton
        icon={<IconInfoCircle size={iconSize} />}
        text="Informations"
        active
      />
    </div>
  );
}

export default ButtonList;
