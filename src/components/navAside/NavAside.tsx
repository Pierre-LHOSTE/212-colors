import "./nav-aside.scss";
import NavButtonList from "./navButtonList/NavButtonList";
import NavHeader from "./navHeader/NavHeader";

function NavAside() {
  return (
    <aside id="nav-aside">
      <NavHeader title="Lorem Ipsum" />
      <NavButtonList />
    </aside>
  );
}

export default NavAside;
