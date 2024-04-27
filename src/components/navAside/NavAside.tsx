import ButtonList from "./buttonList/ButtonList";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

function NavAside() {
  return (
    <aside id="nav-aside">
      <NavHeader />
      <ButtonList />
    </aside>
  );
}

export default NavAside;
