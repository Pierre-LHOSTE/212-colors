import { ProjectIconsType } from "@/src/types/project";
import MainAside from "../mainAside/MainAside";
import NavAside from "../navAside/NavAside";
import "./app.scss";

function App({ projects }: { projects: ProjectIconsType[] }) {
  return (
    <div id="app-window">
      <MainAside projects={projects} />
      <NavAside />
    </div>
  );
}

export default App;
