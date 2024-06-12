import { useDataStore } from "@/src/store/data";
import "./nav-header.scss";

function NavHeader() {
  const project = useDataStore((state) => state.project);

  return (
    <header id="nav-header">
      <div id="nav-header-wrapper">
        <div>
          <span>{project.name}</span>
        </div>
      </div>
    </header>
  );
}

export default NavHeader;
