import { useDataStore } from "@/src/store/data";
import "./nav-header.scss";

export default function NavHeader() {
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
